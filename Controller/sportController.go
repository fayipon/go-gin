package Controller

import (
	"fmt"
	"log"
	"net/http"
	"time"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type SportOrderRepo struct {
	Db *gorm.DB
}

type MySportOrder struct {
	ID              int32
	GameId          int8
	GameTypeId      int8
	GameCycle       string
	GameCycleResult string
	UserId          int32
	UserAccount     string
	TotalAmount     float32
	ResultAmount    float32
	Status          int8
}

func NewSportController() *SportOrderRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.SportOrder{})
	return &SportOrderRepo{Db: db}
}

// 下注接口
func (repository *SportOrderRepo) CreateOrder(c *gin.Context) {

	var sport_order models.SportOrder
	if c.ShouldBind(&sport_order) != nil {
		// 绑定失敗
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "參數不正確",
		})
		return
	}

	// 從 ctx 中取出 session
	session := sessions.Default(c)

	// 判斷是否登入
	if session.Get("auth") != "1" {
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "未登入",
		})
		return
	}

	//////////////////
	// 計算當前期數
	tm := time.Now()
	// 月日時分
	cycle_value := tm.Format("01021504")

	// 取得 session 中的值
	user_id := session.Get("id")
	account := session.Get("account")

	sport_order.UserId = user_id.(int32)
	sport_order.UserAccount = account.(string)
	sport_order.GameCycle = cycle_value
	sport_order.Status = 1

	result := models.CreateSportOrder(repository.Db, &sport_order)

	if result != nil {
		// 失敗
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "注單創建失敗",
		})
		return
	}

	///////////////////////

	// 判斷餘額是否足夠
	var is_balance_enought models.Wallet
	repository.Db.Raw("SELECT id, balance FROM common_user_balance where id=?", user_id).Scan(&is_balance_enought)
	if is_balance_enought.Balance < sport_order.TotalAmount {
		//餘額不足
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "您的餘額不足！",
		})
		return
	}

	// 原餘額 帳變用
	change_balance := sport_order.TotalAmount
	before_balance := is_balance_enought.Balance
	after_balance := before_balance - change_balance

	// 扣款
	var deduction models.Wallet
	var sql = "UPDATE `common_user_balance` SET `balance` = `balance` -  '"
	sql += FloatToString(sport_order.TotalAmount)
	sql += "' WHERE `id`=?"

	repository.Db.Raw(sql, user_id).Scan(&deduction)

	// 添加帳變紀錄
	var change_log = "INSERT INTO `common_user_balance_log` (`user_id`, `account`, `change_type`, `change_amount`, `before_amount`, `after_amount`) VALUES ('"
	s_user_id := fmt.Sprint(user_id)
	change_log += s_user_id + "', '"
	s_account := fmt.Sprint(account)
	change_log += s_account + "', 'BACCARAT_BET', '"
	s_result_balance := fmt.Sprint(change_balance)
	change_log += s_result_balance + "', '"
	s_current_balance := fmt.Sprint(before_balance)
	change_log += s_current_balance + "', '"
	s_after_balance := fmt.Sprint(after_balance)
	change_log += s_after_balance + "');"
	repository.Db.Exec(change_log)

	c.JSON(200, gin.H{
		"status":  "1",
		"message": "",
		"account": account,
		"balance": after_balance,
	})

}

// 定時任務 , 開獎腳本
func (repository *SportOrderRepo) Result() {

	// 計算當前期數
	tm := time.Now().Add(-time.Minute * 1)
	// 月日時分
	cycle_value := tm.Format("01021504")

	log.Println("[體育] 期數 : ", cycle_value)
}

// 定時任務 , 創建賽事
func (repository *SportOrderRepo) CreateCycle() {

	log.Println("[體育] 創建賽事")
}

package Controller

import (
	"net/http"
	"regexp"
	"strconv"
	"time"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type LotteryOrderRepo struct {
	Db *gorm.DB
}

func NewLotteryController() *LotteryOrderRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.LotteryOrder{})
	return &LotteryOrderRepo{Db: db}
}

// session test , count
func (repository *LotteryOrderRepo) CreateLotteryOrder(c *gin.Context) {

	var lottery_order models.LotteryOrder
	if c.ShouldBind(&lottery_order) != nil {
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
	// 計算 注數
	bet_count := regexp.MustCompile("1,").FindAllStringIndex(lottery_order.GameBetInfo, -1)

	//////////////////
	// 計算當前期數
	tm := time.Now()
	// 月日時分
	cycle_value := tm.Format("01021504")

	// 取得 session 中的值
	user_id := session.Get("id")
	account := session.Get("account")

	lottery_order.GameBetCount = int8(len(bet_count))
	lottery_order.UserId = user_id.(int32)
	lottery_order.UserAccount = account.(string)
	lottery_order.GameCycle = cycle_value
	lottery_order.Status = 1
	lottery_order.TotalAmount = lottery_order.SingleAmount * float32(lottery_order.GameBetCount)

	result := models.CreateLotteryOrder(repository.Db, &lottery_order)

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
	if is_balance_enought.Balance < lottery_order.TotalAmount {
		//餘額不足
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "您的餘額不足！",
		})
		return
	}

	// 原餘額 帳變用
	change_balance := lottery_order.TotalAmount
	before_balance := is_balance_enought.Balance
	after_balance := before_balance - change_balance

	// 扣款
	var deduction models.Wallet
	var sql = "UPDATE `common_user_balance` SET `balance` = `balance` -  '"
	sql += FloatToString(lottery_order.TotalAmount)
	sql += "' WHERE `id`=?"

	repository.Db.Raw(sql, user_id).Scan(&deduction)

	// 添加帳變紀錄 todo

	c.JSON(200, gin.H{
		"status":  "1",
		"message": "",
		"account": account,
		"balance": after_balance,
	})

}

func FloatToString(num float32) string {
	return strconv.FormatFloat(float64(num), 'f', 6, 64)
}

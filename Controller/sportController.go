package Controller

import (
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"strconv"
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

// 當前進行中, 賽事接口
func (repository *SportOrderRepo) GetGames(c *gin.Context) {

	// 從 ctx 中取出 session
	session := sessions.Default(c)
	// 判斷是否登入
	if session.Get("auth") != "1" {
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "請先登入",
		})
		return
	}

	// 計算當前期數
	tm := time.Now().Add(-time.Minute * 5)
	cycle_value := tm.Format("01021504")

	var sport_cycle []models.SportCycle
	repository.Db.Raw("SELECT * FROM sport_cycle where status=1 and cycle_value >=?", cycle_value).Scan(&sport_cycle)

	// 格式化

	for i := 0; i < len(sport_cycle); i++ {
		sport_cycle[i].HomeBsRate = Floor(sport_cycle[i].HomeBsRate)
		sport_cycle[i].AwayBsRate = Floor(sport_cycle[i].AwayBsRate)
		sport_cycle[i].HomeWinRate = Floor(sport_cycle[i].HomeWinRate)
		sport_cycle[i].AwayWinRate = Floor(sport_cycle[i].AwayWinRate)
		sport_cycle[i].HomeHandicapRate = Floor(sport_cycle[i].HomeHandicapRate)
		sport_cycle[i].AwayHandicapRate = Floor(sport_cycle[i].AwayHandicapRate)
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "1",
		"message": "查詢成功",
		"data":    sport_cycle,
	})
}

func Floor(x float32) float32 {
	unit := float32(10000)
	return float32(int32(x*unit)) / unit
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
	tm := time.Now().Add(-time.Minute * 5)
	// 月日時分
	cycle_value := tm.Format("01021504")

	// 虛擬比分
	cycle_result := ""
	for i := 0; i < 2; i++ {
		result, _ := rand.Int(rand.Reader, big.NewInt(8))
		cycle_result += result.String() + ","
	}

	log.Println("[體育] 期數 : ", cycle_value)
	log.Println("[體育] 結果 : ", cycle_result)

	// 寫入該期cycle_result . status = 2
	var sql = "UPDATE `sport_cycle` SET `status`='2',`cycle_result` = CONCAT(home_score, ',', away_score)"
	sql += " WHERE `status`=1 and `cycle_value`=?"
	repository.Db.Exec(sql, cycle_value)

	// 寫入該期注單 , 這邊只寫入cycle_result
	sql = "UPDATE `sport_order` SET `game_cycle_result` = '"
	sql += cycle_result
	sql += "' WHERE `status`=1 and `game_cycle`=?"
	repository.Db.Exec(sql, cycle_value)

	// 抓取該期注單紀錄
	// todo
	/*
		rows, _ := repository.Db.Table("sport_order").Where("game_cycle=?", cycle_value).Rows()
		defer rows.Close()

		log.Println("[真人]", cycle_value, "期 => ", cycle_result)

		var myOrder MyBaccaratOrder
		for rows.Next() {
		}

	*/

}

// 定時任務 , 創建賽事
func (repository *SportOrderRepo) CreateCycle() {

	//////////////////
	// 計算當前期數

	tm := time.Now()
	cycle_value := tm.Format("01021504")

	c, _ := strconv.Atoi(cycle_value)
	team := c % 6

	team_home := "A"
	team_away := "B"

	//決定對戰組合
	switch team {
	case 0:
		team_home = "巴賽隆納"
		team_away = "皇家馬德里"
	case 1:
		team_home = "賽維亞"
		team_away = "瓦萊卡諾"
	case 2:
		team_home = "格拉納德"
		team_away = "馬德里競技"
	case 3:
		team_home = "巴賽隆納"
		team_away = "格拉納德"
	case 4:
		team_home = "皇家馬德里"
		team_away = "賽維亞"
	case 5:
		team_home = "瓦萊卡諾"
		team_away = "馬德里競技"
	}

	var sql = "INSERT INTO `sport_cycle` (`id`, `league_name`, `home_team`, `away_team`, `cycle_value`, `cycle_result`, `home_win_rate`, `away_win_rate`,`handicap_value`, `home_handicap_rate`, `away_handicap_rate`,`bs_value`,  `home_bs_rate`, `away_bs_rate`, `create_time`, `status`) VALUES (NULL, 'Fincon聯賽', '"
	sql += team_home
	sql += "', '"
	sql += team_away
	sql += "', '"
	sql += cycle_value
	sql += "', '', '0.97', '0.97', '2.5', '0.97', '0.97', '4.5','0.97', '0.97', CURRENT_TIMESTAMP, 1);"
	repository.Db.Exec(sql)

	///////////////////////

	log.Println("[體育] 創建賽事 : ", cycle_value, team_home, " VS ", team_away)
}

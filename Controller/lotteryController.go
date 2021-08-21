package Controller

import (
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"regexp"
	"strconv"
	"strings"
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

type MyLotteryOrder struct {
	ID              int32
	GameId          int8
	GameTypeId      int8
	GameCycle       string
	GameCycleResult string
	UserId          int32
	UserAccount     string
	GameBetInfo     string
	GameBetCount    int8
	GameResultCount int8
	SingleAmount    float32
	TotalAmount     float32
	ResultAmount    float32
	Status          int8
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

// 定時任務 , 開獎腳本
func (repository *LotteryOrderRepo) LotteryResult() {

	//////////////////
	// 計算當前期數
	tm := time.Now().Add(-time.Minute * 1)
	// 月日時分
	cycle_value := tm.Format("01021504")

	// 生成隨機號碼
	var tmp string
	for i := 0; i < 5; i++ {
		result, _ := rand.Int(rand.Reader, big.NewInt(10))
		tmp += result.String()
	}
	log.Println(cycle_value, tmp)

	cycle_result := strings.Split(tmp, "")

	// 寫入開獎號碼 （這邊是直接更新注單）
	var updateCycle models.LotteryOrder
	var sql = "UPDATE `lottery_order` SET `game_cycle_result` = '"
	sql += tmp
	sql += "' WHERE `game_cycle`=?"
	repository.Db.Raw(sql, cycle_value).Scan(&updateCycle)

	// TODO

	// 抓取該期注單紀錄
	rows, _ := repository.Db.Table("lottery_order").Where("game_cycle=?", cycle_value).Rows()
	defer rows.Close()

	var myOrder MyLotteryOrder
	for rows.Next() {
		repository.Db.ScanRows(rows, &myOrder)

		log.Println("============")

		// 根據game_type_id , 計算中幾注 中多少錢

		var result_count = 0

		switch myOrder.GameTypeId {
		case 1: // 定位膽

			// 計算中獎注數
			bet_info := strings.Split(myOrder.GameBetInfo, ",")

			for i := 0; i < len(cycle_result); i++ {
				log.Print("cycle_result => ", cycle_result[i])
				result_number, _ := strconv.Atoi(cycle_result[i])
				pos := i*10 + result_number
				if bet_info[pos] == "1" {
					result_count++
				}
			}

			log.Println("中獎ID => ", myOrder.ID)
			log.Println("中獎注數 => ", result_count)

			// 計算中獎金額
			result_balance := float32(result_count) * myOrder.SingleAmount * 10
			log.Println("中獎金額 => ", result_balance)

			// 更新注單
			var sql = "UPDATE `lottery_order` SET `game_result_count` = '"
			sql += strconv.Itoa(result_count)
			sql += "', `result_amount` = '"
			s := fmt.Sprintf("%f", result_balance)
			sql += s
			sql += "', `status` = 2"
			sql += " WHERE `id`="
			ss := fmt.Sprint(myOrder.ID)
			sql += ss
			repository.Db.Exec(sql)

			// 更新用戶餘額
			var sqls = "UPDATE `common_user_balance` SET `balance` = `balance` + '"
			sss := fmt.Sprint(result_balance)
			sqls += sss
			sqls += "' WHERE `id` = "
			ssss := fmt.Sprint(myOrder.UserId)
			sqls += ssss
			repository.Db.Exec(sqls)
			log.Println("sql => ", sqls)

			break
		case 2:
			log.Println("大小單雙\r\n============")
			break
		case 3:
			log.Println("龍虎和\r\n============")
			break
		default:
			log.Println("default trigged")
		}

		// 帳變寫入

	}

}

func FloatToString(num float32) string {
	return strconv.FormatFloat(float64(num), 'f', 6, 64)
}

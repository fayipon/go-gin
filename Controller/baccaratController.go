package Controller

import (
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"strconv"
	"strings"
	"time"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BaccaratOrderRepo struct {
	Db *gorm.DB
}

func NewBaccaratController() *BaccaratOrderRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.BaccaratOrder{})
	return &BaccaratOrderRepo{Db: db}
}

// 下注接口
func (repository *BaccaratOrderRepo) CreateBaccaratOrder(c *gin.Context) {

	var baccarat_order models.BaccaratOrder
	if c.ShouldBind(&baccarat_order) != nil {
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

	baccarat_order.UserId = user_id.(int32)
	baccarat_order.UserAccount = account.(string)
	baccarat_order.GameCycle = cycle_value
	baccarat_order.Status = 1

	result := models.CreateBaccaratOrder(repository.Db, &baccarat_order)

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
	if is_balance_enought.Balance < baccarat_order.TotalAmount {
		//餘額不足
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "您的餘額不足！",
		})
		return
	}

	// 原餘額 帳變用
	change_balance := baccarat_order.TotalAmount
	before_balance := is_balance_enought.Balance
	after_balance := before_balance - change_balance

	// 扣款
	var deduction models.Wallet
	var sql = "UPDATE `common_user_balance` SET `balance` = `balance` -  '"
	sql += FloatToString(baccarat_order.TotalAmount)
	sql += "' WHERE `id`=?"

	repository.Db.Raw(sql, user_id).Scan(&deduction)

	// 添加帳變紀錄
	var change_log = "INSERT INTO `common_user_balance_log` (`user_id`, `account`, `change_type`, `change_amount`, `before_amount`, `after_amount`) VALUES ('"
	s_user_id := fmt.Sprint(user_id)
	change_log += s_user_id + "', '"
	s_account := fmt.Sprint(account)
	change_log += s_account + "', 'LOTTERY_BET', '"
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
func (repository *BaccaratOrderRepo) BaccaratResult() {

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
	log.Println(cycle_value, "期 => ", tmp)

	cycle_result := strings.Split(tmp, "")

	// 寫入開獎號碼 （這邊是直接更新注單）
	var updateCycle models.LotteryOrder
	var sql = "UPDATE `lottery_order` SET `game_cycle_result` = '"
	sql += tmp
	sql += "' WHERE `game_cycle`=?"
	repository.Db.Raw(sql, cycle_value).Scan(&updateCycle)

	// 插入新的獎期資料
	var newCycle = "INSERT INTO `lottery_cycle` (`cycle_value`, `cycle_result`) VALUES ('"
	newCycle += cycle_value
	newCycle += "', '"
	newCycle += tmp
	newCycle += "');"
	repository.Db.Exec(newCycle)

	// 抓取該期注單紀錄
	rows, _ := repository.Db.Table("lottery_order").Where("game_cycle=?", cycle_value).Rows()
	defer rows.Close()

	var myOrder MyLotteryOrder
	for rows.Next() {
		repository.Db.ScanRows(rows, &myOrder)

		// 根據game_type_id , 計算中幾注 中多少錢

		var result_count = 0
		result_balance := float32(result_count) * myOrder.SingleAmount * 1

		bet_info := strings.Split(myOrder.GameBetInfo, ",")

		switch myOrder.GameTypeId {
		case 1: // 定位膽

			// 計算中獎注數

			for i := 0; i < len(cycle_result); i++ {
				//	log.Print("cycle_result => ", cycle_result[i])
				result_number, _ := strconv.Atoi(cycle_result[i])
				pos := i*10 + result_number
				if bet_info[pos] == "1" {
					result_count++
				}
			}

			// 計算中獎金額
			result_balance = float32(result_count) * myOrder.SingleAmount * 10

		case 2: // 大小單雙

			// 計算中獎注數
			for i := 0; i < len(cycle_result); i++ {
				result_number, _ := strconv.Atoi(cycle_result[i])
				if result_number >= 5 {
					// 大
					if bet_info[i*4] == "1" {
						result_count++
					}
				} else {
					// 小
					if bet_info[i*4+1] == "1" {
						result_count++
					}
				}

				if result_number%2 == 1 {
					// 單
					if bet_info[i*4+2] == "1" {
						result_count++
					}
				} else {
					// 雙
					if bet_info[i*4+3] == "1" {
						result_count++
					}
				}
			}

			// 計算中獎金額
			result_balance = float32(result_count) * myOrder.SingleAmount * 2

		case 3:
			d := cycle_result[0]
			t := cycle_result[4]

			if d > t {
				// 龍
				if bet_info[0] == "1" {
					result_count++

					result_balance += myOrder.SingleAmount * 2.2
				}
			}

			if d < t {
				// 虎
				if bet_info[1] == "1" {
					result_count++
					result_balance += myOrder.SingleAmount * 2.2
				}
			}

			if d == t {
				// 和
				if bet_info[2] == "1" {
					result_count++
					result_balance += myOrder.SingleAmount * 10
				}
			}

		default:
			log.Println("default trigged")
		}

		log.Println("開獎號碼=> ", myOrder.GameCycleResult)
		log.Println("中獎ID => ", myOrder.ID)
		log.Println("玩法 => ", myOrder.GameTypeId)
		log.Println("中獎注數 => ", result_count)
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
		log.Println("sql => ", sql)

		// 先取得錢包當前額度
		var wallet models.Wallet
		repository.Db.Raw("SELECT id, balance FROM common_user_balance where id=?", myOrder.UserId).Scan(&wallet)
		current_balance := wallet.Balance
		after_balance := current_balance + result_balance

		// 更新用戶餘額
		var sqls = "UPDATE `common_user_balance` SET `balance` = `balance` + '"
		sss := fmt.Sprint(result_balance)
		sqls += sss
		sqls += "' WHERE `id` = "
		ssss := fmt.Sprint(myOrder.UserId)
		sqls += ssss
		repository.Db.Exec(sqls)
		log.Println("sql => ", sqls)

		// 帳變寫入 , 有中獎才需要寫
		if result_balance > 0 {

			var change_log = "INSERT INTO `common_user_balance_log` (`user_id`, `account`, `change_type`, `change_amount`, `before_amount`, `after_amount`) VALUES ('"
			s_user_id := fmt.Sprint(myOrder.UserId)
			change_log += s_user_id + "', '"
			change_log += myOrder.UserAccount + "', 'LOTTERY_RESULT', '"
			s_result_balance := fmt.Sprint(result_balance)
			change_log += s_result_balance + "', '"
			s_current_balance := fmt.Sprint(current_balance)
			change_log += s_current_balance + "', '"
			s_after_balance := fmt.Sprint(after_balance)
			change_log += s_after_balance + "');"
			repository.Db.Exec(change_log)
			log.Println("sql => ", change_log)
		}

	}

}

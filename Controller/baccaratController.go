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

type MyBaccaratOrder struct {
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

func NewBaccaratController() *BaccaratOrderRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.BaccaratOrder{})
	return &BaccaratOrderRepo{Db: db}
}

// 取得開獎資料
func (repository *BaccaratOrderRepo) GetResult(c *gin.Context) {

	//////////////////
	// 計算上期期數 （一分前, 月日時分）
	tm := time.Now().Add(-time.Minute * 1)
	// 月日時分
	cycle_value := tm.Format("01021504")

	var lottery_cycle models.BaccaratCycle
	repository.Db.Raw("SELECT cycle_value,cycle_result FROM baccarat_cycle where cycle_value = ?", cycle_value).Scan(&lottery_cycle)

	c.JSON(http.StatusOK, gin.H{
		"status":  "1",
		"message": "",
		"cycle":   lottery_cycle.CycleValue,
		"result":  lottery_cycle.CycleResult,
	})
}

// 下注接口
func (repository *BaccaratOrderRepo) CreateOrder(c *gin.Context) {

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
func (repository *BaccaratOrderRepo) Result() {

	// card points
	var card_points = [...]int{
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0}

	// 計算當前期數
	tm := time.Now().Add(-time.Minute * 1)
	// 月日時分
	cycle_value := tm.Format("01021504")

	// 生成隨機號碼
	var tmp string
	var bank_tmp string

	for i := 0; i < 3; i++ {
		result, _ := rand.Int(rand.Reader, big.NewInt(52))
		tmp += result.String() + ","
	}

	player_result := strings.Split(tmp, ",")
	player_value1, _ := strconv.Atoi(player_result[0])
	player_value2, _ := strconv.Atoi(player_result[1])
	player_value3, _ := strconv.Atoi(player_result[2])
	player_point := (card_points[player_value1] + card_points[player_value2]) % 10

	///////////////////

	for i := 0; i < 3; i++ {
		result, _ := rand.Int(rand.Reader, big.NewInt(52))
		bank_tmp += result.String() + ","
	}

	banker_result := strings.Split(bank_tmp, ",")
	banker_value1, _ := strconv.Atoi(banker_result[0])
	banker_value2, _ := strconv.Atoi(banker_result[1])
	banker_value3, _ := strconv.Atoi(banker_result[2])
	banker_point := (card_points[banker_value1] + card_points[banker_value2]) % 10

	// 計算補牌
	player_3rd := 0
	banker_3rd := 0

	// Player
	if player_point >= 8 {
		//		log.Println("閒家天牌,不補牌")
		player_3rd = 2
	}

	if (player_point > 5) && (player_point < 8) {
		//		log.Println("閒家6-7點,不補牌")
		player_3rd = 2
	}

	if (player_point >= 0) && (player_point <= 5) && (banker_point > 8) {
		//		log.Println(" 庄贏, 不補牌")
		player_3rd = 2
	}

	// 在閑家總點數為0至5任意點數時，只要莊家總點數不為8或9點，則閑家補一張。 如果莊家在此時點數為8或9點，則莊家贏，閑家不補牌。
	if (player_point >= 0) && (player_point <= 5) && (banker_point < 8) {
		//		log.Println("閒家補牌")
		player_3rd = 1

	}

	// 閒家補牌
	if player_3rd == 1 {
		player_point = (player_point + card_points[player_value3]) % 10
		//		log.Println(cycle_value, " 閒家手牌3 ", player_value3, " => ", card_value[player_value3])
		//		log.Println("閒家補牌後點數 ", player_point)
	}
	////////////////////////

	//	log.Println(" ")

	/*
		// banker

	*/

	if banker_point < 3 {
		//		log.Println("庄點數0,1,2 , 庄家補牌")
		banker_3rd = 1
	}

	if banker_point == 8 {
		//		log.Println("庄家天牌,不補牌")
		banker_3rd = 2
	}
	if banker_point == 9 {
		//		log.Println("庄家天牌,不補牌")
		banker_3rd = 2
	}

	if banker_point == 7 {
		//		log.Println("庄家7,不補牌")
		banker_3rd = 2
	}

	// 如果閒有補牌
	if (banker_3rd == 0) && player_3rd == 1 {

		switch banker_point {
		case 3: // 如果閒家補得第三張牌（非三張牌點數相加，下同）是8點，不須補牌，其他則需補牌
			if player_value3 != 8 {
				banker_3rd = 1
			} else {
				banker_3rd = 2
				//				log.Println("庄3點 , 閒第三張手牌8 , 庄家不補牌")
			}
		case 4: // 如果閒家補得第三張牌是0,1,8,9點，不須補牌，其他則需補牌
			if (player_value3 != 0) && (player_value3 != 1) && (player_value3 != 8) && (player_value3 != 9) {
				banker_3rd = 1
			} else {
				//				log.Println("庄4點 , 閒第三張手牌0,1,8,9, 庄家不補牌")
				banker_3rd = 2
			}
		case 5: // 如果閒家補得第三張牌是0,1,2,3,8,9點，不須補牌，其他則需補牌
			if (player_value3 != 0) && (player_value3 != 1) && (player_value3 != 2) && (player_value3 != 3) && (player_value3 != 8) && (player_value3 != 9) {
				banker_3rd = 1
			} else {
				//				log.Println("庄5點 , 閒第三張手牌0,1,2,3,8,9, 庄家不補牌")
				banker_3rd = 2
			}
		case 6:
			// 如果閒家需補牌（即前提是閒家為1至5點）而補得第三張牌是6或7點，補一張牌，其他則不需補牌
			if (player_point > 0) && (player_point <= 5) && ((player_value3 == 6) || (player_value3 == 7)) {
				//				log.Println("庄6點 , 閒第三張67, 庄家補牌")
				banker_3rd = 1
			} else {
				//				log.Println("庄6點 , 閒第三張手牌不是6,7, 庄家不補牌")
				banker_3rd = 2
			}
		}

	}

	// 裝家補牌
	if banker_3rd == 1 {
		banker_point = (banker_point + card_points[banker_value3]) % 10
	}

	player_card3 := player_value3
	if player_3rd != 1 {
		player_card3 = -1
	}

	banker_card3 := banker_value3
	if banker_3rd != 1 {
		banker_card3 = -1
	}

	baccarat_result_string := strconv.Itoa(player_value1) + "," + strconv.Itoa(player_value2) + "," + strconv.Itoa(player_value3) + "," + strconv.Itoa(player_card3) + "," + strconv.Itoa(banker_value1) + "," + strconv.Itoa(banker_value2) + "," + strconv.Itoa(banker_value3) + "," + strconv.Itoa(banker_card3)

	game_result := 0

	if strconv.Itoa(player_point) > strconv.Itoa(banker_point) {
		baccarat_result_string += ",1"
		game_result = 1
	}
	if strconv.Itoa(player_point) < strconv.Itoa(banker_point) {
		baccarat_result_string += ",2"
		game_result = 3
	}
	if strconv.Itoa(player_point) == strconv.Itoa(banker_point) {
		baccarat_result_string += ",3"
		game_result = 2
	}

	// 寫入開獎號碼 （這邊是直接更新注單）
	var updateCycle models.BaccaratOrder
	var sql = "UPDATE `baccarat_order` SET `game_cycle_result` = '"
	sql += baccarat_result_string
	sql += "' WHERE `game_cycle`=?"
	repository.Db.Raw(sql, cycle_value).Scan(&updateCycle)

	// 插入新的獎期資料
	var newCycle = "INSERT INTO `baccarat_cycle` (`cycle_value`, `cycle_result`) VALUES ('"
	newCycle += cycle_value
	newCycle += "', '"
	newCycle += baccarat_result_string
	newCycle += "');"
	repository.Db.Exec(newCycle)

	// 抓取該期注單紀錄
	rows, _ := repository.Db.Table("baccarat_order").Where("game_cycle=?", cycle_value).Rows()
	defer rows.Close()

	log.Println("[真人]", cycle_value, "期 => ", baccarat_result_string)

	var myOrder MyBaccaratOrder
	for rows.Next() {
		repository.Db.ScanRows(rows, &myOrder)

		result_balance := myOrder.TotalAmount - myOrder.TotalAmount

		switch myOrder.GameTypeId {
		case 1: // 閒
			if game_result == 1 {
				result_balance = myOrder.TotalAmount * 2
			}
		case 2: //和
			if game_result == 2 {
				result_balance = myOrder.TotalAmount * 9
			}
		case 3: // 庄
			if game_result == 3 {
				result_balance = myOrder.TotalAmount * 1.95
			}
		default:
			log.Println("default trigged")
		}

		// 更新注單
		var sql = "UPDATE `baccarat_order` SET `result_amount` = '"
		s := fmt.Sprintf("%f", result_balance)
		sql += s
		sql += "', `status` = 2"
		sql += " WHERE `id`="
		ss := fmt.Sprint(myOrder.ID)
		sql += ss
		repository.Db.Exec(sql)

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

		// 帳變寫入 , 有中獎才需要寫
		if result_balance > 0 {

			var change_log = "INSERT INTO `common_user_balance_log` (`user_id`, `account`, `change_type`, `change_amount`, `before_amount`, `after_amount`) VALUES ('"
			s_user_id := fmt.Sprint(myOrder.UserId)
			change_log += s_user_id + "', '"
			change_log += myOrder.UserAccount + "', 'BACCARAT_RESULT', '"
			s_result_balance := fmt.Sprint(result_balance)
			change_log += s_result_balance + "', '"
			s_current_balance := fmt.Sprint(current_balance)
			change_log += s_current_balance + "', '"
			s_after_balance := fmt.Sprint(after_balance)
			change_log += s_after_balance + "');"
			repository.Db.Exec(change_log)
		}

	}
}

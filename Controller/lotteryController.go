package Controller

import (
	"log"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type LotteryRepo struct {
	Db *gorm.DB
}

func NewLotteryController() *LotteryRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.LotteryOrder{})
	return &LotteryRepo{Db: db}
}

// session test , count
func (repository *LotteryRepo) CreateLotteryOrder(c *gin.Context) {

	var lottery_order models.LotteryOrder
	if c.ShouldBind(&lottery_order) == nil {
		log.Println(lottery_order)
	}
	//	c.Bind(&lottery_order)

	// 從 ctx 中取出 session
	session := sessions.Default(c)

	// 取得 session 中的值
	//	user_id := session.Get("id")
	account := session.Get("account")

	result := models.CreateLotteryOrder(repository.Db, &lottery_order)

	log.Println(result)

	c.JSON(200, gin.H{
		"status":  "1",
		"message": "",
		"account": account,
		"balance": 8888888,
	})
}

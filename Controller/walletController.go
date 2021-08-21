package Controller

import (
	"net/http"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type WalletRepo struct {
	Db *gorm.DB
}

func NewWalletController() *WalletRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.Wallet{})
	return &WalletRepo{Db: db}
}

// session test , count
func (repository *WalletRepo) GetUserBalance(c *gin.Context) {
	// 初始化session对象
	session := sessions.Default(c)

	if session.Get("auth") != "1" {
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "未登入",
		})
	}

	user_id := session.Get("id")

	var wallet models.Wallet
	repository.Db.Raw("SELECT id, balance FROM common_user_balance where id=?", user_id).Scan(&wallet)

	c.JSON(http.StatusOK, gin.H{
		"status":  "1",
		"message": "已登入",
		"balance": wallet.Balance,
	})
}

// session test , count
func (repository *WalletRepo) CreateWallet(c *gin.Context) {

}

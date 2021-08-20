package Controller

import (
	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"

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
func (repository *WalletRepo) Test(c *gin.Context) {

}

// session test , count
func (repository *WalletRepo) CreateWallet(c *gin.Context) {

}

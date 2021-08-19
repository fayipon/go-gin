package Controller

import (
	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	"gorm.io/gorm"
)

type AuthRepo struct {
	Db *gorm.DB
}

func NewAuthController() *AuthRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.User{})
	return &AuthRepo{Db: db}
}

// getSession
func getSession() {

}

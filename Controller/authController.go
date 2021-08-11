package Controller

import (
	"net/http"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	"github.com/gin-gonic/gin"
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

// session test , count
func (repository *AuthRepo) LoginPage(c *gin.Context) {
	c.HTML(http.StatusOK, "auth/index.tmpl", gin.H{
		"title": "Posts",
	})
}

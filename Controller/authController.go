package Controller

import (
	"log"
	"net/http"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthRepo struct {
	Db *gorm.DB
}

// User 结构体定义
type User struct {
	Account  string `json:"account" form:"account"`
	Password string `json:"password" form:"password"`
}

func NewAuthController() *AuthRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.User{})
	return &AuthRepo{Db: db}
}

// 登出
func (repository *AuthRepo) Logout(c *gin.Context) {
	// 初始化session对象
	session := sessions.Default(c)
	session.Set("auth", "0")
	session.Save()

	c.JSON(http.StatusOK, gin.H{
		"status":  "1",
		"message": "已登出",
	})
}

// 登入
func (repository *AuthRepo) Login(c *gin.Context) {
	// 初始化user struct
	u := User{}
	if c.ShouldBind(&u) == nil {
		// 绑定成功， 打印请求参数
		log.Println(u.Account)
		log.Println(u.Password)
	}

	if u.Account == "admin" && u.Password == "12345" {

		// 初始化session
		session := sessions.Default(c)

		// 設置session
		session.Set("id", "1")
		session.Set("account", u.Account)
		session.Set("auth", "1")

		// 保存session
		session.Save()

		c.JSON(http.StatusOK, gin.H{
			"status":  "1",
			"message": "success",
			"account": "admin",
			"balance": "999999",
		})
	} else {

		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "帳號密碼錯誤！",
		})
	}
}

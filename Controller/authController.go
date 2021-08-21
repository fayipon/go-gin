package Controller

import (
	"fmt"
	"log"
	"net/http"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"crypto/md5"

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

	var result models.User
	repository.Db.Raw("SELECT * FROM common_user where account=?", u.Account).Scan(&result)

	if u.Account == result.Account && md5password(u.Password) == result.Password {

		// 初始化session
		session := sessions.Default(c)

		// 設置session
		session.Set("id", result.ID)
		session.Set("account", result.Account)
		session.Set("auth", "1")

		// 保存session
		session.Save()

		// 取得餘額
		var wallet models.Wallet
		repository.Db.Raw("SELECT * FROM common_user_balance where id=?", result.ID).Scan(&wallet)

		c.JSON(http.StatusOK, gin.H{
			"status":  "1",
			"message": "success",
			"account": "admin",
			"balance": wallet.Balance,
		})
	} else {

		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "帳號密碼錯誤！",
		})
	}
}

// MD5 Password
func md5password(password string) string {
	data := []byte(password)
	has := md5.Sum(data)
	md5str := fmt.Sprintf("%x", has) //将[]byte转成16进制
	return md5str
}

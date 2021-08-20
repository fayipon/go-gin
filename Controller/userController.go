package Controller

import (
	"errors"
	"log"
	"net/http"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"
	sessions "github.com/gin-contrib/sessions"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserRepo struct {
	Db *gorm.DB
}

func NewUserController() *UserRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.User{})
	return &UserRepo{Db: db}
}

// test
func (repository *UserRepo) Test(c *gin.Context) {
	var user models.User

	//result := repository.Db.Where("account = ?", "admin").First(&user)

	//	var result Result
	repository.Db.Raw("SELECT * FROM common_user where account=?", "admin1").Scan(&user)

	log.Print(user)

	c.JSON(http.StatusOK, user)
}

// register User
func (repository *UserRepo) Register(c *gin.Context) {
	var user models.User
	c.BindJSON(&user)

	/////////////////////////
	// 判斷用戶是否已存在
	var result models.User
	repository.Db.Raw("SELECT id,account FROM common_user where account=?", user.Account).Scan(&result)
	if result.Account != "" {
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "該帳號已被注冊, 請重試！",
		})
		return
	}

	/////////////////////////
	// 創建 用戶 & 錢包資料

	// 用戶
	err := models.CreateUser(repository.Db, &user)
	if err != nil {
		//	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "注冊失敗, 創建用戶失敗",
		})
		return
	}

	/////////////////////
	// 返回數據

	var response models.User
	repository.Db.Raw("SELECT id,account FROM common_user where account=?", user.Account).Scan(&response)

	// 創建錢包
	var wallet models.Wallet
	wallet.ID = response.ID
	wallet.Balance = 999999 // demo 用, 預設999999元
	err2 := models.CreateWallet(repository.Db, &wallet)
	if err2 != nil {
		//	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		c.JSON(http.StatusOK, gin.H{
			"status":  "0",
			"message": "注冊失敗, 創建錢包失敗",
		})
		return
	}

	// 初始化session 並設定已登入
	session := sessions.Default(c)
	session.Set("id", response.ID)
	session.Set("account", response.Account)
	session.Set("auth", "1")
	session.Save()

	c.JSON(http.StatusOK, gin.H{
		"status":  "1",
		"message": "注冊成功",
		"id":      response.ID,
		"account": response.Account,
		"balance": 999999,
	})

}

// User login
func (repository *UserRepo) Login(c *gin.Context) {
}

//get users
func (repository *UserRepo) GetUsers(c *gin.Context) {
	var user []models.User
	err := models.GetUsers(repository.Db, &user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

//get user by id
func (repository *UserRepo) GetUser(c *gin.Context) {
	id, _ := c.Params.Get("id")
	var user models.User
	err := models.GetUser(repository.Db, &user, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

// update user
func (repository *UserRepo) UpdateUser(c *gin.Context) {
	var user models.User
	id, _ := c.Params.Get("id")
	err := models.GetUser(repository.Db, &user, id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.BindJSON(&user)
	err = models.UpdateUser(repository.Db, &user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
}

// delete user
func (repository *UserRepo) DeleteUser(c *gin.Context) {
	var user models.User
	id, _ := c.Params.Get("id")
	err := models.DeleteUser(repository.Db, &user, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

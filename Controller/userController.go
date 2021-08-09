package Controller

import (
	"errors"
	"net/http"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	// 导入session包
	// 导入session存储引擎
)

type UserRepo struct {
	Db *gorm.DB
}

func NewUserController() *UserRepo {
	db := database.InitDb()
	db.AutoMigrate(&models.User{})
	return &UserRepo{Db: db}
}

//create user
func (repository *UserRepo) CreateUser(c *gin.Context) {
	var user models.User
	c.BindJSON(&user)
	err := models.CreateUser(repository.Db, &user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, user)
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

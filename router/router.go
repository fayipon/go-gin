package Router

import (
	"github.com/fayipon/go-gin/Controller"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	router := gin.Default()

	userController := Controller.NewUserController()

	router.POST("/users", userController.CreateUser)
	router.GET("/users", userController.GetUsers)
	router.GET("/users/:id", userController.GetUser)

	return router
}

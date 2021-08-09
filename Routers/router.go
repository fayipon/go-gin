package Routers

import (
	"github.com/fayipon/go-gin/Controller"
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

func Setup() *gin.Engine {
	router := gin.Default()

	// 建立 store
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

	userController := Controller.NewUserController()

	router.GET("/session", userController.SessionTest)

	router.GET("/sessionB", userController.SessionTestB)

	router.POST("/users", userController.CreateUser)
	router.GET("/users", userController.GetUsers)
	router.GET("/users/:id", userController.GetUser)

	return router
}

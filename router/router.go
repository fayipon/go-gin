package router

import (
	"github.com/fayipon/go-gin/Controller/Home"
	"github.com/fayipon/go-gin/Controller/Login"
	"github.com/fayipon/go-gin/Middleware/Auth"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	router := gin.Default()

	router.GET("/", Home.Get)
	router.GET("/login", Auth.CheckLogin, Login.Get)
	return router
}

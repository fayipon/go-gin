package router

import (
	"github.com/fayipon/go-gin/controller/Home"
	"github.com/fayipon/go-gin/controller/Login"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	router := gin.Default()

	router.GET("/", Home.Get)
	router.GET("/login", Login.Get)
	return router
}

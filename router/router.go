package router

import (
	"github.com/fayipon/go-gin/handler"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	router := gin.Default()
	router.GET("/hello", handler.GetHello)
	return router
}

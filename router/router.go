package router

import (
	"github.com/fayipon/go-gin/controller/hello"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	router := gin.Default()
	router.GET("/hello", hello.Get)
	return router
}

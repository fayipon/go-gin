package handler

import (
	"github.com/gin-gonic/gin"
)

func GetHello(c *gin.Context) {
	c.Data(200, "text/plain", []byte("Hello, It Home!"))
}

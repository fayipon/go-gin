package Auth

import (
	"log"

	"github.com/gin-gonic/gin"
)

func CheckLogin(c *gin.Context) {

	log.Println("Auth::CheeckLogin")

	c.Next()
}

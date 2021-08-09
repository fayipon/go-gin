package Controller

import (
	"github.com/gin-gonic/gin"
)

// session test , count
func LoginPage(c *gin.Context) {

	c.JSON(200, "This is LoginPage")
}

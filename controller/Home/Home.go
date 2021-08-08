package Home

import (
	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {
	c.Data(200, "text/plain", []byte("Home"))
}

package Login

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {

	c.String(http.StatusOK, "login")
}

package Routers

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

func Setup() *gin.Engine {
	router := gin.Default()
	//	router.LoadHTMLGlob("Views/**/*")
	router.Use(static.Serve("/", static.LocalFile("./React/react-bootstrap/build", true)))

	// session
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

	//authController := Controller.NewAuthController()
	//router.GET("/", authController.LoginPage)

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	return router
}

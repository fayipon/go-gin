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

	// 雖說是spa, 但每一頁都需要設定, 不然重整會出現404
	router.Use(static.Serve("/", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/sport", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/lottery", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/slot", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/esport", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/chess", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/login", static.LocalFile("./React/react-bootstrap/build", true)))
	router.Use(static.Serve("/logout", static.LocalFile("./React/react-bootstrap/build", true)))

	// session
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

	//authController := Controller.NewAuthController()
	//router.GET("/", authController.LoginPage)

	// todo , 頁面使用的API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})

		api.GET("/login", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "login",
			})
		})
	}

	return router
}

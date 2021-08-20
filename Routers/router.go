package Routers

import (
	"log"
	"net/http"

	"github.com/fayipon/go-gin/Controller"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

func Setup() *gin.Engine {

	router := gin.Default()
	//	router.LoadHTMLGlob("Views/**/*")

	// 雖說是spa, 但每一頁都需要設定, 不然重整會出現404
	router.Use(static.Serve("/", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/home", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/sport", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/lottery", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/slot", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/esport", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/chess", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/register", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/login", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/logout", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/lottery", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/sport", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/slot", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/chess", static.LocalFile("./Views/paper-kit-react/build", true)))

	// session
	store := cookie.NewStore([]byte("gssecret"))
	router.Use(sessions.Sessions("mysession", store))

	authController := Controller.NewAuthController()
	userController := Controller.NewUserController()
	lotteryController := Controller.NewLotteryController()
	walletController := Controller.NewWalletController()
	//router.GET("/", authController.LoginPage)

	// todo , 頁面使用的API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})

		api.GET("/session", func(c *gin.Context) {

			// 初始化session对象
			session := sessions.Default(c)

			log.Println(session.Get("auth"))

			if session.Get("auth") == "1" {
				c.JSON(http.StatusOK, gin.H{
					"status":  "1",
					"message": "已登入",
				})
			} else {
				c.JSON(http.StatusOK, gin.H{
					"status":  "0",
					"message": "未登入",
				})
			}
		})

		api.GET("/logout", authController.Logout)
		api.POST("/login", authController.Login)

		api.POST("/register", userController.Register)
		api.GET("/get_user", userController.Test)
		api.GET("/get_user_balance", walletController.Test)

		// 投注接口
		api.POST("/lottery_bet", lotteryController.CreateLotteryOrder)

	}

	return router
}

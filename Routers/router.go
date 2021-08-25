package Routers

import (
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
	router.Use(static.Serve("/register", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/login", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/logout", static.LocalFile("./Views/paper-kit-react/build", true)))

	router.Use(static.Serve("/sport", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/lottery", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/baccarat", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/slot", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/esport", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/chess", static.LocalFile("./Views/paper-kit-react/build", true)))

	router.Use(static.Serve("/game/lottery", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/baccarat", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/sport", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/slot", static.LocalFile("./Views/paper-kit-react/build", true)))
	router.Use(static.Serve("/game/chess", static.LocalFile("./Views/paper-kit-react/build", true)))

	// session
	store := cookie.NewStore([]byte("gssecret"))
	router.Use(sessions.Sessions("mysession", store))

	authController := Controller.NewAuthController()
	userController := Controller.NewUserController()
	walletController := Controller.NewWalletController()
	lotteryController := Controller.NewLotteryController()
	baccaratController := Controller.NewBaccaratController()
	//router.GET("/", authController.LoginPage)

	// todo , 頁面使用的API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "api list todo",
			})
		})

		api.GET("/logout", authController.Logout)
		api.POST("/login", authController.Login)

		api.POST("/register", userController.Register)
		api.GET("/get_user_balance", walletController.GetUserBalance)

		// 投注接口
		api.POST("/lottery_bet", lotteryController.CreateLotteryOrder)
		// 取得開獎號碼
		api.POST("/lottery_result", lotteryController.GetLotteryResult)

		// 投注接口
		api.POST("/baccarat_bet", baccaratController.CreateBaccaratOrder)
		api.POST("/baccarat_result", baccaratController.GetBaccaratResult)

	}

	return router
}

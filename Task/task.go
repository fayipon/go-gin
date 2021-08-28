/**********************
	定時任務

***********************/
package task

import (
	"log"

	"github.com/fayipon/go-gin/Controller"
	"github.com/robfig/cron"
)

// go task.Start()
func Start() {

	log.Println("Cron Start...")

	c := cron.New()

	// 彩票開獎
	lotteryController := Controller.NewLotteryController()
	c.AddFunc("00 * * * * *", lotteryController.Result)

	// 真人開獎
	baccaratController := Controller.NewBaccaratController()
	c.AddFunc("44 * * * * *", baccaratController.Result)

	// 體育
	sportController := Controller.NewSportController()
	c.AddFunc("00 * * * * *", sportController.Result)
	c.AddFunc("00 * * * * *", sportController.CreateCycle)

	c.Start()
	select {}
}

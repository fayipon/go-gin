/**********************
	定時任務

***********************/
package main

import (
	"log"

	"github.com/fayipon/go-gin/Controller"
	"github.com/robfig/cron"
)

func main() {

	log.Println("Cron Start...")

	c := cron.New()

	// 彩票開獎
	//	lotteryController := Controller.NewLotteryController()
	//	c.AddFunc("00 * * * * *", lotteryController.Result)

	// 真人開獎
	baccaratController := Controller.NewBaccaratController()
	//	c.AddFunc("00 * * * * *", baccaratController.Result)
	c.AddFunc("15 * * * * *", baccaratController.Result)

	c.Start()
	select {}
}

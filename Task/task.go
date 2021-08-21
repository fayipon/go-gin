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
	lotteryController := Controller.NewLotteryController()
	c.AddFunc("00 * * * * *", lotteryController.LotteryResult)

	c.Start()
	select {}
}

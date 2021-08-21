/**********************
	定時任務

***********************/
package main

import (
	"log"
	"time"

	"github.com/robfig/cron"
)

func main() {

	log.Println("Cron Start...")

	c := cron.New()

	// 每秒執行
	c.AddFunc("* * * * * *", func() {
		log.Println("Task 1 => ", time.Now().Format("2006-01-02 15:04:05"))
	})

	// 每分的00秒執行
	c.AddFunc("00 * * * * *", func() {
		log.Println("Task 2 => ", time.Now().Format("2006-01-02 15:04:05"))
	})

	// 每分00 秒, 彩票開獎

	c.Start()
	select {}
}

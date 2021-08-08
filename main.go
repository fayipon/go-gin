package main

//	"demoproject/Struct"
import (
	"github.com/fayipon/go-gin/router"
)

func main() {
	r := router.Setup()
	r.Run(":80")
}

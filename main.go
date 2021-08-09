package main

//	"demoproject/Struct"
import (
	"github.com/fayipon/go-gin/Router"
)

func main() {
	r := Router.Setup()
	r.Run(":8080")
}

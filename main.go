package main

import (
	"github.com/fayipon/go-gin/Routers"
)

func main() {
	r := Routers.Setup()
	r.Run(":8080")
}

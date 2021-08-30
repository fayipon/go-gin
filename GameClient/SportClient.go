// 模擬體育賽事
package main

import (
	"crypto/rand"
	"encoding/json"
	"flag"
	"log"
	"math/big"
	"net/url"
	"os"
	"os/signal"
	"time"

	database "github.com/fayipon/go-gin/Database/Mysql"
	models "github.com/fayipon/go-gin/Models"

	"github.com/gorilla/websocket"
	"gorm.io/gorm"
)

type SportCycleRepo struct {
	Db *gorm.DB
}

var addr = flag.String("addr", "localhost:8080", "http service address")

func main() {
	StartSpoort()
}

func StartSpoort() {

	db := database.InitDb()

	flag.Parse()
	log.SetFlags(0)

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	u := url.URL{Scheme: "ws", Host: *addr, Path: "/ws"}
	log.Printf("connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	done := make(chan struct{})

	go func() {
		defer close(done)
		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			log.Printf("recv: %s", message)
		}
	}()

	ticker := time.NewTicker(time.Second * 10)
	defer ticker.Stop()

	for {
		select {
		case <-done:
			return
		case t := <-ticker.C:

			log.Println(t)

			for i := 0; i <= 4; i++ {
				// 虛擬動作
				action, _ := rand.Int(rand.Reader, big.NewInt(16))
				tm := time.Now().Add(-time.Minute * time.Duration(i))
				cycle_value := tm.Format("01021504")
				change(c, db, cycle_value, action.String())
			}

			tm := time.Now().Add(-time.Minute * 4)
			cycle_value := tm.Format("01021504")

			var sport_cycle []models.SportCycle
			db.Raw("SELECT * FROM sport_cycle where status=1 and cycle_value >=?", cycle_value).Scan(&sport_cycle)

			// 格式化

			for i := 0; i < len(sport_cycle); i++ {
				sport_cycle[i].HomeBsRate = Floor(sport_cycle[i].HomeBsRate)
				sport_cycle[i].AwayBsRate = Floor(sport_cycle[i].AwayBsRate)
				sport_cycle[i].HomeWinRate = Floor(sport_cycle[i].HomeWinRate)
				sport_cycle[i].AwayWinRate = Floor(sport_cycle[i].AwayWinRate)
				sport_cycle[i].HomeHandicapRate = Floor(sport_cycle[i].HomeHandicapRate)
				sport_cycle[i].AwayHandicapRate = Floor(sport_cycle[i].AwayHandicapRate)
			}

			jsondata, _ := json.Marshal(sport_cycle)

			message := "{\"status\":\"1\",\"message\":\"查詢成功\",\"data\":" + string(jsondata) + "}"
			err := c.WriteMessage(websocket.TextMessage, []byte(message))
			if err != nil {
				return
			}

		case <-interrupt:

			// Cleanly close the connection by sending a close message and then
			// waiting (with timeout) for the server to close the connection.
			err := c.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				return
			}
			select {
			case <-done:
			case <-time.After(time.Second):
			}
			return
		}
	}
}

func change(c *websocket.Conn, db *gorm.DB, cycle_value string, action string) {

	switch action {
	case "0":
		log.Println("主隊進球")

		var sql = "UPDATE `sport_cycle` SET `home_score` = `home_score` + 1 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "1":
		log.Println("客隊進球")
		var sql = "UPDATE `sport_cycle` SET `away_score` = `away_score` + 1 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "2":
		log.Println("輸贏賠率變動")

		// +0.01
		var sql = "UPDATE `sport_cycle` SET `home_win_rate` = `home_win_rate` + 0.01,`away_win_rate` = `away_win_rate` - 0.01 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "3":
		log.Println("大小賠率變動")
		// +0.01
		var sql = "UPDATE `sport_cycle` SET `home_bs_rate` = `home_bs_rate` + 0.01,`away_bs_rate` = `away_bs_rate` - 0.01 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "4":
		log.Println("讓分賠率變動")
		// +0.01
		var sql = "UPDATE `sport_cycle` SET `home_handicap_rate` = `home_handicap_rate` + 0.01,`away_handicap_rate` = `away_handicap_rate` - 0.01 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "5":
		log.Println("輸贏賠率變動")
		// -0.01
		var sql = "UPDATE `sport_cycle` SET `home_win_rate` = `home_win_rate` - 0.01,`away_win_rate` = `away_win_rate` + 0.01 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "6":
		log.Println("大小賠率變動")
		// -0.01
		var sql = "UPDATE `sport_cycle` SET `home_bs_rate` = `home_bs_rate` - 0.01,`away_bs_rate` = `away_bs_rate` + 0.01 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "7":
		log.Println("讓分賠率變動")
		// +0.01
		var sql = "UPDATE `sport_cycle` SET `home_handicap_rate` = `home_handicap_rate` - 0.01,`away_handicap_rate` = `away_handicap_rate` + 0.01 WHERE `cycle_value`='" + cycle_value + "';"
		db.Exec(sql)

	case "8":
	case "9":
	case "10":
	case "11":
	case "12":
	case "13":
	}
}

func Floor(x float32) float32 {
	unit := float32(10000)
	return float32(int32(x*unit)) / unit
}

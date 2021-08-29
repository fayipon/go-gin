// 模擬體育賽事
package socket

import (
	"crypto/rand"
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

			// 虛擬動作
			action, _ := rand.Int(rand.Reader, big.NewInt(16))

			tm := time.Now().Add(-time.Minute * 5)
			cycle_value := tm.Format("01021504")

			switch action.String() {
			case "0":
				log.Println("主隊進球")

				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_score` = `home_score` + 1 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)

			case "1":
				log.Println("客隊進球")
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `away_score` = `away_score` + 1 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)

			case "2":
				log.Println("輸贏賠率變動")

				// +0.01
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_win_rate` = `home_win_rate` + 0.01,`away_win_rate` = `away_win_rate` - 0.01 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)

			case "3":
				log.Println("大小賠率變動")
				// +0.01
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_bs_rate` = `home_bs_rate` + 0.01,`away_bs_rate` = `away_bs_rate` - 0.01 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)
			case "4":
				log.Println("讓分賠率變動")
				// +0.01
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_handicap_rate` = `home_handicap_rate` + 0.01,`away_handicap_rate` = `away_handicap_rate` - 0.01 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)
			case "5":
				log.Println("輸贏賠率變動")
				// -0.01
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_win_rate` = `home_win_rate` - 0.01,`away_win_rate` = `away_win_rate` + 0.01 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)

			case "6":
				log.Println("大小賠率變動")
				// -0.01
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_bs_rate` = `home_bs_rate` - 0.01,`away_bs_rate` = `away_bs_rate` + 0.01 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)

			case "7":
				log.Println("讓分賠率變動")
				// +0.01
				var sport_cycle models.SportCycle
				var sql = "UPDATE `sport_cycle` SET `home_handicap_rate` = `home_handicap_rate` - 0.01,`away_handicap_rate` = `away_handicap_rate` + 0.01 WHERE `cycle_value`='" + cycle_value + "';"
				db.Raw(sql).Scan(&sport_cycle)

			case "8":
				log.Println("nothing")
			case "9":
				log.Println("nothing")
			case "10":
				log.Println("nothing")
			case "11":
				log.Println("nothing")
			case "12":
				log.Println("nothing")
			case "13":
				log.Println("nothing")
			}

			message := t.String()
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

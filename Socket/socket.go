package socket

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

// ClientManager is a websocket manager
type ClientManager struct {
	Clients    map[string]*Client
	Broadcast  chan []byte
	Private    chan []byte
	Register   chan *Client
	Unregister chan *Client
}

// Client is a websocket client
type Client struct {
	ID     string
	Socket *websocket.Conn
	Send   chan []byte
}

// Message is return msg
type Message struct {
	Action    string `json:"action,omitempty"`
	Sender    string `json:"sender,omitempty"`
	Recipient string `json:"recipient,omitempty"`
	Content   string `json:"content,omitempty"`
}

// Manager define a ws server manager
var Manager = ClientManager{
	Broadcast:  make(chan []byte),
	Private:    make(chan []byte),
	Register:   make(chan *Client),
	Unregister: make(chan *Client),
	Clients:    make(map[string]*Client),
}

// Start is  项目运行前, 协程开启start -> go Manager.Start()
func (manager *ClientManager) Start() {
	for {
		select {
		case conn := <-Manager.Register:
			Manager.Clients[conn.ID] = conn
			jsonMessage, _ := json.Marshal(&Message{Content: "Successful connection"})
			conn.Send <- jsonMessage
		case conn := <-Manager.Unregister:
			if _, ok := Manager.Clients[conn.ID]; ok {
				jsonMessage, _ := json.Marshal(&Message{Content: "disconnected"})
				conn.Send <- jsonMessage
				close(conn.Send)
				delete(Manager.Clients, conn.ID)
			}
		case message := <-Manager.Private:
			MessageStruct := Message{}
			json.Unmarshal(message, &MessageStruct)

			log.Printf("私聊:%s", message)

			for id, conn := range Manager.Clients {
				if (id != MessageStruct.Recipient) && (id != MessageStruct.Sender) {
					continue
				}

				select {
				case conn.Send <- message:
				default:
					close(conn.Send)
					delete(Manager.Clients, conn.ID)
				}
			}

		case message := <-Manager.Broadcast:
			MessageStruct := Message{}
			json.Unmarshal(message, &MessageStruct)

			log.Printf("廣播:%s", message)

			for _, conn := range Manager.Clients {
				select {
				case conn.Send <- message:
				default:
					close(conn.Send)
					delete(Manager.Clients, conn.ID)
				}
			}

		}

	}
}

func (c *Client) Read() {
	defer func() {
		Manager.Unregister <- c
		c.Socket.Close()
	}()

	for {
		c.Socket.PongHandler()
		_, message, err := c.Socket.ReadMessage()
		if err != nil {
			Manager.Unregister <- c
			c.Socket.Close()
			break
		}

		log.Printf("Revice:%s", string(message))

		MessageStruct := Message{}
		json.Unmarshal(message, &MessageStruct)

		if MessageStruct.Action == "broadcast" {
			Manager.Broadcast <- message
		} else {
			Manager.Private <- message
		}

	}
}

func (c *Client) Write() {
	defer func() {
		c.Socket.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Socket.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			c.Socket.WriteMessage(websocket.TextMessage, message)
		}
	}
}

func WsHandler(c *gin.Context) {

	uid := c.Query("uid")

	conn, err := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		http.NotFound(c.Writer, c.Request)
		return
	}

	client := &Client{
		ID:     uid,
		Socket: conn,
		Send:   make(chan []byte),
	}
	Manager.Register <- client
	go client.Read()
	go client.Write()
}

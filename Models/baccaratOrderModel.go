package models

import (
	"gorm.io/gorm"
)

type BaccaratOrder struct {
	gorm.Model
	ID              int32
	GameId          int8   `json:"game_id" form:"game_id"`
	GameTypeId      int8   `json:"game_type_id" form:"game_type_id"`
	GameCycle       string `gorm:"size:32"`
	GameCycleResult string `gorm:"size:512"`
	UserId          int32
	UserAccount     string  `gorm:"size:32"`
	TotalAmount     float32 `json:"total_amount" form:"total_amount"`
	ResultAmount    float32
	Status          int8
}

// TableName
func (BaccaratOrder) TableName() string {
	return "baccarat_order"
}

//create Order
func CreateBaccaratOrder(db *gorm.DB, BaccaratOrder *BaccaratOrder) (err error) {
	err = db.Create(BaccaratOrder).Error
	if err != nil {
		return err
	}
	return nil
}

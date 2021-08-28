package models

import (
	"gorm.io/gorm"
)

type SportOrder struct {
	gorm.Model
	ID              int32
	GameId          int8   `json:"game_id" form:"game_id"`
	GameTypeId      int8   `json:"game_type_id" form:"game_type_id"`
	GameCycle       string `gorm:"size:32"`
	GameCycleResult string `gorm:"size:512"`
	UserId          int32
	UserAccount     string  `gorm:"size:32"`
	BetRate         float32 `json:"bet_rate" form:"bet_rate"`
	TotalAmount     float32 `json:"total_amount" form:"total_amount"`
	ResultAmount    float32
	Status          int8
}

// TableName
func (SportOrder) TableName() string {
	return "sport_order"
}

//create Order
func CreateSportOrder(db *gorm.DB, SportOrder *SportOrder) (err error) {
	err = db.Create(SportOrder).Error
	if err != nil {
		return err
	}
	return nil
}

package models

import (
	"gorm.io/gorm"
)

type LotteryOrder struct {
	gorm.Model
	ID              int32
	GameId          int8   `json:"game_id" form:"game_id"`
	GameTypeId      int8   `json:"game_type_id" form:"game_type_id"`
	GameCycle       string `gorm:"size:32"`
	GameCycleResult string `gorm:"size:32"`
	UserId          int32
	UserAccount     string `gorm:"size:32"`
	GameBetInfo     string `json:"bet_info" form:"bet_info"`
	GameBetCount    int8   `json:"bet_count" form:"bet_count"`
	GameResultCount int8
	SingleAmount    float32 `json:"single_amount" form:"single_amount"`
	TotalAmount     float32
	ResultAmount    float32
	Status          int8
}

// TableName
func (LotteryOrder) TableName() string {
	return "lottery_order"
}

//create a LotteryOrder
func CreateLotteryOrder(db *gorm.DB, LotteryOrder *LotteryOrder) (err error) {
	err = db.Create(LotteryOrder).Error
	if err != nil {
		return err
	}
	return nil
}

//get LotteryOrder
func GetLotteryOrder(db *gorm.DB, LotteryOrder *[]LotteryOrder) (err error) {
	err = db.Find(LotteryOrder).Error
	if err != nil {
		return err
	}
	return nil
}

//get LotteryOrder by id
func GetLotteryOrderById(db *gorm.DB, LotteryOrder *LotteryOrder, id string) (err error) {
	err = db.Where("id = ?", id).First(LotteryOrder).Error
	if err != nil {
		return err
	}
	return nil
}

//update LotteryOrder
func UpdateLotteryOrder(db *gorm.DB, LotteryOrder *LotteryOrder) (err error) {
	db.Save(LotteryOrder)
	return nil
}

//delete LotteryOrder
func DeleteLotteryOrder(db *gorm.DB, LotteryOrder *LotteryOrder, id string) (err error) {
	db.Where("id = ?", id).Delete(LotteryOrder)
	return nil
}

package models

import (
	"gorm.io/gorm"
)

type LotteryOrder struct {
	gorm.Model
	ID           int
	GameId       string
	GameTypeId   string
	GameCycle    string
	UserId       int
	UserAccount  string
	GameBetInfo  string
	GameBetCount int
	SingleAmount float32
	TotalAmount  float32
	Status       int
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

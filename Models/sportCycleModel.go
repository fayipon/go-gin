package models

import (
	"gorm.io/gorm"
)

type SportCycle struct {
	gorm.Model
	ID               int32
	HomeTeam         string `gorm:"size:64"`
	AwayTeam         string `gorm:"size:64"`
	HomeScore        int8
	AwayScore        int8
	LeagueName       string `gorm:"size:64"`
	CycleValue       string `gorm:"size:32"`
	CycleResult      string `gorm:"size:512"`
	HomeWinRate      float32
	AwayWinRate      float32
	HandicapValue    float32
	HomeHandicapRate float32
	AwayHandicapRate float32
	BsValue          float32
	HomeBsRate       float32
	AwayBsRate       float32
	Status           int8
}

// TableName
func (SportCycle) TableName() string {
	return "sport_cycle"
}

//create Cycle
func CreateSportCycle(db *gorm.DB, SportCycle *SportCycle) (err error) {
	err = db.Create(SportCycle).Error
	if err != nil {
		return err
	}
	return nil
}

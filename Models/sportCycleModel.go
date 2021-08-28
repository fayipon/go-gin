package models

import (
	"gorm.io/gorm"
)

type SportCycle struct {
	gorm.Model
	ID          int32
	HomeTeam    string `gorm:"size:64"`
	AwayTeam    string `gorm:"size:64"`
	LeagueName  string `gorm:"size:64"`
	CycleValue  string `gorm:"size:32"`
	CycleResult string `gorm:"size:512"`
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

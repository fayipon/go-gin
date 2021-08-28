package models

import (
	"gorm.io/gorm"
)

type SportCycle struct {
	gorm.Model
	ID          int32
	CycleValue  string `gorm:"size:32"`
	CycleResult string `gorm:"size:512"`
}

// TableName
func (SportCycle) TableName() string {
	return "sport_cycle"
}

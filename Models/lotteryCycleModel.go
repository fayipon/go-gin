package models

import (
	"gorm.io/gorm"
)

type LotteryCycle struct {
	gorm.Model
	ID          int32
	CycleValue  string `gorm:"size:32"`
	CycleResult string `gorm:"size:32"`
}

// TableName
func (LotteryCycle) TableName() string {
	return "lottery_cycle"
}

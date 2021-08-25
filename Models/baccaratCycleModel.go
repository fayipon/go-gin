package models

import (
	"gorm.io/gorm"
)

type BaccaratCycle struct {
	gorm.Model
	ID          int32
	CycleValue  string `gorm:"size:32"`
	CycleResult string `gorm:"size:512"`
}

// TableName
func (BaccaratCycle) TableName() string {
	return "baccarat_cycle"
}

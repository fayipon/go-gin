package models

import (
	"gorm.io/gorm"
)

type Wallet struct {
	gorm.Model
	ID      int32
	Balance float32
}

// TableName
func (Wallet) TableName() string {
	return "common_user_balance"
}

//create wallet
func CreateWallet(db *gorm.DB, Wallet *Wallet) (err error) {

	err = db.Create(Wallet).Error
	if err != nil {
		return err
	}
	return nil
}

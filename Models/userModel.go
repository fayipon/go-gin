package models

import (
	"crypto/md5"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        int32
	Account   string    `gorm:"size:32;unique" form:"account"`
	Password  string    `gorm:"size:32" form:"password"`
	Status    int8      `gorm:"default:1"`
	CreatedAt time.Time `gorm:"not null"`
	UpdatedAt time.Time `gorm:"not null"`
}

// TableName
func (User) TableName() string {
	return "common_user"
}

//create a user
func CreateUser(db *gorm.DB, User *User) (err error) {
	// password md5
	if User.Password != "" {
		User.Password = md5password(User.Password)
	}

	err = db.Create(User).Error
	if err != nil {
		return err
	}
	return nil
}

//get users
func GetUsers(db *gorm.DB, User *[]User) (err error) {
	err = db.Find(User).Error
	if err != nil {
		return err
	}
	return nil
}

//get user by id
func GetUser(db *gorm.DB, User *User, id string) (err error) {
	err = db.Where("id = ?", id).First(User).Error
	if err != nil {
		return err
	}
	return nil
}

//update user
func UpdateUser(db *gorm.DB, User *User) (err error) {
	db.Save(User)
	return nil
}

//delete user
func DeleteUser(db *gorm.DB, User *User, id string) (err error) {
	db.Where("id = ?", id).Delete(User)
	return nil
}

// MD5 Password
func md5password(password string) string {
	data := []byte(password)
	has := md5.Sum(data)
	md5str := fmt.Sprintf("%x", has) //将[]byte转成16进制
	return md5str
}

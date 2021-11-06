package app

import "gorm.io/gorm" //sebelumnya saya sudah

type Server struct {
	DB *gorm.DB
}

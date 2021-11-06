package app

import (
	"fmt"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
) //sebelumnya saya setting go import di project golang ini

type Server struct {
	DB     *gorm.DB
	Router *mux.Router
}

func (server *Server) Initialize(){
	fmt.Println()
}

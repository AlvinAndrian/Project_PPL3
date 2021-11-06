package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
) //sebelumnya saya setting go import di project golang ini

type Server struct {
	DB     *gorm.DB
	Router *mux.Router
}

type AppConfig struct {
	AppName string
	AppEnv  string
	AppPort string
}

func (server *Server) Initialize(appConfig AppConfig) {
	fmt.Println("Welcome to" + appConfig.AppName)

	server.Router = mux.NewRouter()
	server.initializeRoutes()
}

func (server *Server) Run(addr string) {
	fmt.Printf("Listening to port %s", addr)
	log.Fatal(http.ListenAndServe(addr, server.Router))
}

func Run() {
	var server = Server{}
	var appConfig = AppConfig{}

	appConfig.AppName = "GoSadhelX"
	appConfig.AppEnv = "development"
	appConfig.AppPort = "1605"

	server.Initialize(appConfig)
	server.Run(":" + appConfig.AppPort)
}

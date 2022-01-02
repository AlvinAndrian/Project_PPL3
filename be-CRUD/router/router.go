package router

// terdapat file router.go yang memiliki fungsi sebagai penunjuk arah route mana yang tersedia
// dan akan memanggil fungsi controller sesuai route yang diminta(request).

import (
	"be-CRUD/controller"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	// endpoint
	router.HandleFunc("/api/video", controller.AmbilSemuaVideo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/video/{id}", controller.AmbilVideo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/video", controller.TmbhVideo).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/video/{id}", controller.UpdateVideo).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/video/{id}", controller.HapusVideo).Methods("DELETE", "OPTIONS")

	return router
}

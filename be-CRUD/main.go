package main

// file utama dalam projek ini,
// kita menjalankan projek ini dengan menjalankan / mengeksekusi file ini terlebih dahulu.

import (
	"be-CRUD/router"
	"fmt"
	"log"
	"net/http"
)

func main() {
	r := router.Router()
	// fs := http.FileServer(http.Dir("build"))
	// http.Handle("/", fs)
	fmt.Println("Server dijalankan pada port 8080...")

	log.Fatal(http.ListenAndServe(":8080", r))
}

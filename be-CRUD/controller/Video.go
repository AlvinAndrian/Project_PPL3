package controller
// terdapat file video.go yang memiliki fungsi sebagai wadah komunikasi awal sebelum terjadinya transaksi data ke db

import (
	"encoding/json" // package untuk enkode dan mendekode json menjadi struct dan sebaliknya
	"fmt"
	"strconv" // package yang digunakan untuk mengubah string menjadi tipe int

	"log"
	"net/http" // digunakan untuk mengakses objek permintaan dan respons dari api

	"be-CRUD/models" //models package dimana Video didefinisikan

	"github.com/gorilla/mux" // digunakan untuk mendapatkan parameter dari router
	_ "github.com/lib/pq"    // postgres golang driver
)

type response struct {
	ID      int64  `json:"id,omitempty"`
	Message string `json:"message,omitempty"`
}

type Response struct {
	Status  int            `json:"status"`
	Message string         `json:"message"`
	Data    []models.Video `json:"data"`
}

// TambahVideo
func TmbhVideo(w http.ResponseWriter, r *http.Request) {

	// create an empty user of type models.User
	// buat empty video dengan tipe models.Video
	var video models.Video

	// decode data json request ke video
	err := json.NewDecoder(r.Body).Decode(&video)

	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	// panggil modelsnya lalu insert video
	insertID := models.TambahVideo(video)

	// format response objectnya
	res := response{
		ID:      insertID,
		Message: "Data video telah ditambahkan",
	}

	// kirim response
	json.NewEncoder(w).Encode(res)
}

// AmbilVideo mengambil single data dengan parameter id
func AmbilVideo(w http.ResponseWriter, r *http.Request) {
	// set headernya
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// dapatkan idvideo dari parameter request, keynya adalah "id"
	params := mux.Vars(r)

	// konversi id dari string ke int
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	// memanggil models ambilsatuvideo dengan parameter id yg nantinya akan mengambil single data
	video, err := models.AmbilSatuVideo(int64(id))

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data video. %v", err)
	}

	// kirim response
	json.NewEncoder(w).Encode(video)
}

// Ambil semua data video
func AmbilSemuaVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// memanggil models AmbilSemuaVideo
	videos, err := models.AmbilSemuaVideo()

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	var response Response
	response.Status = 1
	response.Message = "Success"
	response.Data = videos

	// kirim semua response
	json.NewEncoder(w).Encode(response)
}

func UpdateVideo(w http.ResponseWriter, r *http.Request) {

	// ambil request parameter idnya
	params := mux.Vars(r)

	// konversikan ke int yang sebelumnya adalah string
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	// buat variable video dengan type models.Video
	var video models.Video

	// decode json request ke variable video
	err = json.NewDecoder(r.Body).Decode(&video)

	if err != nil {
		log.Fatalf("Tidak bisa decode request body.  %v", err)
	}

	// panggil updatevideo untuk mengupdate data
	updatedRows := models.UpdateVideo(int64(id), video)

	// ini adalah format message berupa string
	msg := fmt.Sprintf("Video telah berhasil diupdate. Jumlah yang diupdate %v rows/record", updatedRows)

	// ini adalah format response message
	res := response{
		ID:      int64(id),
		Message: msg,
	}

	// kirim berupa response
	json.NewEncoder(w).Encode(res)
}

func HapusVideo(w http.ResponseWriter, r *http.Request) {

	// ambil request parameter idnya
	params := mux.Vars(r)

	// konversikan ke int yang sebelumnya adalah string
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	// panggil fungsi hapusvideo , dan convert int ke int64
	deletedRows := models.HapusVideo(int64(id))

	// ini adalah format message berupa string
	msg := fmt.Sprintf("video sukses di hapus. Total data yang dihapus %v", deletedRows)

	// ini adalah format reponse message
	res := response{
		ID:      int64(id),
		Message: msg,
	}

	// send the response
	json.NewEncoder(w).Encode(res)
}

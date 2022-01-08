package controller

import (
	"encoding/json"
	"fmt"
	"strconv"

	"log"
	"net/http"

	"be-CRUD/models"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type ResponseDua struct {
	Status  int              `json:"status"`
	Message string           `json:"message"`
	Data    []models.Artikel `json:"data"`
}

// TmbhArtikel
func TmbhArtikel(w http.ResponseWriter, r *http.Request) {

	// membuat empty video dengan tipe models.Artikel
	var artikel models.Artikel

	// decode data json request ke artikel
	err := json.NewDecoder(r.Body).Decode(&artikel)

	if err != nil {
		log.Fatalf("Tidak bisa mendecode dari request body.  %v", err)
	}

	// panggil modelsnya lalu insert artikel
	insertID := models.TambahArtikel(artikel)

	// format response objectnya
	res := response{
		ID:      insertID,
		Message: "Data artikel telah ditambahkan",
	}

	// kirim response
	json.NewEncoder(w).Encode(res)
}

// AmbilArtikel mengambil single data dengan parameter id
func AmbilArtikel(w http.ResponseWriter, r *http.Request) {
	// set headernya
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// dapatkan idartikel dari parameter request, keynya adalah "id"
	params := mux.Vars(r)

	// konversi id dari string ke int
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	// memanggil models ambilsatuartikel dengan parameter id yg nantinya akan mengambil single data
	artikel, err := models.AmbilSatuArtikel(int64(id))

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data artikel. %v", err)
	}

	// kirim response
	json.NewEncoder(w).Encode(artikel)
}

// Ambil semua data artikel
func AmbilSemuaArtikel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// memanggil models AmbilSemuaArtikel
	articles, err := models.AmbilSemuaArtikel()

	if err != nil {
		log.Fatalf("Tidak bisa mengambil data. %v", err)
	}

	var response ResponseDua
	response.Status = 1
	response.Message = "Success"
	response.Data = articles

	// kirim semua response
	json.NewEncoder(w).Encode(response)
}

// UpdateArtikel
func UpdateArtikel(w http.ResponseWriter, r *http.Request) {

	// ambil request parameter idnya
	params := mux.Vars(r)

	// konversikan ke int yang sebelumnya adalah string
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	// buat variable artikel dengan type models.Artikel
	var artikel models.Artikel

	// decode json request ke variable artikel
	err = json.NewDecoder(r.Body).Decode(&artikel)

	if err != nil {
		log.Fatalf("Tidak bisa decode request body.  %v", err)
	}

	// panggil updateartikel untuk mengupdate data
	updatedRows := models.UpdateArtikel(int64(id), artikel)

	// ini adalah format message berupa string
	msg := fmt.Sprintf("Artikel telah berhasil diupdate. Jumlah yang diupdate %v rows/record", updatedRows)

	// ini adalah format response message
	res := response{
		ID:      int64(id),
		Message: msg,
	}

	// kirim berupa response
	json.NewEncoder(w).Encode(res)
}

func HapusArtikel(w http.ResponseWriter, r *http.Request) {

	// ambil request parameter idnya
	params := mux.Vars(r)

	// konversikan ke int yang sebelumnya adalah string
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		log.Fatalf("Tidak bisa mengubah dari string ke int.  %v", err)
	}

	// panggil fungsi hapusartikel , dan convert int ke int64
	deletedRows := models.HapusArtikel(int64(id))

	// ini adalah format message berupa string
	msg := fmt.Sprintf("artikel sukses di hapus. Total data yang dihapus %v", deletedRows)

	// ini adalah format reponse message
	res := response{
		ID:      int64(id),
		Message: msg,
	}

	// send the response
	json.NewEncoder(w).Encode(res)
}

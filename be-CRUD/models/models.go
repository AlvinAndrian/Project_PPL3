package models

// terdapat file models.go yang memiliki fungsi sebagai komunikasi ke db (terjadi operasi transaksi CRUD data)

import (
	"be-CRUD/config"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/lib/pq" // postgres golang driver
)

// jika return datanya ada yg null, pakai NullString, contoh:
// Penulis config.NullString `json:"penulis"`

type Video struct {
	ID         int64             `json:"video_id"`
	ArtikelID  config.NullString `json:"artikel_id"`
	Headings   string            `json:"video_headings"`
	Desc       string            `json:"video_desc"`
	Link       string            `json:"video_link"`
	CreateDate time.Time         `json:"video_create_date"`
	CreateBy   string            `json:"video_create_by"`
	UpdateDate time.Time         `json:"video_update_date"`
	UpdateBy   config.NullString `json:"video_update_by"`
	Keyword    string            `json:"video_keyword"`
}

type Artikel struct {
	ID         int64             `json:"artikel_id"`
	VideoID    config.NullString `json:"video_id"`
	Headings   string            `json:"artikel_headings"`
	Desc       string            `json:"artikel_desc"`
	Link       string            `json:"artikel_link"`
	Image      config.NullString `json:"artikel_iamge"`
	CreateDate time.Time         `json:"artikel_create_date"`
	CreateBy   string            `json:"artikel_create_by"`
	UpdateDate time.Time         `json:"artikel_update_date"`
	UpdateBy   config.NullString `json:"artikel_update_by"`
	Keyword    string            `json:"artikel_keyword"`
	Author     string            `json:"artikel_author"`
}

// fungsi untuk create single video
func TambahVideo(video Video) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	// buat insert query
	sqlStatement := `INSERT INTO VIDEO (video_headings, video_desc, video_link, video_create_date, video_create_by, video_update_date, video_update_by, video_keyword) VALUES ($1, $2, $3, current_timestamp, $4, current_timestamp, $5, $6) RETURNING video_id;`

	var video_id int64

	err := db.QueryRow(sqlStatement, video.Headings, video.Desc, video.Link, video.CreateBy, video.UpdateBy, video.Keyword).Scan(&video_id)

	if err != nil {
		log.Fatalf("Tidak Bisa mengeksekusi query. %v", err)
	}

	fmt.Printf("Insert data single record %v", video_id)

	// return insert video_id
	return video_id
}

// fungsi untuk get all video
func AmbilSemuaVideo() ([]Video, error) {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	var videos []Video

	// buat select query
	sqlStatement := `SELECT * FROM VIDEO`

	// mengeksekusi sql query
	rows, err := db.Query(sqlStatement)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	// tutup eksekusi proses sql query
	defer rows.Close()

	// iterasi mengambil datanya
	for rows.Next() {
		var video Video

		// ambil data video dan unmarshal ke structnya
		err = rows.Scan(&video.ID, &video.ArtikelID, &video.Headings, &video.Desc, &video.Link, &video.CreateDate, &video.CreateBy, &video.UpdateDate, &video.UpdateBy, &video.Keyword)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		// masukkan kedalam slice videos
		videos = append(videos, video)

	}

	// return empty video atau jika error
	return videos, err
}

// fungsi untuk get single video
func AmbilSatuVideo(id int64) (Video, error) {
	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	var video Video

	// buat sql query
	sqlStatement := `SELECT * FROM video WHERE video_id=$1`

	// eksekusi sql statement
	row := db.QueryRow(sqlStatement, id)

	err := row.Scan(&video.ID, &video.ArtikelID, &video.Headings, &video.Desc, &video.Link, &video.CreateDate, &video.CreateBy, &video.UpdateDate, &video.UpdateBy, &video.Keyword)

	switch err {
	case sql.ErrNoRows:
		fmt.Println("Tidak ada data yang dicari!")
		return video, nil
	case nil:
		return video, nil
	default:
		log.Fatalf("tidak bisa mengambil data. %v", err)
	}

	return video, err
}

// fungsi untuk update single video
func UpdateVideo(video_id int64, video Video) int64 {

	db := config.CreateConnection()

	defer db.Close()

	// sql query create
	sqlStatement := `UPDATE video SET video_headings=$2, video_desc=$3, video_link=$4, video_created_by=$5, video_update_by=$6 WHERE video_id=$1`

	// eksekusi sql statement
	res, err := db.Exec(sqlStatement, video.ID, video.Headings, video.Desc, video.Link, video.CreateBy, video.UpdateBy, video.Keyword)

	if err != nil {
		log.Fatalf("Tidak bisa mengeksekusi query. %v", err)
	}

	// cek berapa banyak row/data yang diupdate
	rowsAffected, err := res.RowsAffected()

	//cek
	if err != nil {
		log.Fatalf("Error ketika mengecheck rows/data yang diupdate. %v", err)
	}

	fmt.Printf("Total rows/record yang diupdate %v\n", rowsAffected)

	return rowsAffected
}

// fungsi untuk delete single video
func HapusVideo(id int64) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	// buat sql query
	sqlStatement := `DELETE FROM video WHERE video_id=$1`

	// eksekusi sql statemen
	res, err := db.Exec(sqlStatement, id)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	// cek berapa jumlah data/row yang di hapus
	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("tidak bisa mencari data. %v", err)
	}

	fmt.Printf("Total data yang terhapus %v", rowsAffected)

	return rowsAffected
}

// fungsi untuk create single artikel
func TambahArtikel(artikel Artikel) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir
	defer db.Close()

	// buat insert query
	sqlStatement := `INSERT INTO ARTIKEL (artikel_id, artikel_headings, artikel_desc, artikel_link, artikel_image, artikel_create_date, artikel_create_by, artikel_update_date, artikel_update_by, artikel_keyword, artikel_author) VALUES (nextval('artikelidseq'), $1, $2, $3, $4, current_timestamp, $5, current_timestamp, $6, $7, $8) RETURNING artikel_id;`

	var artikel_id int64

	err := db.QueryRow(sqlStatement, artikel.Headings, artikel.Desc, artikel.Link, artikel.Image, artikel.CreateBy, artikel.UpdateBy, artikel.Keyword, artikel.Author).Scan(&artikel_id)

	if err != nil {
		log.Fatalf("Tidak Bisa mengeksekusi query. %v", err)
	}

	fmt.Printf("Insert data single record %v", artikel_id)

	// return insert artikel_id
	return artikel_id
}

// fungsi untuk get all artikel
func AmbilSemuaArtikel() ([]Artikel, error) {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	var articles []Artikel

	// buat select query
	sqlStatement := `SELECT * FROM ARTIKEL`

	// mengeksekusi sql query
	rows, err := db.Query(sqlStatement)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	// tutup eksekusi proses sql query
	defer rows.Close()

	// iterasi mengambil datanya
	for rows.Next() {
		var artikel Artikel

		// ambil data video dan unmarshal ke structnya
		err = rows.Scan(&artikel.ID, &artikel.Headings, &artikel.Desc, &artikel.Link, &artikel.Image, &artikel.CreateDate, &artikel.CreateBy, &artikel.UpdateDate, &artikel.UpdateBy, &artikel.Keyword, &artikel.Author)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		// masukkan kedalam slice articles
		articles = append(articles, artikel)

	}

	// return empty artikel atau jika error
	return articles, err
}

// fungsi untuk get single artikel
func AmbilSatuArtikel(id int64) (Artikel, error) {
	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	var artikel Artikel

	// buat sql query
	sqlStatement := `SELECT * FROM Artikel WHERE artikel_id=$1`

	// eksekusi sql statement
	row := db.QueryRow(sqlStatement, id)

	err := row.Scan(&artikel.ID, &artikel.Headings, &artikel.Desc, &artikel.Link, &artikel.Image, &artikel.CreateDate, &artikel.CreateBy, &artikel.UpdateDate, &artikel.UpdateBy, &artikel.Keyword, &artikel.Author)

	switch err {
	case sql.ErrNoRows:
		fmt.Println("Tidak ada data yang dicari!")
		return artikel, nil
	case nil:
		return artikel, nil
	default:
		log.Fatalf("tidak bisa mengambil data. %v", err)
	}

	return artikel, err
}

// fungsi untuk update single artikel
func UpdateArtikel(artikel_id int64, artikel Artikel) int64 {

	db := config.CreateConnection()

	defer db.Close()

	// sql query create
	sqlStatement := `UPDATE Artikel SET artikel_headings = $2, artikel_desc = $3, artikel_link = $4, artikel_image = $5, artikel_create_by = $6, artikel_update_by = $7, artikel_keyword = $8, artikel_author = $9 WHERE artikel_id=$1`

	// eksekusi sql statement
	res, err := db.Exec(sqlStatement, artikel.ID, artikel.Headings, artikel.Desc, artikel.Link, artikel.Image, artikel.CreateBy, artikel.UpdateBy, artikel.Keyword, artikel.Author)

	if err != nil {
		log.Fatalf("Tidak bisa mengeksekusi query. %v", err)
	}

	// cek berapa banyak row/data yang diupdate
	rowsAffected, err := res.RowsAffected()

	//cek
	if err != nil {
		log.Fatalf("Error ketika mengecheck rows/data yang diupdate. %v", err)
	}

	fmt.Printf("Total rows/record yang diupdate %v\n", rowsAffected)

	return rowsAffected
}

// fungsi untuk delete single artikel
func HapusArtikel(id int64) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	// buat sql query
	sqlStatement := `DELETE FROM Artikel WHERE artikel_id=$1`

	// eksekusi sql statemen
	res, err := db.Exec(sqlStatement, id)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	// cek berapa jumlah data/row yang di hapus
	rowsAffected, err := res.RowsAffected()

	if err != nil {
		log.Fatalf("tidak bisa mencari data. %v", err)
	}

	fmt.Printf("Total data yang terhapuss %v", rowsAffected)

	return rowsAffected
}

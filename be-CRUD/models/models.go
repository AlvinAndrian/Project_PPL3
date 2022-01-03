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
	sqlStatement := `SELECT * FROM video`

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

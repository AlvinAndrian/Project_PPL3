package models
// terdapat file models.go yang memiliki fungsi sebagai komunikasi ke db 
// yang biasanya terjadi operasi transaksi CRUD data.

import (
	"be-CRUD/config"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // postgres golang driver
)

// Video schema dari tbl_video
// jika return datanya ada yg null, pake NullString, contoh:
// Penulis       config.NullString `json:"penulis"`
// createdDate dan UpdateDate ga dibuat struct tapi langsung current_timestamp di statement query

type Video struct {
	ID            int64  		`json:"id"`
	Headings   	  string 		`json:"headings"`
	Desc          string 		`json:"desc"`
	Link          string 		`json:"link"`
	CreatedBy     string 		`json:"createdby"`
	UpdatedBy     string 		`json:"updatedby"`
}

func TambahVideo(video Video) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// tutup koneksinya di akhir proses
	defer db.Close()

	// buat insert query
	// mengembalikan nilai id akan mengembalikan id dari video yang dimasukkan ke db
	sqlStatement := `INSERT INTO tbl_video (headings, desc, link, createdby, updatedby) VALUES ($1, $2, $3, $4, $5) RETURNING id`

	// id yang dimasukkan akan disimpan di id ini
	var id int64

	// Scan function akan menyimpan insert id didalam id id
	err := db.QueryRow(sqlStatement, video.Headings, video.Desc, video.Link, video.CreatedBy, video.UpdatedBy).Scan(&id)

	if err != nil {
		log.Fatalf("Tidak Bisa mengeksekusi query. %v", err)
	}

	fmt.Printf("Insert data single record %v", id)

	// return insert id
	return id
}

// ambil satu buku
func AmbilSemuaBuku() ([]Video, error) {
	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// kita tutup koneksinya di akhir proses
	defer db.Close()

	var videos []Video

	// kita buat select query
	sqlStatement := `SELECT * FROM tbl_video`

	// mengeksekusi sql query
	rows, err := db.Query(sqlStatement)

	if err != nil {
		log.Fatalf("tidak bisa mengeksekusi query. %v", err)
	}

	// kita tutup eksekusi proses sql qeurynya
	defer rows.Close()

	// kita iterasi mengambil datanya
	for rows.Next() {
		var video Video

		// kita ambil datanya dan unmarshal ke structnya
		err = rows.Scan(&video.ID, &video.Headings, &video.Desc, &video.Link, &video.CreatedBy, &video.UpdatedBy)

		if err != nil {
			log.Fatalf("tidak bisa mengambil data. %v", err)
		}

		// masukkan kedalam slice videos
		videos = append(videos, video)

	}

	// return empty video atau jika error
	return videos, err
}

// mengambil satu video
func AmbilSatuVideo(id int64) (Video, error) {
	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// kita tutup koneksinya di akhir proses
	defer db.Close()

	var video Video

	// buat sql query
	sqlStatement := `SELECT * FROM tbl_video WHERE id=$1`

	// eksekusi sql statement
	row := db.QueryRow(sqlStatement, id)

	err := row.Scan(&video.ID, &video.Headings, &video.Desc, &video.Link, &video.CreatedBy, &video.UpdatedBy)

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

// update user in the DB
func UpdateVideo(id int64, video Video) int64 {

	db := config.CreateConnection()

	defer db.Close()

	// sql query create
	sqlStatement := `UPDATE tbl_video SET headings=$2, desc=$3, link=$4, createdby=$5, updatedby=$6 WHERE id=$1`

	// eksekusi sql statement
	res, err := db.Exec(sqlStatement, id, video.Headings, video.Desc, video.Link, video.CreatedBy, video.UpdatedBy)

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

func HapusVideo(id int64) int64 {

	// mengkoneksikan ke db postgres
	db := config.CreateConnection()

	// kita tutup koneksinya di akhir proses
	defer db.Close()

	// buat sql query
	sqlStatement := `DELETE FROM tbl_video WHERE id=$1`

	// eksekusi sql statement
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

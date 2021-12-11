package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	http.HandleFunc("/", GETHandler)
	http.HandleFunc("/create", POSTHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

type TBL_VIDEO struct {
	ID          int       `json:"id"`
	Headings    string    `json:"headings"`
	Desc        string    `json:"desc"`
	Link        string    `json:"link"`
	CreatedDate time.Time `json:"createdate"`
	CreatedBy   string    `json:"createby"`
	UpdateDate  time.Time `json:"updatedate"`
	UpdateBy    string    `json:"updateby"`
}

const (
	host     = "103.157.96.115"
	port     = "5432"
	user     = "downhill"
	password = "whirlpool"
	dbname   = "db_downhill"
)

func OpenConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname) //ada error disini karena sebelumnya saya set port %d harusnya %s karna string

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	return db
}

//penanganan
func GETHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	rows, err := db.Query("SELECT * FROM TBL_VIDEO")
	if err != nil {
		log.Fatal(err)
	}

	var videos []TBL_VIDEO

	for rows.Next() {
		var video TBL_VIDEO //deklarasi var video bertipe struct TBL_VIDEO
		rows.Scan(&video.ID, &video.Headings, &video.Desc, &video.Link, &video.CreatedDate, &video.CreatedBy, &video.UpdateDate, &video.UpdateBy)
		videos = append(videos, video)
	}

	videosBytes, _ := json.MarshalIndent(videos, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	w.Write(videosBytes)

	defer rows.Close()
	defer db.Close()
}

func POSTHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	var p TBL_VIDEO
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sqlStatement := `INSERT INTO tbl_video (id,headings,desc,link,createdate,createby,updatedate,updateby) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
	_, err = db.Exec(sqlStatement, p.ID, p.Headings, p.Desc, p.Link, p.CreatedDate, p.CreatedBy, p.UpdateDate, p.UpdateBy)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	defer db.Close()
}

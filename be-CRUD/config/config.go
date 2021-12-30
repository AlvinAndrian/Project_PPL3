package config
// terdapat file config.go yang memiliki fungsi untuk konfigurasi koneksi ke DB PostgreSql.

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv" // package used to read the .env file
	_ "github.com/lib/pq"      // postgres golang driver
)

// membuat koneksi dgn db posgres
func CreateConnection() *sql.DB {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	/* buka koneksi ke db
	PostgreSQL Authentication
	A2 - Downhill
	IP Address: 103.157.96.115
	Database Name: db_downhill
	User: downhill
	Password: whirlpool */

	db, err := sql.Open("postgres", os.Getenv("POSTGRES_URL"))
	
	if err != nil {
		panic(err)
	}

	// check the database connection
	err = db.Ping()

	if err != nil {
		panic(err)
	}

	fmt.Println("Sukses Konek ke Db!")
	// return the connection
	return db
}


// fungsi untuk menampung jika struct / data bertipe NULL maka dia akan mengisikan data(string) kosong.
type NullString struct {
	sql.NullString
}

func (s NullString) MarshalJSON() ([]byte, error) {
	if !s.Valid {
		return []byte("null"), nil
	}
	return json.Marshal(s.String)
}

func (s *NullString) UnmarshalJSON(data []byte) error {
	if string(data) == "null" {
		s.String, s.Valid = "", false
		return nil
	}
	s.String, s.Valid = string(data), true
	return nil
}

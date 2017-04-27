package sessionmanager

import (
  "database/sql"
	"github.com/CampaignShare/db"
  "fmt"
)

func StartSession() (*sql.DB){
  session, err := sql.Open("mysql", db.DbConnectionString)
  if err != nil{
    fmt.Println("ERR connecting to db")
  }
  return session
}

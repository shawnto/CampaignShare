package gearrequests

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db"
	"net/http"
)

import _ "github.com/go-sql-driver/mysql"

type GearReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type GearViewReqBody struct{
  GearId int
}

type GearResponse struct{
  Id int
  Name string
  Description string
  Alignment string
  Type string
  DateCreated string
  Stats string
  ShortDescription string
  Artwork string
  Thumbnail string
	OriginalVersion bool
}

func GetGear(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r GearReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
  dbSession, err := sql.Open("mysql", db.DbConnectionString)
  if err != nil{
    fmt.Println("ERR connecting to db")
  }
  defer dbSession.Close()
  var gearResps []GearResponse
  rows, err := dbSession.Query(`select * from gear`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var gear GearResponse
    err := rows.Scan(&gear.Id, &gear.Name, &gear.Description, &gear.Alignment,
                     &gear.Type, &gear.DateCreated, &gear.Stats, &gear.ShortDescription,
                     &gear.Artwork, &gear.Thumbnail, &gear.OriginalVersion)
    if err != nil {
			panic(err.Error())
		}
		gearResps = append(gearResps, gear)
  }
  if len(gearResps) < 1{
    var gear GearResponse
    gearResps = append(gearResps, gear)
  }
  b, err := json.Marshal(gearResps)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetGearView(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r GearViewReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	var gear GearResponse
	err = dbSession.QueryRow("select * from gear where id=?;", r.GearId).Scan(&gear.Id,
                            &gear.Name, &gear.Description, &gear.Alignment,
                            &gear.Type, &gear.DateCreated, &gear.Stats, &gear.ShortDescription,
                            &gear.Artwork, &gear.Thumbnail,
													  &gear.OriginalVersion)
	switch {
	case err == sql.ErrNoRows:
		fmt.Printf("None found")
	case err != nil:
		fmt.Printf("Other Error")
	}

	b, err := json.Marshal(gear)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

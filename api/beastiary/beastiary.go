package beastiaryrequests

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db"
	"net/http"
)

import _ "github.com/go-sql-driver/mysql"


type BeastReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type BeastViewReqBody struct{
  BeastId int
}

type BeastResponse struct{
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
  CombatRoomModel string
	OriginalVersion bool
}

func GetBeasts(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r BeastReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
  dbSession, err := sql.Open("mysql", db.DbConnectionString)
  if err != nil{
    fmt.Println("ERR connecting to db")
  }
  defer dbSession.Close()
  var beastResps []BeastResponse
  rows, err := dbSession.Query(`select * from beastiary`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var beast BeastResponse
    err := rows.Scan(&beast.Id, &beast.Name, &beast.Description, &beast.Alignment,
                     &beast.Type, &beast.DateCreated, &beast.Stats, &beast.ShortDescription,
                     &beast.Artwork, &beast.Thumbnail, &beast.CombatRoomModel,
									   &beast.OriginalVersion)
    if err != nil {
			panic(err.Error())
		}
		beastResps = append(beastResps, beast)
  }
  if len(beastResps) < 1{
    var beast BeastResponse
    beastResps = append(beastResps, beast)
  }
  b, err := json.Marshal(beastResps)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetBeastView(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r BeastViewReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	var beast BeastResponse
	err = dbSession.QueryRow("select * from beastiary where id=?;", r.BeastId).Scan(&beast.Id,
                            &beast.Name, &beast.Description, &beast.Alignment,
                            &beast.Type, &beast.DateCreated, &beast.Stats, &beast.ShortDescription,
                            &beast.Artwork, &beast.Thumbnail, &beast.CombatRoomModel,
													  &beast.OriginalVersion)
	switch {
	case err == sql.ErrNoRows:
		fmt.Printf("None found")
	case err != nil:
		fmt.Printf("Other Error")
	}

	b, err := json.Marshal(beast)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

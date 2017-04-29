package gearrequests

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/CampaignShare/db/models/gear"
)

import _ "github.com/go-sql-driver/mysql"

type GearReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type GearViewReqBody struct{
  GearId int
}

func GetGear(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r GearReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
  gears := gearmodel.All()
  b, err := json.Marshal(gears)
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
	gear := gearmodel.GetGear(r.GearId)
	b, err := json.Marshal(gear)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

package beastiaryrequests

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/CampaignShare/db/models/beastiary"
)

import _ "github.com/go-sql-driver/mysql"


type BeastReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type BeastViewReqBody struct{
  BeastId int
}

func GetBeasts(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r BeastReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
	beasts := beastiarymodel.All()
  b, err := json.Marshal(beasts)
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
	beast := beastiarymodel.GetBeast(r.BeastId)

	b, err := json.Marshal(beast)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

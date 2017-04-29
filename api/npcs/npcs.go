package npcsrequests

import (
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db/models/npcs"
	"net/http"
)

import _ "github.com/go-sql-driver/mysql"


type NpcReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type NpcViewReqBody struct{
  NpcId int
}


func GetNpcs(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r NpcReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
	npcs := npcmodel.All()
  b, err := json.Marshal(npcs)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetNpcView(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r NpcViewReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	npc := npcmodel.GetNpc(r.NpcId)
	b, err := json.Marshal(npc)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

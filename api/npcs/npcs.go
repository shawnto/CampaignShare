package npcsrequests

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db"
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

type NpcResponse struct{
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

func GetNpcs(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r NpcReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
  dbSession, err := sql.Open("mysql", db.DbConnectionString)
  if err != nil{
    fmt.Println("ERR connecting to db")
  }
  defer dbSession.Close()
  var npcResps []NpcResponse
  rows, err := dbSession.Query(`select * from npcs`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var npc NpcResponse
    err := rows.Scan(&npc.Id, &npc.Name, &npc.Description, &npc.Alignment,
                     &npc.Type, &npc.DateCreated, &npc.Stats, &npc.ShortDescription,
                     &npc.Artwork, &npc.Thumbnail, &npc.OriginalVersion)
    if err != nil {
			panic(err.Error())
		}
		npcResps = append(npcResps, npc)
  }
  if len(npcResps) < 1{
    var npc NpcResponse
    npcResps = append(npcResps, npc)
  }
  b, err := json.Marshal(npcResps)
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
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	var npc NpcResponse
	err = dbSession.QueryRow("select * from npcs where id=?;", r.NpcId).Scan(&npc.Id,
                            &npc.Name, &npc.Description, &npc.Alignment,
                            &npc.Type, &npc.DateCreated, &npc.Stats, &npc.ShortDescription,
                            &npc.Artwork, &npc.Thumbnail, &npc.OriginalVersion)
	switch {
	case err == sql.ErrNoRows:
		fmt.Printf("None found")
	case err != nil:
		fmt.Printf("Other Error")
	}

	b, err := json.Marshal(npc)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)


type Npc struct{
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


func AllNpcs() ([]Npc){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var npcs []Npc
  rows, err := dbSession.Query(`select * from npcs`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var npc Npc
    err := rows.Scan(&npc.Id, &npc.Name, &npc.Description, &npc.Alignment,
                     &npc.Type, &npc.DateCreated, &npc.Stats, &npc.ShortDescription,
                     &npc.Artwork, &npc.Thumbnail, &npc.OriginalVersion)
    if err != nil {
			panic(err.Error())
		}
		npcs = append(npcs, npc)
  }
  if len(npcs) < 1{
    var npc Npc
    npcs = append(npcs, npc)
  }
  return npcs
}

func GetNpc(NpcId int) (Npc){
  dbSession := sessionmanager.StartSession()
	defer dbSession.Close()
	var npc Npc
	err := dbSession.QueryRow("select * from npcs where id=?;", NpcId).Scan(&npc.Id,
                            &npc.Name, &npc.Description, &npc.Alignment,
                            &npc.Type, &npc.DateCreated, &npc.Stats, &npc.ShortDescription,
                            &npc.Artwork, &npc.Thumbnail, &npc.OriginalVersion)
	if err != nil{
		fmt.Printf("Other Error")
	}
  return npc
}

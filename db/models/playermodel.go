package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)

type Player struct{
  Id int
  UserId int
  CharacterName string
  CampaignId int
  IsGM bool
}


func CampaignPlayers(campaignId int) ([]Player){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var players []Player
  rows, err := dbSession.Query(`select * from players where CampaignId=?
															 and IsGm=0;`,
															 campaignId)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var player Player
    err := rows.Scan(&player.Id, &player.UserId, &player.CharacterName,
                     &player.CampaignId, &player.IsGM)
    if err != nil {
			panic(err.Error())
		}
		players = append(players, player)
  }
  if len(players) < 1{
    var player Player
    players = append(players, player)
  }
  return players
}

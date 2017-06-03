package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)


type Campaign struct{
  Id int
  DateCreated string
  Synopsis string
  Thumbnail string
  CreatedBy int
  VotesUp int
  VotesDown int
  OriginalVersion bool
  Title string
  Summary string
}


type Players struct{
  Players []int
}

type CampaignInstance struct{
  Id int
  CampaignId int
  DateCreated string
  OriginalVersion int
  BelongsTo int
  Assets string
  Players string
}


func All() ([]Campaign){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var campaigns []Campaign
  rows, err := dbSession.Query(`select * from campaigns`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var camp Campaign
    err := rows.Scan(&camp.Id, &camp.DateCreated, &camp.Synopsis,
                     &camp.Thumbnail, &camp.CreatedBy, &camp.VotesUp,
                     &camp.VotesDown, &camp.OriginalVersion, &camp.Title,
                     &camp.Summary)
    if err != nil {
			panic(err.Error())
		}
		campaigns = append(campaigns, camp)
  }
  if len(campaigns) < 1{
    var camp Campaign
    campaigns = append(campaigns, camp)
  }
  return campaigns
}


func Get(campaignId int) (Campaign){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
	var camp Campaign
	err := dbSession.QueryRow(`select * from campaigns where id=?
                            and OriginalVersion=1;`, campaignId).Scan(&camp.Id,
                   &camp.DateCreated, &camp.Synopsis,
                   &camp.Thumbnail, &camp.CreatedBy, &camp.VotesUp,
                   &camp.VotesDown, &camp.OriginalVersion, &camp.Title,
                   &camp.Summary)
	if err != nil{
		fmt.Printf("Other Error")
	}
  return camp
}


func GetInstances(campaignId int) ([]CampaignInstance){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  // A User might have multiple Campaign Instances, so we use a slice.
  var cInstances []CampaignInstance
  rows, err := dbSession.Query(`select * from campaigninstances`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var camp CampaignInstance
    err := rows.Scan(&camp.Id, &camp.CampaignId, &camp.DateCreated,
                     &camp.OriginalVersion, &camp.BelongsTo, &camp.Assets,
                     &camp.Players)
    if err != nil {
			panic(err.Error())
		}
		cInstances = append(cInstances, camp)
  }
  if len(cInstances) < 1{
    var camp CampaignInstance
    cInstances = append(cInstances, camp)
  }
  return cInstances
}

package assetrequests

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/CampaignShare/db/models"
)

import _ "github.com/go-sql-driver/mysql"


type CampaignReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type CampaignViewReqBody struct{
  CampaignId int
}


type cInstanceReqBody struct{
	CampaignId int
}

type playerReqBody struct{
	CampaignId int
}

type CampaignResponse struct{
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


type Assets struct{
	Beasts []models.Beast
	Gear []models.Gear
	Maps []models.Map
}

type campaignInstanceResp struct{
  Id int
  CampaignId int
  DateCreated string
  OriginalVersion int
  BelongsTo int
  Assets Assets
  Players []int
}

func GetCampaigns(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r CampaignReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
  campaignResps := models.All()
  b, err := json.Marshal(campaignResps)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetCampaignView(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r CampaignViewReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	campaign := models.Get(r.CampaignId)
	b, err := json.Marshal(campaign)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}


func GetCampaignInstances(rw http.ResponseWriter, req *http.Request){
	decoder := json.NewDecoder(req.Body)
	var r cInstanceReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	cInstances := models.GetInstances(r.CampaignId)
	var cInstancesResp []campaignInstanceResp
	if err != nil {}
	for _, instance := range cInstances{
		cInstResp := campaignInstanceResp{Id: instance.Id, CampaignId: instance.Id,
																			DateCreated: instance.DateCreated,
																			OriginalVersion: instance.OriginalVersion,
																			BelongsTo: instance.BelongsTo}
		var players []int
		var assets Assets
		p := []byte(instance.Players)
		a := []byte(instance.Assets)
		err := json.Unmarshal(a, &assets)
		if err != nil {}
		err = json.Unmarshal(p, &players)
		cInstResp.Players = players
		cInstResp.Assets = assets
		if err != nil {}
		cInstancesResp = append(cInstancesResp, cInstResp)
	}
	b, err := json.Marshal(cInstancesResp)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}


func GetCampaignPlayers(rw http.ResponseWriter, req *http.Request){
	decoder := json.NewDecoder(req.Body)
	var r playerReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	players := models.CampaignPlayers(r.CampaignId)
	b, err := json.Marshal(players)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

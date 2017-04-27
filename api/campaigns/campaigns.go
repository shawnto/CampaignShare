package campaignsrequests

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db"
	"net/http"
)

import _ "github.com/go-sql-driver/mysql"


type CampaignReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type CampaignViewReqBody struct{
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

func GetCampaigns(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var r CampaignReqBody
  err := decoder.Decode(&r)
  if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
  dbSession, err := sql.Open("mysql", db.DbConnectionString)
  if err != nil{
    fmt.Println("ERR connecting to db")
  }
  defer dbSession.Close()
  var campaignResps []CampaignResponse
  rows, err := dbSession.Query(`select * from campaigns where OriginalVersion=1`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var campaign CampaignResponse
    err := rows.Scan(&campaign.Id, &campaign.DateCreated, &campaign.Synopsis,
                     &campaign.Thumbnail, &campaign.CreatedBy, &campaign.VotesUp,
                     &campaign.VotesDown, &campaign.OriginalVersion,
                     &campaign.Title, &campaign.Summary)
    if err != nil {
			panic(err.Error())
		}
		campaignResps = append(campaignResps, campaign)
  }
  if len(campaignResps) < 1{
    var campaign CampaignResponse
    campaignResps = append(campaignResps, campaign)
  }
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
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	var campaign CampaignResponse
	err = dbSession.QueryRow(`select * from campaigns where id=?
                            and OriginalVersion=1;`, r.CampaignId).Scan(&campaign.Id,
                   &campaign.DateCreated, &campaign.Synopsis,
                   &campaign.Thumbnail, &campaign.CreatedBy, &campaign.VotesUp,
                   &campaign.VotesDown, &campaign.OriginalVersion,
                   &campaign.Title, &campaign.Summary)
	switch {
	case err == sql.ErrNoRows:
		fmt.Printf("None found")
	case err != nil:
		fmt.Printf("Other Error")
	}

	b, err := json.Marshal(campaign)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

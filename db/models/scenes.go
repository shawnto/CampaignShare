package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)

type Scene struct{
  Id int
  Summary string
  DateCreated string
  CampaignId int
  ExpectedOrder int
  Title string
}

func AllScenes() ([]Scene){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var scenes []Scene
  rows, err := dbSession.Query(`select * from scenes order by ExpectedOrder`)
  if err != nil{
    fmt.Printf("ERROR in scenes query: %s", err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var s Scene
    err := rows.Scan(&s.Id, &s.Summary, &s.DateCreated, &s.CampaignId,
                     &s.ExpectedOrder, &s.Title)
    if err != nil {
			panic(err.Error())
		}
		scenes = append(scenes, s)
  }
  return scenes
}

func GetScene(sceneId int) (Scene){
	dbSession := sessionmanager.StartSession()
	defer dbSession.Close()
	var s Scene
	err := dbSession.QueryRow("select * from scenes where id=?;", sceneId).Scan(&s.Id,
													&s.Summary, &s.DateCreated, &s.CampaignId,
										 			&s.ExpectedOrder, &s.Title)
	if err != nil {
		panic(err.Error())
	}
	return s

}

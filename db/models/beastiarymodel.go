package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)

type Beast struct{
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
  CombatRoomModel string
	OriginalVersion bool
}

func AllBeasts() ([]Beast){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var beastResps []Beast
  rows, err := dbSession.Query(`select * from beastiary`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var beast Beast
    err := rows.Scan(&beast.Id, &beast.Name, &beast.Description, &beast.Alignment,
                     &beast.Type, &beast.DateCreated, &beast.Stats, &beast.ShortDescription,
                     &beast.Artwork, &beast.Thumbnail, &beast.CombatRoomModel,
									   &beast.OriginalVersion)
    if err != nil {
			panic(err.Error())
		}
		beastResps = append(beastResps, beast)
  }
  return beastResps
}

func GetBeast(beastId int) (Beast){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
	var beast Beast
	err := dbSession.QueryRow("select * from beastiary where id=?;", beastId).Scan(&beast.Id,
                            &beast.Name, &beast.Description, &beast.Alignment,
                            &beast.Type, &beast.DateCreated, &beast.Stats, &beast.ShortDescription,
                            &beast.Artwork, &beast.Thumbnail, &beast.CombatRoomModel,
													  &beast.OriginalVersion)

	if err != nil{
		fmt.Printf("Other Error")
	}
	return beast

}

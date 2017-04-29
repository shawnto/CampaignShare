package gearmodel

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)


type Gear struct{
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


func All() ([]Gear){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var gears []Gear
  rows, err := dbSession.Query(`select * from gear`)
  if err != nil{
    fmt.Println("ERR getting row")
    fmt.Println(err.Error())
  }
  defer rows.Close()
  for rows.Next(){
    var gear Gear
    err := rows.Scan(&gear.Id, &gear.Name, &gear.Description, &gear.Alignment,
                     &gear.Type, &gear.DateCreated, &gear.Stats, &gear.ShortDescription,
                     &gear.Artwork, &gear.Thumbnail, &gear.OriginalVersion)
    if err != nil {
			panic(err.Error())
		}
		gears = append(gears, gear)
  }
  if len(gears) < 1{
    var gear Gear
    gears = append(gears, gear)
  }
  return gears
}


func GetGear(GearId int) (Gear){
  dbSession := sessionmanager.StartSession()
	defer dbSession.Close()
	var gear Gear
	err := dbSession.QueryRow("select * from gear where id=?;", GearId).Scan(&gear.Id,
                            &gear.Name, &gear.Description, &gear.Alignment,
                            &gear.Type, &gear.DateCreated, &gear.Stats, &gear.ShortDescription,
                            &gear.Artwork, &gear.Thumbnail,
													  &gear.OriginalVersion)
	if err != nil{
		fmt.Printf("Other Error")
	}
  return gear
}

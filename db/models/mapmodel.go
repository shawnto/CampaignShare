package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)


type Map struct {
	Id          int
	MapImage    string
	Description string
	DateCreated string
	FilterTags  string
	Title       string
	VotesUp     int
	VotesDown   int
	OriginalVersion bool
}


func AllMaps() ([]Map){
	dbSession := sessionmanager.StartSession()
	defer dbSession.Close()
	rows, err := dbSession.Query("select * from maps")
	if err != nil{
    fmt.Println("ERR parsing JSON!")
  }
	defer rows.Close()
	var maps []Map
	for rows.Next() {
		var m Map
		err := rows.Scan(&m.Id, &m.MapImage, &m.Description,
			&m.DateCreated, &m.FilterTags, &m.Title,
			&m.VotesUp, &m.VotesDown, &m.OriginalVersion)
		if err != nil {
			panic(err.Error())
		}
		maps = append(maps, m)
	}
	if err := rows.Err(); err != nil {
		panic(err.Error())
	}
	return maps
}

func GetMap(MapId int) (Map){
	dbSession := sessionmanager.StartSession()
	defer dbSession.Close()
	var m Map
	err := dbSession.QueryRow("select * from maps where id=?;", MapId).Scan(&m.Id, &m.MapImage, &m.Description,
		&m.DateCreated, &m.FilterTags, &m.Title,
		&m.VotesUp, &m.VotesDown, &m.OriginalVersion)
	if err != nil{
		fmt.Printf("Other Error")
	}
	return m
}


func GetMapsByFilterTags(q_string string) ([]Map){
	dbSession := sessionmanager.StartSession()
	defer dbSession.Close()
	rows, err := dbSession.Query("select * from maps where FilterTags regexp (?)",
		q_string)
	defer rows.Close()
	if err != nil {
		panic(err.Error())
	}
	var maps []Map
	for rows.Next() {
		var m Map
		err := rows.Scan(&m.Id, &m.MapImage, &m.Description,
			&m.DateCreated, &m.FilterTags, &m.Title,
			&m.VotesUp, &m.VotesDown, &m.OriginalVersion)
		if err != nil {
			panic(err.Error())
		}
		maps = append(maps, m)
	}
	if err := rows.Err(); err != nil {
		panic(err.Error())
	}
	if len(maps) == 0 {
		var m Map
		maps = append(maps, m)
	}
	return maps
}

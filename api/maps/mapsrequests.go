package mapsrequests

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db"
	"net/http"
	"strings"
)

import _ "github.com/go-sql-driver/mysql"

type req_body struct {
	numberOfEntries int
	previousIndex   int
}

type filterReqBody struct {
	NumberOfEntries int
	PreviousIndex   int
	FilterTags      string
}

type MapViewReqBody struct {
	MapId int
}

type ReqResponse struct {
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

func GetMaps(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r req_body
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	rows, err := dbSession.Query("select * from maps")
	defer rows.Close()
	var reqResps []ReqResponse
	for rows.Next() {
		var reqResp ReqResponse
		err := rows.Scan(&reqResp.Id, &reqResp.MapImage, &reqResp.Description,
			&reqResp.DateCreated, &reqResp.FilterTags, &reqResp.Title,
			&reqResp.VotesUp, &reqResp.VotesDown, &reqResp.OriginalVersion)
		if err != nil {
			panic(err.Error())
		}
		reqResps = append(reqResps, reqResp)
	}
	if err := rows.Err(); err != nil {
		panic(err.Error())
	}
	b, err := json.Marshal(reqResps)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetFilteredMaps(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r filterReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	q_string := sanitizeTags(r.FilterTags)
	rows, err := dbSession.Query("select * from maps where FilterTags regexp (?)",
		q_string)
	defer rows.Close()
	if err != nil {
		panic(err.Error())
	}
	var reqResps []ReqResponse
	for rows.Next() {
		var reqResp ReqResponse
		err := rows.Scan(&reqResp.Id, &reqResp.MapImage, &reqResp.Description,
			&reqResp.DateCreated, &reqResp.FilterTags, &reqResp.Title,
			&reqResp.VotesUp, &reqResp.VotesDown, &reqResp.OriginalVersion)
		if err != nil {
			panic(err.Error())
		}
		reqResps = append(reqResps, reqResp)
	}
	if err := rows.Err(); err != nil {
		panic(err.Error())
	}
	if len(reqResps) == 0 {
		var reqResp ReqResponse
		reqResps = append(reqResps, reqResp)
	}
	b, err := json.Marshal(reqResps)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetMapView(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r MapViewReqBody
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	dbSession, err := sql.Open("mysql", db.DbConnectionString)
	if err != nil {
		panic(err.Error())
	}
	defer dbSession.Close()
	var reqResp ReqResponse
	err = dbSession.QueryRow("select * from maps where id=?;", r.MapId).Scan(&reqResp.Id, &reqResp.MapImage, &reqResp.Description,
		&reqResp.DateCreated, &reqResp.FilterTags, &reqResp.Title,
		&reqResp.VotesUp, &reqResp.VotesDown, &reqResp.OriginalVersion)
	switch {
	case err == sql.ErrNoRows:
		fmt.Printf("None found")
	case err != nil:
		fmt.Printf("Other Error")
	}

	b, err := json.Marshal(reqResp)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func sanitizeTags(tags string) string {
	tagsSlice := strings.Split(tags, ",")
	for i, el := range tagsSlice {
		tagsSlice[i] = strings.TrimSpace(el)
	}
	if len(tagsSlice[len(tagsSlice)-1]) > 1 {
		return (strings.Join(tagsSlice, "|"))
	} else {
		return (strings.Join(tagsSlice[:len(tagsSlice)-1], "|"))
	}
}

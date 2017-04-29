package mapsrequests

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"github.com/CampaignShare/db/models/maps"
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


func GetMaps(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var r req_body
	err := decoder.Decode(&r)
	if err != nil {
		fmt.Println("Invalid JSON")
	}
	m := mapmodel.All()
	b, err := json.Marshal(m)
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
	q_string := sanitizeTags(r.FilterTags)
	maps := mapmodel.GetByFilterTags(q_string)
	b, err := json.Marshal(maps)
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
	m := mapmodel.GetMap(r.MapId)
	b, err := json.Marshal(m)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

// Need to movethis off to an appropriate package for other usage.
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

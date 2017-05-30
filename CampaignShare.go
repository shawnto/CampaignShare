package main

import (
	"fmt"
	"github.com/CampaignShare/api/maps"
	"github.com/CampaignShare/api/npcs"
	"github.com/CampaignShare/api/beastiary"
	"github.com/CampaignShare/api/gear"
	"github.com/CampaignShare/api/campaigns"
	"github.com/CampaignShare/api/campaigns/scenes"
	"io/ioutil"
	"net/http"
	"regexp"
	"strings"
)

type Page struct {
	Title string
	Body  []byte
}

func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	fmt.Printf("LOADING %s", filename)
	body, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{Title: title, Body: body}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
	http.ServeFile(w, r, "index.html")
}

var validPath = regexp.MustCompile("^(/|/(campaigns)/([a-zA-Z0-9]+)$)")

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := validPath.FindStringSubmatch(r.URL.Path)
		if m == nil {
			http.NotFound(w, r)
			return
		}
		fn(w, r, m[2])
	}
}

// TODO Break this off into a "handlers" folder, along with future handlers.
func apiHandler(rw http.ResponseWriter, req *http.Request) {
	switch {
	case strings.Contains(req.URL.Path, "get_maps"):
		mapsrequests.GetMaps(rw, req)
	case strings.Contains(req.URL.Path, "get_filtered_maps"):
		mapsrequests.GetFilteredMaps(rw, req)
	case strings.Contains(req.URL.Path, "get_npcs"):
		npcsrequests.GetNpcs(rw, req)
	case strings.Contains(req.URL.Path, "get_npc_view"):
		npcsrequests.GetNpcView(rw, req)
	case strings.Contains(req.URL.Path, "get_beast_view"):
		beastiaryrequests.GetBeastView(rw, req)
	case strings.Contains(req.URL.Path, "get_beasts"):
		beastiaryrequests.GetBeasts(rw, req)
	case strings.Contains(req.URL.Path, "get_gear"):
		gearrequests.GetGear(rw, req)
	case strings.Contains(req.URL.Path, "get_gear_view"):
		gearrequests.GetGearView(rw, req)
	case strings.Contains(req.URL.Path, "get_campaigns"):
		campaignsrequests.GetCampaigns(rw, req)
	case strings.Contains(req.URL.Path, "get_campaign_view"):
		campaignsrequests.GetCampaignView(rw, req)
	case strings.Contains(req.URL.Path, "get_scenes"):
		scenesrequests.GetScenes(rw, req)
	case strings.Contains(req.URL.Path, "get_scene_view"):
		scenesrequests.GetSceneView(rw, req)
	case strings.Contains(req.URL.Path, "get_campaign_instances"):
		campaignsrequests.GetCampaignInstances(rw, req)
	default:
		http.NotFound(rw, req)
		return
	}
}

// TODO about time to start breaking this out. Getting a bit too lengthy.
func main() {
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))
	http.HandleFunc("/campaigns/assets/get_maps/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_map_view/",
		mapsrequests.GetMapView)
	http.HandleFunc("/campaigns/assets/get_filtered_maps/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_npcs/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_npc_view/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_beast_view/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_beasts/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_gear/", apiHandler)
	http.HandleFunc("/campaigns/assets/get_gear_view/", apiHandler)
	http.HandleFunc("/campaigns/get_campaigns/", apiHandler)
	http.HandleFunc("/campaigns/get_campaign_view/", apiHandler)
	http.HandleFunc("/campaigns/scenes/get_scenes/", apiHandler)
	http.HandleFunc("/campaigns/scenes/get_scene_view/", apiHandler)
	http.HandleFunc("/campaigns/get_campaign_instances/", apiHandler)
	http.HandleFunc("/", makeHandler(viewHandler))
	http.ListenAndServe(":8080", nil)
}

package main

import (
	"github.com/CampaignShare/api/assetrequests"
	"github.com/CampaignShare/api/users"
	"net/http"
	"regexp"
	"strings"
	"github.com/gorilla/sessions"
)

// TODO secure cookie/encryption all that
var (
	key = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

type Page struct {
	Title string
	Body  []byte
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
		assetrequests.GetMaps(rw, req)
	case strings.Contains(req.URL.Path, "get_map_view"):
		assetrequests.GetMapView(rw, req)
	case strings.Contains(req.URL.Path, "get_filtered_maps"):
		assetrequests.GetFilteredMaps(rw, req)
	case strings.Contains(req.URL.Path, "get_npcs"):
		assetrequests.GetNpcs(rw, req)
	case strings.Contains(req.URL.Path, "get_npc_view"):
		assetrequests.GetNpcView(rw, req)
	case strings.Contains(req.URL.Path, "get_beast_view"):
		assetrequests.GetBeastView(rw, req)
	case strings.Contains(req.URL.Path, "get_beasts"):
		assetrequests.GetBeasts(rw, req)
	case strings.Contains(req.URL.Path, "get_gear"):
		assetrequests.GetGear(rw, req)
	case strings.Contains(req.URL.Path, "get_gear_view"):
		assetrequests.GetGearView(rw, req)
	case strings.Contains(req.URL.Path, "get_campaigns"):
		assetrequests.GetCampaigns(rw, req)
	case strings.Contains(req.URL.Path, "get_campaign_view"):
		assetrequests.GetCampaignView(rw, req)
	case strings.Contains(req.URL.Path, "get_scenes"):
		assetrequests.GetScenes(rw, req)
	case strings.Contains(req.URL.Path, "get_scene_view"):
		assetrequests.GetSceneView(rw, req)
	case strings.Contains(req.URL.Path, "get_campaign_instances"):
		assetrequests.GetCampaignInstances(rw, req)
	case strings.Contains(req.URL.Path, "get_campaign_players"):
		assetrequests.GetCampaignPlayers(rw, req)
	case strings.Contains(req.URL.Path, "create_new_user"):
		usersrequests.CreateNewUser(rw, req)
	case strings.Contains(req.URL.Path, "validate_password"):
		usersrequests.ValidateUserPassword(rw, req, store)
	case strings.Contains(req.URL.Path, "logout_user"):
		usersrequests.LogoutUser(rw, req, store)
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
	http.HandleFunc("/campaigns/assets/get_map_view/", apiHandler)
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
	http.HandleFunc("/campaigns/get_campaign_players/", apiHandler)
	http.HandleFunc("/users/create_new_user/", apiHandler)
	http.HandleFunc("/users/validate_password/", apiHandler)
	http.HandleFunc("/users/logout_user", apiHandler)
	http.HandleFunc("/", makeHandler(viewHandler))
	// TODO ClearHandler(See: gorilla/sessions docs)
	http.ListenAndServe(":8080", nil)
}

package scenesrequests

import (
  "fmt"
	"encoding/json"
  "net/http"
  "github.com/CampaignShare/db/models/scenes"
)

type SceneReqBody struct{
  NumberOfEntries int
  PreviousIndex int
}

type SceneViewReqBody struct{
  SceneId int
}

func GetScenes(rw http.ResponseWriter, req *http.Request){
  s := scenemodel.All()
  if len(s) < 1{
    var sceneDefault scenemodel.Scene
    s = append(s, sceneDefault)
  }
  b, err := json.Marshal(s)
	if err != nil {
		fmt.Println("Error parsing JSON")
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(b)
}

func GetSceneView(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
	var sceneReq SceneViewReqBody
	err := decoder.Decode(&sceneReq)
  if err != nil{
    fmt.Printf("ERR decoding json: %s", err.Error())
  }
  s := scenemodel.GetScene(sceneReq.SceneId)
  resp, err := json.Marshal(s)
  if err != nil{
    fmt.Printf("ERR encoding json: %s", err.Error())
  }
  rw.Header().Set("Content-Type", "application/json")
  rw.Write(resp)
}

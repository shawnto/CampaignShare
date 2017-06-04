package usersrequests

import (
	"encoding/json"
	"fmt"
	"github.com/CampaignShare/db/models/users"
	"net/http"
  "github.com/CampaignShare/client"
  "github.com/gorilla/sessions"
)


type UserReq struct{
  Username string
  Password string
}

type NewUserResponse struct{
  Success bool
  Status int
}

type ValidPassResponse struct{
  Success bool
  Status int

}


func CreateNewUser(rw http.ResponseWriter, req *http.Request){
  decoder := json.NewDecoder(req.Body)
  var newUser UserReq
  resp := NewUserResponse{true, 200}
  err := decoder.Decode(&newUser)
  if err != nil{
    resp.Status = 400
    resp.Success = false
    fmt.Println("ERR parsing JSON!")
  }
  hashedPass := clientsecurity.NewPass(newUser.Password)
  usermodel.NewUser(newUser.Username, hashedPass)
  r, err := json.Marshal(resp)
  if err != nil{
    fmt.Println("error marshalling")
  }
  rw.Header().Set("Content-Type", "application/json")
	rw.Write(r)
}


func ValidateUserPassword(rw http.ResponseWriter, req *http.Request, s *sessions.CookieStore){
  decoder := json.NewDecoder(req.Body)
  var validationReq UserReq
  resp := ValidPassResponse{false, 200}
  err := decoder.Decode(&validationReq)
  potentialUser := usermodel.GetUser(validationReq.Username)
  resp.Success = clientsecurity.ValidatePassword(validationReq.Password, potentialUser.Password)
  r, err := json.Marshal(resp)
  if err != nil{
    fmt.Println("error marshalling")
  }
  if resp.Success == true{
    session, _ := s.Get(req, "cookie-name")
    session.Values["authenticated"] = true
  	session.Save(req, rw)
  }
  rw.Header().Set("Content-Type", "application/json")
	rw.Write(r)
}


func LogoutUser(rw http.ResponseWriter, req *http.Request, s *sessions.CookieStore){
  session, _ := s.Get(req, "cookie-name")
  session.Values["authenticated"] = false
  session.Save(req, rw)

}

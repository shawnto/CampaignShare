package models

import (
	"fmt"
	"github.com/CampaignShare/db/managers"
)

type User struct{
  Id int
  Username string
  Password string
  JoinDate string
}

func GetUser(username string) (User){
  dbSession := sessionmanager.StartSession()
  defer dbSession.Close()
  var u User
  err := dbSession.QueryRow("select * from users where Username=?;", username).Scan(&u.Id,
													&u.Username, &u.Password, &u.JoinDate)
  if err != nil{
    fmt.Println("Error during query")
  }
  return u
}

func NewUser(userName string, password string){
  session := sessionmanager.StartSession()
  defer session.Close()
  insert, err := session.Prepare(`
  INSERT INTO campaignshare.users (Username, Password)
  VALUES (?, ?);`)
  if err != nil{
    fmt.Println("Error preparing statement.")
  }
  _, err = insert.Exec(userName, password)
  if err != nil{
    fmt.Println("ERROR at insert")
    fmt.Println(err.Error())
  }
  insert.Close()
}

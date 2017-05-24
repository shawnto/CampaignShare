package clientsecurity

import (
  "golang.org/x/crypto/bcrypt"
)

func NewPass(password string) (string){
  b := []byte(password)
  hash, err := bcrypt.GenerateFromPassword(b, bcrypt.DefaultCost)
  if err != nil {
    panic(err.Error())
  }
  return string(hash)
}

func ValidatePassword(userPassword string, hashedPass string)(bool){
  b := []byte(userPassword)
  err := bcrypt.CompareHashAndPassword([]byte(hashedPass), b)
  if err != nil{
    return false
  }
  return true
}

import React from 'react'
import { connect } from "react-redux"
import {attemptLogin} from '../actions/userManagementActions.js'

@connect((store) => {
  return {
    user: store.user,
    loggedIn: store.loggedIn,
    loading: store.loading
  }
})
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {username: '', password:''}
  }

  saveFields(event){
    if (event.target.id === 'usernameField'){
      this.setState({username: event.target.value})
    }
    else{
      this.setState({password: event.target.value})
    }
  }

  attemptLogin(event){
    const user = this.state.username
    const pw = this.state.password
    this.props.dispatch(attemptLogin(user, pw))
  }

  logOut(event){
    this.props.dispatch({type: "LOG_OUT",
                         payload: {
                           loggedIn: false,
                           user: ""
                         }})
  }

  render(){
    const loggedIn = this.props.user.loggedIn
    const user = this.props.user
    if (loggedIn === false){
    return(
      <div>
        <h1> Login </h1>
        <div id="loginContainer">
          <fieldset>
            <legend> Enter username </legend>
            <input id="usernameField"
              value={this.username}
              onChange = {(event) => this.saveFields(event)} />
            <legend> Enter Password </legend>
            <input id="passwordField"
               value={this.password}
               onChange = {(event) => this.saveFields(event)} />
          </fieldset>
        </div>
        <button type="button" onClick={(event) => this.attemptLogin(event)}>
          Login
        </button>
      </div>
      )
    }
    else{
      const user = this.props.user.user
      return (
          <div>
            <h1> You're already logged in, {user}! </h1>
            <button type="button" onClick={(event) => this.logOut(event)}>
            Switch Accounts
            </button>
          </div>
        )
    }
  }
}


export default Login

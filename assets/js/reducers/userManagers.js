const initState = {
  loggedIn: false,
  loading: false,
  user: ''
}

export default function reducer(state=initState, action){
  if(action.type === "LOG_OUT"){
    state = {...state, user: action.payload.user,
                       loggedIn: action.payload.loggedIn,}
  }
  else if (action.type === "LOGGED_IN") {
    state = {...state, loggedIn: action.payload}
  }
  else if(action.type === "USER_LOGIN"){
    state = {...state, loggedIn: action.payload.loggedIn,
                       user: action.payload.user,
                       loading: false}
  }
  else if(action.type === "VALIDATING_USER"){
    state = {...state, loggedIn: action.payload.loggedIn,
                       user: action.payload.user,
                       loading: action.payload.loading}
  }
  return state
}

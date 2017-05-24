// create actions here to for dispatch calls and export them
export function attemptLogin(username, password){
  const successfulLogin = {
    type: "USER_LOGIN",
    payload: {
      user: username,
      loading: false,
      loggedIn: true
    }
  }
  const failedLogin = {
    type: "USER_LOGIN",
    payload: {
      user: '',
      loading: false,
      loggedIn: false
    }
  }
  const body = JSON.stringify({Username: username, Password: password})
  return function(dispatch) {
    dispatch({type: "VALIDATING_USER", payload: {
                                        user:'',
                                        loading: true,
                                        loggedIn: false
    }})
    fetch('/users/validate_password/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: body
    }).then(response => response.json())
      .then(postResp => postResp.Success ? dispatch(successfulLogin) :
                                           dispatch(failedLogin))
  }
}

export function logoutUser(username){
  const loggingOut = {
    type: "LOG_OUT",
    payload: {
      user: username,
      loading: true,
      loggedIn: false,
    }
  }
  const loggedOut = {
    type: "LOG_OUT",
    payload: {
      user: '',
      loading: false,
      loggedIn: false
    }
  }
  return function(dispatch){
    dispatch(loggingOut)
    fetch('/users/logout_user', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify()
    }).then(response => response.json())
      .then(dispatch(loggedOut))
  }
}

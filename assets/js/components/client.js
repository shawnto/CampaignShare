

const initStae = {
  user:'',
  loggedIn = false,
  loading: false
}


//async base examples
/*
store.dispatch(dispatch) => {
  dispatch({type: "DOING_ASYNC"})
  fetch({}).then => {dispatch({})}
}
for promises...
store dispatch({
  type: "DOING_PROMISE",
  payload: promise_object
})
*/
/*
store.subscribe(() => {
  console.log('changed', store.getState())
})
*/

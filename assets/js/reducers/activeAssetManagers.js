const initState = {
  activeAsset: {},
  loading: false
}

export default function reducer(state=initState, action){
  if(action.type === "ACTIVE_ASSET"){
    state = {...state, activeAsset: action.payload.activeAsset,
                       loading: action.payload.loading}
  }
  return state
}

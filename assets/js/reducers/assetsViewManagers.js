const initState = {
  assets: [],
  searchTerm: '',
  loading: false,
}

export default function reducer(state=initState, action){
  if(action.type === "GET_ASSETS"){
    state = {...state, assets: action.payload.assets,
                       searchTerm: action.payload.searchTerm,
                       loading: action.payload.loading}
  }
  else if(action.type === "SEARCH_MAPS"){
    state = {...state, assets: action.payload.assets,
                       searchTerm: action.payload.searchTerm,
                       loading: action.payload.loading}
  }
  return state
}

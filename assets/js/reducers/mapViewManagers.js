const initState = {
  maps: [],
  searchTerm: '',
  loading: false,
}

export default function reducer(state=initState, action){
  if(action.type === "GET_MAPS"){
    state = {...state, maps: action.payload.maps,
                       searchTerm: action.payload.searchTerm,
                       loading: action.payload.loading}
  }
  else if(action.type === "SEARCH_MAPS"){
    state = {...state, maps: action.payload.maps,
                       searchTerm: action.payload.searchTerm,
                       loading: action.payload.loading}
  }
  return state
}

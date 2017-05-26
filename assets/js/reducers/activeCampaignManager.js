const initState = {
  activeCampaign: {},
  activeScene: 0,
  scenes: [],
  players: [],
  gm: '',
  loading: false,
}

export default function reducer(state=initState, action){
  if(action.type === "GET_CAMPAIGN"){
    state = {...state,
                       activeCampaign: action.payload.activeCampaign,
                       loading: action.payload.loading

            }
  }
  else if(action.type === "GET_SCENES"){
    state = {...state, scenes: action.payload.scenes,
                       loading: action.payload.loading}
  }
  return state
}

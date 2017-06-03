

const initState = {
  activeCampaign: {},
  activeScene: 0,
  campaignInstance: {},
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

  else if(action.type === "GET_CAMPAIGN_INSTANCE"){
    state = {...state,
                      campaignInstance: action.payload.campaignInstance}
  }

  else if(action.type === "GET_INSTANCE_PLAYERS"){
    state = {...state, players: action.payload.players}
  }

  return state
}

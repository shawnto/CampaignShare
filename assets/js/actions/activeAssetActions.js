export function getActiveMap(mapId){
  return function(dispatch){
    dispatch({type: "ACTIVE_ASSET",
              payload: {
                activeAsset: [],
                loading: true
              }})
    fetch('/campaigns/assets/get_map_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({MapId: mapId})
    }).then(response => response.json())
      .then(postResp => dispatch({type: "ACTIVE_ASSET",
                                  payload: {
                                    activeAsset: postResp,
                                    loading: false
                                    }
                                  }))
  }

}

export function getActiveNpc(npcId){
  return function(dispatch){
    dispatch({type: "ACTIVE_ASSET",
              payload: {
                activeAsset: [],
                loading: true
              }})
    fetch('/campaigns/assets/get_npc_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({NpcId: npcId})
    }).then(response => response.json())
      .then(postResp => dispatch({type: "ACTIVE_ASSET",
                                  payload: {
                                    activeAsset: postResp,
                                    loading: false
                                  }}))
  }
}

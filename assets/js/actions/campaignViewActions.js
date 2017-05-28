export function getCampaign(campaignId){
  const loadingCampaign = {
    type: "GET_CAMPAIGN",
    payload: {
      activeCampaign: {},
      loading: true
    }
  }
  return function(dispatch){
    dispatch(loadingCampaign)
    fetch('/campaigns/get_campaign_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({CampaignId: campaignId})
    }).then(response => response.json())
      .then(postResp => dispatch({type: "GET_CAMPAIGN",
                                  payload: {
                                    activeCampaign: postResp,
                                    loading: false
                                    }
                                  }))
  }
}

export function getScenes(numOfEntries, prevId){
  const loadingScenes = {
    type: "GET_SCENES",
    payload: {
      scenes: [],
      loading: true
    }
  }
  const body = {NumberOfEntries: numOfEntries, PreviousIndex: prevId}
  return function(dispatch){
    dispatch(loadingScenes)
    fetch('/campaigns/scenes/get_scenes/', {
      method: 'POST',
      headers: new Headers({
        'Context-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    }).then(response => response.json())
      .then(postResp => dispatch({type: "GET_SCENES",
                                  payload: {
                                    scenes: postResp,
                                    loading: false
                                    }
                                  }))
  }
}

// We can simply use the campiagn id for the campaign browser,
// since OriginalVersion should be 1, and one-to-one.

//TODO create an endpoint for the campaign browser: getOriginalInstance
// to get the original campiagn instance for the campaign browser.
export function getCampaignInstance(campaignId){
  return function(dispatch){
    fetch('/campaigns/get_campaign_instances/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({CampaignId: campaignId})
    }).then(response => response.json())
      .then(postResp => dispatch({type: "GET_CAMPAIGN_INSTANCE",
                                  payload: {
                                    campaignInstance: postResp[0],
                                    }
                                  }))
  }
}

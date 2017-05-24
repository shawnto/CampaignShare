export function getMaps(numberOfEntries, previousIndex){
  const body = JSON.stringify({NumberOfEntries: numberOfEntries,
                               PreviousIndex: previousIndex})
  return function(dispatch) {
    dispatch({type: "GET_MAPS", payload: {
                                        maps: [],
                                        currentTerm: '',
                                        loading: true
    }})
    fetch('/campaigns/assets/get_maps/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: body
    }).then(response => response.json())
      .then(postResp => dispatch({type: "GET_MAPS",
                                  payload: {
                                    maps: postResp,
                                    currentTerm: '',
                                    loading: false
                                  }
                                }))
  }
}

export function searchMaps(numberOfEntries, previousIndex, searchTerm){
  const body = JSON.stringify({NumberOfEntries: numberOfEntries,
                               PreviousIndex: previousIndex,
                               FilterTags: searchTerm})
  return function(dispatch){
    fetch('/campaigns/assets/get_filtered_maps/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: body
    }).then(response => response.json())
      .then(postResp => dispatch({type: "SEARCH_MAPS",
                                  payload: {
                                    maps: postResp,
                                    currentTerm: searchTerm,
                                    loading: false
                                  }
                                }))
  }
}

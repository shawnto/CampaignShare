import React from 'react'
import Style from 'style-it'
import MapList from './mapList.jsx'
import TagSearch from '../../globalComponents/tagSearch.jsx'
import '../../../css/campaignAssets/maps/mapsContainer.css'

class MapContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'maps': [],
                  'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_maps/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({numberOfEntries: this.state.numberOfEntries,
                            previousIndex: this.state.previousIndex})
    }).then(response => response.json())
      .then(postList => this.setState({ maps: postList }));
  }

  getFilteredList(event){
      const searchTerm = event.target.value
      this.setState({searchTerm: searchTerm})
      if (searchTerm.includes(",") === true){
        fetch('/campaigns/assets/get_filtered_maps/', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({NumberOfEntries: this.state.numberOfEntries,
                                PreviousIndex: this.state.previousIndex,
                                FilterTags: this.state.searchTerm
                                })
        }).then(response => response.json())
          .then(postList => this.setState({ maps: postList}))
      }
      else if (searchTerm.length === 0){
        fetch('/campaigns/assets/get_maps/', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({numberOfEntries: this.state.numberOfEntries,
                                previousIndex: this.state.previousIndex})
        }).then(response => response.json())
          .then(postList => this.setState({ maps: postList }));
      }
  }

  render(){
    const maps = this.state.maps
    const searchTerm = this.state.searchTerm
    return(
      <div>
      <h1> Maps </h1>
      <div id="mapListAndTagSearch">
      <MapList maps={maps} />
      <fieldset>
        <legend> Enter comma seperated tags to search by: </legend>
        <input
          value={searchTerm}
          onChange = {(event) => this.getFilteredList(event)} />
      </fieldset>
      </div>
      </div>
    )
  }
}

export default MapContainer

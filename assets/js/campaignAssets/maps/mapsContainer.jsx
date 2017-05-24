import React from 'react'
import Style from 'style-it'
import MapList from './mapList.jsx'
import TagSearch from '../../globalComponents/tagSearch.jsx'
import '../../../css/campaignAssets/maps/mapsContainer.css'
import { connect } from "react-redux"
import {getMaps, searchMaps} from '../../actions/mapViewActions.js'

@connect((store) => {
  return {
    maps: store.mapView.maps,
    searchTerm: store.mapView.searchTerm,
    loading: store.mapView.loading
  }
})
class MapContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'mapsA': [],
                  'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    const numOfEntries = this.state.numberOfEntries
    const prevInd = this.state.previousIndex
    this.props.dispatch(getMaps(numOfEntries, prevInd))
}

  getFilteredList(event){
      const numOfEntries = this.state.numberOfEntries
      const prevInd = this.state.previousIndex
      const searchTerm = event.target.value
      this.setState({searchTerm: searchTerm})
      if (searchTerm.includes(",") === true){
        this.props.dispatch(searchMaps(numOfEntries, prevInd, searchTerm))
      }
      else if (searchTerm.length === 0){
        this.props.dispatch(getMaps(numOfEntries, prevInd))
      }
  }

  render(){
    const maps = this.props.maps
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

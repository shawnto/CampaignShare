import React from 'react'
import NpcList from './npcList.jsx'
import '../../../css/campaignAssets/npcs/npcContainer.css'
import { connect } from "react-redux"
import {getNpcs} from '../../actions/assetsViewActions.js'



// TODO: Implement a reusable tag search component,
// this feature will be used a lot...
@connect((store) => {
  return {
    assets: store.assetsView.assets,
    searchTerm: store.assetsView.searchTerm,
    loading: store.assetsView.loading
  }
})
class NpcsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      'numberOfEntries': 10,
      'previousIndex': 0,
      'searchTerm': ''
    }
  }

  componentDidMount(){
    const numOfEntries = this.state.numberOfEntries
    const prevInd = this.state.prevInd
    this.props.dispatch(getNpcs(numOfEntries, prevInd))
  }

  render(){
    const npcs = this.props.assets
    return(
      <div id="npcsContainer">
      <NpcList npcs={npcs} />
      </div>
    )
  }

}

export default NpcsContainer

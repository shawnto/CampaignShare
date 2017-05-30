import React from 'react'
import TypeList from '../typeList.jsx'
import md from '../../markdown/markdownParse.js'
import {connect} from 'react-redux'
import {getActiveGear} from '../../actions/activeAssetActions'

@connect((store) => {
  return {
    activeAsset: store.activeAsset,
    loading: store.loading,
  }
})
class ViewGear extends React.Component{

// TODO getting a list back here for some reason, need to investigate further.
  componentDidMount(){
    const gearId = parseInt(this.props['match'].params.gearId)
    this.props.dispatch(getActiveGear(gearId))
  }

  render(){
    const activeGear = this.props.activeAsset.activeAsset
    return(
      <div id="activeGearContainer">
      <div id="nameAndImage">
      <h1> {activeGear.Name} </h1>
      <img src={activeGear.Artwork} alt="Image not found" />
      </div>
      <div id="npcDescription">
      <div id="listRow">
      <TypeList typeStr={activeGear.Type} />
      <ul> <lh> Alignment </lh> <li> {activeGear.Alignment} </li> </ul>
      </div>
      <p id="npcDesc" dangerouslySetInnerHTML={{__html: md(activeGear.Description)}} />
      </div>
      </div>
    )
  }
}

export default ViewGear

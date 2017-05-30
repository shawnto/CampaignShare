import React from 'react'
import md from '../../markdown/markdownParse.js'
import TypeList from '../typeList.jsx'
import '../../../css/campaignAssets/npcs/viewNpc.css'
import { connect } from "react-redux"
import {getActiveNpc} from '../../actions/activeAssetActions.js'


@connect((store) => {
  return {
    activeAsset: store.activeAsset,
    loading: store.loading,
  }
})
class ViewNpc extends React.Component{

  componentDidMount(){
    const npcId = parseInt(this.props['match'].params.npcId)
    this.props.dispatch(getActiveNpc(npcId))
  }

  render(){
    const activeNpc = this.props.activeAsset.activeAsset
    return(
      <div id="activeNpcContainer">
      <div id="nameAndImage">
      <h1> {activeNpc.Name} </h1>
      <img src={activeNpc.Artwork} />
      </div>
      <div id="npcDescription">
      <div id="listRow">
      <TypeList typeStr={activeNpc.Type} />
      <ul> <lh> Alignment </lh> <li> {activeNpc.Alignment} </li> </ul>
      </div>
      <p id="npcDesc" dangerouslySetInnerHTML={{__html: md(activeNpc.Description)}} />
      </div>
      </div>
    )
  }
}

export default ViewNpc

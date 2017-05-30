import React from 'react'
import TypeList from '../typeList.jsx'
import md from '../../markdown/markdownParse.js'
import {connect} from 'react-redux'
import {getActiveBeast} from '../../actions/activeAssetActions'

@connect((store) => {
  return {
    activeAsset: store.activeAsset,
    loading: store.loading,
  }
})
class ViewBeast extends React.Component{
  componentDidMount(){
    const beastId = parseInt(this.props['match'].params.beastId)
    this.props.dispatch(getActiveBeast(beastId))
  }

  render(){
    const activeBeast = this.props.activeAsset.activeAsset
    return(
      <div id="activeBeastContainer">
      <div id="nameAndImage">
      <h1> {activeBeast.Name} </h1>
      <img src={activeBeast.Artwork} />
      </div>
      <div id="npcDescription">
      <div id="listRow">
      <TypeList typeStr={activeBeast.Type} />
      <ul> <lh> Alignment </lh> <li> {activeBeast.Alignment} </li> </ul>
      </div>
      <p id="npcDesc" dangerouslySetInnerHTML={{__html: md(activeBeast.Description)}} />
      </div>
      </div>
    )
  }
}

export default ViewBeast

import React from 'react';
import ActiveScene from './activeScene.jsx'
import SceneSelector from './scenes/sceneSelector.jsx'
import AssetsBrowser from './assetsBrowser.jsx'
import Players from './players.jsx'
import '../../css/campaigns/campaignView.css'
import {connect} from 'react-redux'
import {getCampaign, getScenes, getCampaignInstance,
        getInstancePlayers} from '../actions/campaignViewActions.js'


@connect((store) => {
  return {
    activeCampaign: store.activeCampaign,
    activeScene: store.activeScene,
    campaignInstance: store.campaignInstance,
    scenes: store.scenes,
    players: store.players,
    gm: store.gm,
    loading: store.loading,
  }
})
class ActiveCampaign extends React.Component{
  constructor(props){
    super(props)
    this.state = {activeMap: 0}
  }
  componentDidMount(){
    var activeCampaign = {}
    var scenes = []
    const campaignId = parseInt(this.props['match'].params.campaignId)
    // TODO consider making an api call for this info in bulk.
    // Not a fan of battering the server over and over
    this.props.dispatch(getCampaign(campaignId))
    this.props.dispatch(getScenes(5, 0))
    this.props.dispatch(getCampaignInstance(campaignId))
    this.props.dispatch(getInstancePlayers(campaignId))
  }

  render() {
    const scenes = this.props.activeCampaign.scenes
    const campaignInstance = this.props.activeCampaign.campaignInstance
    var assets = campaignInstance.Assets
    const normalizedAssets = normalizeAssets(assets)
    const players = this.props.activeCampaign.players
    const activeMap = this.state.activeMap
    // Care: maps may not be defined initially, so we pass assets to
    // allow a check.
    return(
      <div id="campaignContainer">
        <div id="activeCampaignView">
        <SceneSelector scenes={scenes} activeScene={0} />
        <ActiveScene activeScene={scenes[0]}/>
        </div>
        <div id="maps">
        <CampaignMaps assets={assets} activeMap={activeMap} />
        </div>
        <div id="assets">
        <AssetsBrowser assets={normalizedAssets}/>
        </div>
        <div id="players">
        <Players players={players}/>
        </div>
      </div>
    )
  }
}

function CampaignMaps(props){
  if(typeof props.assets != "undefined"){
    return(<div> Maps </div>)
  }
  else{
    return(<div></div>)
  }
}

// Create a unique tableId for each asset to enable.
function normalizeAssets(assets){
  var index = 0
  for (var assetGroup in assets){
    for (var asset in assets[assetGroup]){
      assets[assetGroup][asset].TableId = index.toString()
      index++
    }
  }
  return assets
}

export default ActiveCampaign

import React from 'react';
import ActiveScene from './activeScene.jsx'
import SceneSelector from './scenes/sceneSelector.jsx'
import AssetsBrowser from './assetsBrowser.jsx'
import Players from './players.jsx'
import '../../css/campaigns/campaignView.css'
import {connect} from 'react-redux'
import {getCampaign, getScenes, getCampaignInstance} from '../actions/campaignViewActions.js'


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
  componentDidMount(){
    var activeCampaign = {}
    var scenes = []
    const campaignId = parseInt(this.props['match'].params.campaignId)
    // TODO consider making an api call for this info in bulk.
    // Not a fan of battering the server over and over
    this.props.dispatch(getCampaign(campaignId))
    this.props.dispatch(getScenes(5, 0))
    this.props.dispatch(getCampaignInstance(campaignId))
  }

  render() {
    const scenes = this.props.activeCampaign.scenes
    const campaignInstance = this.props.activeCampaign.campaignInstance
    const assets = campaignInstance.Assets
    const players = campaignInstance.Players
    return(
      <div id="campaignContainer">
        <div id="activeCampaignView">
        <SceneSelector scenes={scenes} activeScene={0} />
        <ActiveScene activeScene={scenes[0]}/>
        </div>
        <div id="assets">
        <AssetsBrowser assets={assets}/>
        </div>
        <div id="players">
        <Players players={players}/>
        </div>
      </div>
    )
  }
}

export default ActiveCampaign

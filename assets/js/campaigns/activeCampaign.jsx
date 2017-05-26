import React from 'react';
import ActiveScene from './activeScene.jsx'
import SceneSelector from './scenes/sceneSelector.jsx'
import AssetsBrowser from './assetsBrowser.jsx'
import Players from './players.jsx'
import '../../css/campaigns/campaignView.css'
import {connect} from 'react-redux'
import {getCampaign, getScenes} from '../actions/campaignViewActions.js'


@connect((store) => {
  return {
    activeCampaign: store.activeCampaign,
    activeScene: store.activeScene,
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
    this.props.dispatch(getCampaign(campaignId))
    this.props.dispatch(getScenes(5, 0))
  }

  render() {
    const scenes = this.props.activeCampaign.scenes
    return(
      <div id="campaignContainer">
        <div id="activeCampaignView">
        <SceneSelector scenes={scenes} activeScene={0} />
        <ActiveScene activeScene={scenes[0]}/>
        </div>
        <div id="assets">
        <AssetsBrowser />
        </div>
        <div id="players">
        <Players />
        </div>
      </div>
    )
  }
}

export default ActiveCampaign

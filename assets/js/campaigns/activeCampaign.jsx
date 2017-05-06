import React from 'react';
import ActiveScene from './activeScene.jsx'
import SceneSelector from './scenes/sceneSelector.jsx'
import AssetsBrowser from './assetsBrowser.jsx'
import Players from './players.jsx'
import '../../css/campaigns/campaignView.css'

class ActiveCampaign extends React.Component{
  constructor(props){
  super(props)
  this.state = {
    activeScene: 0,
    scenes: [],
    players: [],
    gm: '',
    activeCampaign: {},
    }
  }

  componentDidMount(){
    var activeCampaign = {}
    var scenes = []
    fetch('/campaigns/get_campaign_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({CampaignId: parseInt(this.props['match'].params.campaignId)})
    }).then(response => response.json())
      .then(postResp => this.setState({ activeCampaign: postResp }))
    fetch('/campaigns/scenes/get_scenes/', {
      method: 'POST',
      headers: new Headers({
        'Context-Type': 'application/json'
      }),
      body: JSON.stringify({NumberOfEntries: 5, PreviousIndex: 0})
    }).then(response => response.json())
      .then(postResp => this.setState({scenes: postResp}))
  }

  render() {
    const scenes = this.state.scenes
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

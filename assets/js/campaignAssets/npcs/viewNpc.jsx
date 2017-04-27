import React from 'react'
import md from '../../markdown/markdownParse.js'
import TypeList from '../typeList.jsx'
import '../../../css/campaignAssets/npcs/viewNpc.css'


class ViewNpc extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activeNpc: []
    }
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_npc_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({NpcId: parseInt(this.props['match'].params.npcId)})
    }).then(response => response.json())
      .then(postResp => this.setState({ activeNpc: postResp }))
  }

  render(){
    const activeNpc = this.state.activeNpc
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

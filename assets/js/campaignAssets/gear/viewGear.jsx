import React from 'react'
import TypeList from '../typeList.jsx'
import md from '../../markdown/markdownParse.js'

class ViewGear extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeGear: {}
    }
  }

// TODO getting a list back here for some reason, need to investigate further.
  componentDidMount(){
    fetch('/campaigns/assets/get_gear_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({GearId: parseInt(this.props['match'].params.gearId)})
    }).then(response => response.json())
      .then(postResp => this.setState({ activeGear: postResp[0] }))
  }

  render(){
    const activeGear = this.state.activeGear
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

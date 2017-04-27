import React from 'react'
import TypeList from '../typeList.jsx'
import md from '../../markdown/markdownParse.js'

class ViewBeast extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeBeast: {}
    }
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_beast_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({BeastId: parseInt(this.props['match'].params.beastId)})
    }).then(response => response.json())
      .then(postResp => this.setState({ activeBeast: postResp }))
  }

  render(){
    const activeBeast = this.state.activeBeast
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

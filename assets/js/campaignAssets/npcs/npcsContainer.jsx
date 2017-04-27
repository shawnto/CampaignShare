import React from 'react'
import NpcList from './npcList.jsx'
import '../../../css/campaignAssets/npcs/npcContainer.css'

// TODO: Implement a reusable tag search component,
// this feature will be used a lot...
class NpcsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      'npcs': [],
      'numberOfEntries': 10,
      'previousIndex': 0,
      'searchTerm': ''
    }
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_npcs/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({NumberOfEntries: this.state.numberOfEntries,
                            PreviousIndex: this.state.previousIndex})
    }).then(response => response.json())
      .then(postList => this.setState({ npcs: postList }));
  }

  render(){
    const npcs = this.state.npcs
    return(
      <div id="npcsContainer">
      <NpcList npcs={npcs} />

      </div>
    )
  }

}

export default NpcsContainer

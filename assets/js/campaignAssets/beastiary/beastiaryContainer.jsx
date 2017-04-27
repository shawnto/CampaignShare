import React from 'react'
import BeastList from './beastiaryList.jsx'
import '../../../css/campaignAssets/maps/mapsContainer.css'

class BeastiaryContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'beasts': [],
                  'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_beasts/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({numberOfEntries: this.state.numberOfEntries,
                            previousIndex: this.state.previousIndex})
    }).then(response => response.json())
      .then(postList => this.setState({ beasts: postList }));
  }

  render(){
    const beasts = this.state.beasts
    return(
      <div>
      <div id="beastList">
      <BeastList beasts={this.state.beasts} />
      </div>
      </div>
    )
  }
}


export default BeastiaryContainer

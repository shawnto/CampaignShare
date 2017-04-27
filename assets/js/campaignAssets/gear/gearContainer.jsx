import React from 'react'
import GearList from './gearList.jsx'
import '../../../css/campaignAssets/gear/gearContainer.css'

class GearContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'gear': [],
                  'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_gear/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({NumberOfEntries: this.state.numberOfEntries,
                            PreviousIndex: this.state.previousIndex})
    }).then(response => response.json())
      .then(postList => this.setState({ gear: postList }));
  }

  render(){
    const gear = this.state.gear
    return(
      <div id="gearContainer">
      <div id="gearList">
      <GearList gear={gear} />
      </div>
      </div>
    )
  }
}


export default GearContainer

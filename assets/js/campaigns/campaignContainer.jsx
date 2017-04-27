import React from 'react'
import CampaignList from './campaignList.jsx'

class CampaignContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'campaigns': [],
                  'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    fetch('/campaigns/get_campaigns/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({NumberOfEntries: this.state.numberOfEntries,
                            PreviousIndex: this.state.previousIndex})
    }).then(response => response.json())
      .then(postList => this.setState({ campaigns: postList }));
  }

  render(){
    const campaigns = this.state.campaigns
    return(
      <div id="campaignContainer">
      <div id="campaignList">
      <CampaignList campaigns={campaigns} />
      </div>
      </div>
    )
  }
}


export default CampaignContainer

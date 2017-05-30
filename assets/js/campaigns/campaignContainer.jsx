import React from 'react'
import CampaignList from './campaignList.jsx'
import {connect} from 'react-redux'
import {getCampaigns} from '../actions/assetsViewActions.js'


@connect((store) => {
  return {
    assets: store.assetsView.assets,
    searchTerm: store.assetsView.searchTerm,
    loading: store.assetsView.loading
  }
})
class CampaignContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'campaigns': [],
                  'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    const n = this.state.numberOfEntries
    const p = this.state.previousIndex
    this.props.dispatch(getCampaigns(n, p))

  }

  render(){
    const campaigns = this.props.assets
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

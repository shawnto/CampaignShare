import React from 'react'
import BeastList from './beastiaryList.jsx'
import '../../../css/campaignAssets/maps/mapsContainer.css'
import {connect} from 'react-redux'
import {getBeasts} from '../../actions/assetsViewActions.js'


@connect((store) => {
  return {
    assets: store.assetsView.assets,
    searchTerm: store.assetsView.searchTerm,
    loading: store.assetsView.loading
  }
})
class BeastiaryContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    const n = this.state.numberOfEntries
    const p = this.state.previousIndex
    this.props.dispatch(getBeasts(n, p))
  }

  render(){
    const beasts = this.props.assets
    return(
      <div>
      <div id="beastList">
      <BeastList beasts={beasts} />
      </div>
      </div>
    )
  }
}


export default BeastiaryContainer

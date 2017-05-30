import React from 'react'
import GearList from './gearList.jsx'
import '../../../css/campaignAssets/gear/gearContainer.css'
import {connect} from 'react-redux'
import {getGear} from '../../actions/assetsViewActions.js'


@connect((store) => {
  return {
    assets: store.assetsView.assets,
    searchTerm: store.assetsView.searchTerm,
    loading: store.assetsView.loading
  }
})
class GearContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {'numberOfEntries': 10,
                  'previousIndex': 0,
                  'searchTerm': ''}
  }

  componentDidMount(){
    const n = this.state.numberOfEntries
    const p = this.state.previousIndex
    this.props.dispatch(getGear(n, p))
  }

  render(){
    const gear = this.props.assets
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

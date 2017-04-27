import React from 'react'
import ListView from './sceneListView.jsx'
import InteractiveView from './sceneInteractiveView.jsx'

class SceneSelector extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currentViewType: 0,
    }
  }

  handleToggleClick(event){
    const viewType = this.state.currentViewType ? 0 : 1
    this.setState({currentViewType: viewType})
  }

  componentDidMount(){

  }

  render(){
    const viewType = this.state.currentViewType
    if (viewType == 0){
      return(
        <div>
        <button type="button" onClick={event => this.handleToggleClick(event)}>
        Toggle View Type </button>
        <div id="interactiveView"> <InteractiveView /> </div>
        </div>
      )
    }
    else{
      return(
        <div>
        <button type="button" onClick={event => this.handleToggleClick(event)}>
        Toggle View Type </button>
        <div id="listView"> <ListView /> </div>
        </div>
      )
    }
  }
}

export default SceneSelector

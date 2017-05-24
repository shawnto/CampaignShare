import React from 'react'
import '../../css/campaigns/scenes/activeSceneView.css'
/*
A "Scene" in Campaign share is a particular instance in which the GM's party is
currently engaged. Our activeScene container displays an overview of information
that a GM might need for the current instance.
*/

class ActiveScene extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const scene = this.props.activeScene
    if (typeof scene === "undefined"){
        return(
            <div> Loading Scene </div>
        )
    }
    else{
      return(
        <div id="activeScene">
          <div>
          <span> {scene.ExpectedOrder}: {scene.Title} </span>
          <p> {scene.Summary} </p>
          </div>
        </div>
      )
    }
  }
}

export default ActiveScene

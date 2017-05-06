import React from 'react'
import '../../../css/campaigns/scenes/sceneView.css'
import Style from 'style-it'
import Draggable from 'react-draggable'

class SceneInteractiveView extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  mapScenes(){
    const scenes = this.props.scenes
    if ("undefined" === typeof scenes){
      return null
    }
    const mappedScenes = scenes.map((s) =>
      <div id="sceneThumb" key={s.Id}>
        <span> {s.ExpectedOrder}: {s.Title} </span>
      </div>
    );
    return mappedScenes
  }

  render(){
    return (
      <div id='sceneInteractiveView'>
          <h1> Scene Interactive View </h1>
          <div id='sceneThumbs'>
          {this.mapScenes()}
          </div>
      </div>

    )
  }
}


export default SceneInteractiveView

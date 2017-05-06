import React from 'react'


class SceneListView extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div> {this.props.scenes[0].Id} </div>
    )
  }
}


export default SceneListView

import React from 'react'
//import '../../../css/campaignAssets/maps/activeMap.css'
import ToggleGrid from '../../globalComponents/toggleGrid.jsx'
import Style from 'style-it'


class ViewMap extends React.Component{
  constructor(props){
    super(props);
    this.state = {'activeMap': {},
                   context: null,
                   gridSize: {
                     height: 800,
                     width: 800
                   },
                   gridSizeConst: 10,
                   showGrid: true,
                   scale: 1.0,
    }
  }

  componentDidMount(){
    fetch('/campaigns/assets/get_map_view/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({MapId: parseInt(this.props['match'].params.mapId)})
    }).then(response => response.json())
      .then(postResp => this.setState({ activeMap: postResp }))

    const context = this.refs.canvas.getContext('2d')
    this.setState({context: context})
  }

  drawGrid(){
    const width = this.state.gridSize.width
    const height = this.state.gridSize.height
    const gridConstant = this.state.gridSizeConst
    const context = this.state.context
    const gridIsActive = this.state.toggleGrid
    // Draw the horizontal lines
    context.clearRect(0, 0, width, height)
    context.beginPath()
    for(var i = 0; i < height; i += (height/gridConstant)){
      context.moveTo(0,i)
      context.lineTo(width, i)
      context.stroke()
    }
    context.restore()
    for(i = 0; i <= width; i += (width/gridConstant)){
      context.moveTo(i,0)
      context.lineTo(i, height)
      context.stroke()
    }
    this.setState({context: context})
  }

  updateGridConst(event){
    this.setState({gridSizeConst: event.target.value})
    this.drawGrid()
  }

  handleGridToggle(event){
    this.setState({showGrid: !this.state.showGrid})
    if (this.state.showGrid === true){
      this.drawGrid()
    }
    else{
      const context = this.state.context
      const width = this.state.gridSize.width
      const height = this.state.gridSize.height
      context.clearRect(0,0, width, height)
    }
  }

  updateScaleConst(event){
    this.setState({scale: event.target.value})
  }
  //TODO: implement LEFT and TOP positioning for map on mouse drag.
  //TODO: Fix some images causing grid offset.
  render(){

    const activeMap = this.state.activeMap
    const mapUrl = this.state.activeMap.MapImage
    // Zoom functionality handled here via variable in style-it.
    // Update this if a better alternative presents itself.
    return Style.it(
      `
      #mapListAndTagSearch{
        display: flex;
        flex-direction: row;
      }

      #mapList{
        flex-grow: .5;
        background: #f4f4f4;
      }

      #mapImageContainer {
        width: 800px;
        height: 800px;
        overflow: scroll;
        position: relative;
      }

      #mapImage {
        position: relative;
        z-index: 0;
        transform: scale(${ this.state.scale });
        overflow: inherit;
      }

      #mapGridCanvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;

      }

      #siteMenu{
        z-index: 50;
      }
      `,
      <div id="mapBrowserToggleGrid">
      <div id="activeMapContainer">
      <h1> Active Map </h1>
      <div id="mapImageContainer">
      <img id="mapImage" src={mapUrl} alt='Map Image'/>
      <canvas ref="canvas" id="mapGridCanvas"
        width={this.state.gridSize.width}
        height={this.state.gridSize.height}
      />
      </div>

      <TagList tagStr={activeMap.FilterTags} />
      <div>
      <span> Adjust Grid Size </span>
      <input type="range" min="5" max="99" value={this.state.gridSizeConst} step="5"
      onChange={(event) => this.updateGridConst(event)} />
      <button type="button" onClick={(event) => this.handleGridToggle(event)}>
        Toggle Grid </button>
      <span> Adjust Map Zoom </span>
      <input type="range" min=".5" max="2.0" value={this.state.scale} step=".075"
      onChange={(event) => this.updateScaleConst(event)} />
      </div>
      <p> {activeMap.Description} </p>
      </div>
      </div>
    )
  }
}

export default ViewMap

function TagList(props){
  const tagStr = props.tagStr ? props.tagStr : false
  if (tagStr === false){
    return (<ul><li> Loading Tags... </li></ul>)
  }
  else{
    const tags = tagStr.split(", ")
    const tagList = tags.map((tag) =>
      <li id='tag' key={tag}> {tag} </li>)
    return (
      <ul> <lh> Tags </lh> {tagList} </ul>
    )
}
}

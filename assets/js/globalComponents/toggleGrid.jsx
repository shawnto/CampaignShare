import React from 'react'


class ToggleGrid extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      context: null,
      gridSize: {
        height: 150,
        width: 150
      },
    }
  }

  componentDidMount(){
    const context = this.refs.canvas.getContext('2d')
    this.drawGrid(context)
  }

  drawGrid(context){
    const width = this.state.gridSize.width
    const height = this.state.gridSize.height
    // Draw the horizontal lines
    var heightInc = height/10
    for(var i = 0; i < height; i += heightInc){
      context.moveTo(0,i)
      context.lineTo(width, i)
      context.stroke()
    }
    for(i = 0; i <= width; i += (width/10)){
      context.moveTo(i,0)
      context.lineTo(i, height)
      context.stroke()
    }
    this.setState({context: context})
  }


  updateGrid(){
    const context = this.state.context
    context.save()
    context.scale(this.state.gridSize.height, this.state.gridSize.width)
  }

  render(){
    return(
      <div>
      <canvas ref="canvas"
        width={this.state.gridSize.width}
        height={this.state.gridSize.height}
        />
      </div>
    );
  }
}


export default ToggleGrid

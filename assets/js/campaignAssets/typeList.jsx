import React from 'react'

function TypeList(props){
  const typeStr = props.typeStr ? props.typeStr : false
  if (typeStr === false){
    return (<ul><li> Loading Tags... </li></ul>)
  }
  else{
    const types = typeStr.split(", ")
    const typeList = types.map((type) =>
      <li id='types' key={type}> {type} </li>)
    return (
      <ul> <lh> Types: </lh> {typeList} </ul>
    )
  }
}

export default TypeList

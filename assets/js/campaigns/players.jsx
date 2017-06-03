import React from 'react'


function Players(props){
    const playerThumbs = props.players.map((p) =>
      <span key={p.Id}>
        {p.CharacterName}
      </span>)
    return(
      <div id='playerThumbs'> {playerThumbs} </div>
    )
  }

export default Players

import React from 'react'
import {Link} from 'react-router-dom';
import Style from 'style-it'

function NpcList(props){
  const npcs = props.npcs
  const npcList = npcs.map((n) =>
    <li id='npc' key={n.Id.toString()}>
      <img src={n.Thumbnail} alt="Thumbnail not found" />
      <h1><Link to={ {pathname: getMapUrl(n.Id),
                  params: {npcId: n.Id}}}
      > {n.Name} </Link></h1>
      <h3> Alignment: {n.Alignment} </h3>
      <p> {n.ShortDescription} </p>
    </li>
  );
    return(
      <div id='npcList'>
      <ul> {npcList} </ul>
      </div>)
}

export default NpcList

function getMapUrl(Id){
  const mapUrl = '/campaignAssets/npcs/' + Id.toString();
  return mapUrl
}

import React from 'react'
import {Link} from 'react-router-dom';

function BeastList(props){
  const beasts = props.beasts
  const beastList = beasts.map((b) =>
    <li id='npc' key={b.Id.toString()}>
      <img src={b.Thumbnail} alt="Thumbnail not found" />
      <h1><Link to={ {pathname: getMapUrl(b.Id),
                  params: {beastId: b.Id}}}
      > {b.Name} </Link></h1>
      <h3> Alignment: {b.Alignment} </h3>
      <p> {b.ShortDescription} </p>
    </li>
  );
    return(
      <div id='beastList'>
      <ul> {beastList} </ul>
      </div>)
}

export default BeastList

function getMapUrl(Id){
  const mapUrl = '/campaignAssets/beastiary/' + Id.toString();
  return mapUrl
}

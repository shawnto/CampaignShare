import React from 'react'
import {Link} from 'react-router-dom';
import Style from 'style-it'

function GearList(props){
  const gear = props.gear
  const gearList = gear.map((g) =>
    <li id='gear' key={g.Id.toString()}>
      <img src={g.Thumbnail} alt="Thumbnail not found" />
      <h1><Link to={ {pathname: getGearUrl(g.Id),
                  params: {npcId: g.Id}}}
      > {g.Name} </Link></h1>
      <h3> Alignment: {g.Alignment} </h3>
      <p> {g.ShortDescription} </p>
    </li>
  );
    return(
      <div id='gearList'>
      <ul> {gearList} </ul>
      </div>)
}

export default GearList

function getGearUrl(Id){
  const gearUrl = '/campaignAssets/gear/' + Id.toString();
  return gearUrl
}

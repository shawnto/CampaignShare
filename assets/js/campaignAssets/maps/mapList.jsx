import React from 'react'
import {Link} from 'react-router-dom';
import Style from 'style-it'

function Maps(props){
  const maps = props.maps
  const mapList = maps.map((m) =>
    <li id='map' key={m.Id.toString()}>
      <h1><Link to={ {pathname: getMapUrl(m.Id),
                  params: {postId: m.Id}}}
      > {m.Title} </Link></h1>
      <p> {m.FilterTags} </p>
    </li>
  );
    return(
      <div id='mapList'>
      <ul> {mapList} </ul>
      </div>)
}

export default Maps

function getMapUrl(Id){
  const mapUrl = '/campaignAssets/maps/' + Id.toString();
  return mapUrl
}

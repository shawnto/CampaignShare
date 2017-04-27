import React from 'react'
import {Link} from 'react-router-dom';
import Style from 'style-it'

function CampaignList(props){
  const campaigns = props.campaigns
  const campaignList = campaigns.map((c) =>
    <li id='campaign' key={c.Id.toString()}>
    <Link to={ {pathname: getCampaignUrl(c.Id),
                params: {campaignId: c.Id}}}>
      <img src={c.Thumbnail} alt="Thumbnail not found" />
      <h1>

          {c.Name}

      </h1>
      <h3> {c.Title} </h3>
      <p> {c.Summary} </p>
    </Link>
    </li>
  );
    return(
      <div id='campaignList'>
      <ul> {campaignList} </ul>
      </div>)
}

export default CampaignList

function getCampaignUrl(Id){
  const campaignUrl = '/campaigns/' + Id.toString();
  return campaignUrl
}

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Link} from 'react-router-dom'
import {Route} from 'react-router'
import SiteMenu from './siteMenu/index.jsx'
import HomePage from './homePage/index.jsx'
import Campaigns from './campaigns/campaignContainer.jsx'
import ViewCampaign from './campaigns/activeCampaign.jsx'
import Forums from './forums/index.jsx'
import MapContainer from './campaignAssets/maps/mapsContainer.jsx'
import NpcsContainer from './campaignAssets/npcs/npcsContainer.jsx'
import ViewNpc from './campaignAssets/npcs/viewNpc.jsx'
import ViewMap from './campaignAssets/maps/viewMap.jsx'
import BeastiaryContainer from './campaignAssets/beastiary/beastiaryContainer.jsx'
import ViewBeast from './campaignAssets/beastiary/ViewBeast.jsx'
import MusicContainer from './campaignAssets/music/musicContainer.jsx'
import GearContainer from './campaignAssets/gear/gearContainer.jsx'
import OtherContainer from './campaignAssets/other/otherContainer.jsx'
import ViewGear from './campaignAssets/gear/viewGear.jsx'
import Login from './login/login.jsx'

class App extends React.Component{
    constructor(props) {
      super(props);
      this.state = {searchTerm: props.searchTerm,
                    history: props.history};
    }
    render(){
      return (
        <div>
        <BrowserRouter>
        <div>
        <Route path='/' component={SiteMenu} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/campaignAssets/maps/:mapId' component={ViewMap}/>
          <Route exact path='/campaignAssets/maps' component={MapContainer} />
          <Route exact path='/campaignAssets/music' component={MusicContainer} />
          <Route exact path='/campaignAssets/npcs/:npcId' component={ViewNpc} />
          <Route exact path='/campaignAssets/npcs' component={NpcsContainer} />
          <Route exact path='/campaignAssets/beastiary' component={BeastiaryContainer} />
          <Route exact path='/campaignAssets/beastiary/:beastId' component={ViewBeast} />
          <Route exact path='/campaignAssets/gear' component={GearContainer} />
          <Route exact path='/campaignAssets/gear/:gearId' component={ViewGear} />
          <Route exact path='/campaignAssets/other' component={OtherContainer} />
          <Route exact path='/campaigns/:campaignId' component={ViewCampaign} />
          <Route exact path='/campaigns' component={Campaigns} />
          <Route exact path='/forums' component={Forums} />
          <Route exact path='/login' component={Login} />
        </Switch>
        </div>
        </BrowserRouter>

        </div>
        );
    }


}

export default App

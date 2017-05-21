import React from 'react';
import {BrowserRouter, Link } from 'react-router-dom';
import {Route} from 'react-router';
import Style from 'style-it';
import '../../css/siteMenu.css'

module.exports = class SiteMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {'expanded': false}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
    // TODO: Login is current a redirect, want to make it a pop up eventually.
    render(){
        return (
          <div >
            <ul id="siteMenu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/campaigns"> Campaigns </Link></li>
              <li onClick={this.handleClick}>
              <Link to="#">Campaign Assets</Link>
              </li>
              <li> <Link to='/forums'> Forums </Link></li>
              <li> <Link to='/login'> Login Page </Link></li>
            </ul>
            <div className="assetsMenu">
            <AssetsMenu expanded={this.state.expanded} />
            </div>
          </div>
        );
    }

};


class AssetsMenu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var menuHeight = "0%";
    var menuDisplay = "none";
    if(this.props.expanded === true){
       menuHeight = "25%";
       menuDisplay = "inline";
    }
     return Style.it(
       `
       @keyframes dropMenu {
         0% {
           height: 0;

         }
         100% {
           height: ${ menuHeight };
         }
       }
       @keyframes listItems {
         0%{
           height: 0%;
         }
         100%{
           height: 15%;
         }
       }
       #campaignAssets {
         background: yellow;
         height: ${ menuHeight };
         width: 15%;
         left: 22.5%;
         top: 2%;
         padding-top: 25px;
         position: absolute;
         display: ${ menuDisplay };
         color: blue;
         animation: .25s ease-out 0s dropMenu;
         list-style-type: none;
       }

       li{

         animation: .25s ease-out 0s listItems;
         height: 15%;
       }
       `,
       <div>
       <ul id="campaignAssets">
       <li> <Link to="/campaignAssets/maps"> Maps </Link></li>
       <li> <Link to="/campaignAssets/music"> Music </Link></li>
       <li> <Link to="/campaignAssets/npcs"> NPCs </Link></li>
        <li><Link to="/campaignAssets/beastiary"> Bestiary </Link></li>
       <li><Link to="/campaignAssets/gear"> Gear </Link></li>
       <li><Link to="/campaignAssets/other"> Other </Link></li>
       </ul>
       </div>
     )

  }
}

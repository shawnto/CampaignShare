import React from 'react'
import Draggable from 'react-draggable'
import '../../css/campaigns/assetsBrowser.css'

class AssetsBrowser extends React.Component{
  constructor(props){
    super(props)
    this.state = {assetsExpanded: false,
                  browserExpanded: false,
                  assetsOnTable: [],
                  expandedAssets: [],
                  assetType: '',
                  cardExpanded: null,
                  expandedCard: {}}
  }

  handleToggle(event){
    const assets = this.props.assets
    const name = event.target.innerText
    var expanded = true
    if (name == this.state.assetType){
      expanded = !this.state.assetsExpanded
    }
    if (name === "Beasts"){
      this.setState({assetsExpanded: expanded,
                     expandedAssets: assets.Beasts,
                     assetType: "Beasts"})
    }
    else if(name === "Gear"){
      this.setState({assetsExpanded: expanded,
                     expandedAssets: assets.Gear,
                     "assetType": "Gear"})
    }
    else if(name === "Expand/Collapse Menu"){
      this.setState({browserExpanded: !this.state.browserExpanded})
    }
    else if(name === "x"){
      if (event.target.value != this.state.cardExpanded){
        this.setState({cardExpanded: event.target.value})
      }
      else{
        this.setState({cardExpanded: null})
      }

    }
  }

  handleAssetGroup(event){
    const clickedAssetId = event.target.id
    const currentOnTable = this.state.assetsOnTable.map((a) =>
      a.TableId
    )
    var onTable = this.state.assetsOnTable
    const expAssets = this.state.expandedAssets
    const index = currentOnTable.indexOf(clickedAssetId)
    if (index != -1){
      onTable.pop(index)
    }
    else{
      for (var asset in expAssets){
        if (expAssets[asset].TableId === clickedAssetId){
          onTable.push(expAssets[asset])
        }
      }
    }
    this.setState({assetsOnTable: onTable})
  }

  render(){

    const assets = this.props.assets
    const expandedAssets = this.state.expandedAssets
    const assetsExpanded = this.state.assetsExpanded
    const assetType = this.state.assetType
    return (
      <div id="assetContainer">
        <h1> Asset Browser </h1>
        <div id="assetMenu" >
          <button type="button" id="expandMenu" onClick={(event) => this.handleToggle(event)}>
          Expand/Collapse Menu
          </button>
          <div id="assetsCategories">
            <AssetsCategories assets={assets}
            handleToggle={(event) => this.handleToggle(event)}
            browserExpanded={this.state.browserExpanded}/>
          </div>
            <div id="expandedAssets">
            <ExpandedAssets assetGroup={expandedAssets}
                            expanded={assetsExpanded}
                            assetType={assetType}
                            handleAssetGroup={(event) => this.handleAssetGroup(event)} />
          </div>
        </div>
        <div className="assetTable">
          <AssetTable assetsOnTable={this.state.assetsOnTable}
                      handleToggle={(event) => this.handleToggle(event)}
                      expandedCard = {this.state.expandedCard}
                      cardExpanded = {this.state.cardExpanded}/>
        </div>
      </div>
    )
  }
}

function AssetsCategories(props){
  if (typeof props.assets != "undefined" && props.browserExpanded === true){
     const categories = Object.keys(props.assets)
     const catHTML = categories.map((k) =>
       <button type="button" id="assetButton" key={k} onClick={props.handleToggle}>
       {k}
       </button>
     );
     return (<div> {catHTML} </div>)
   }
   else{
     return (<div></div>)
   }
}

function AssetTable(props){
  const onTable = props.assetsOnTable
  const bounds = "parent"
  const assetCards = onTable.map((a) =>
    <Draggable  key={a.TableId.toString()} bounds={bounds}>
    <div id='asset'>
      <div className="assetThumb">
      <span>{a.Name}</span>
      <button type="button" value={a.TableId} onClick={props.handleToggle}>
      x
      </button>
      <p> {a.ShortDescription} </p>
      </div>
      <div>
        <ExpandedCard cardExpanded={props.cardExpanded}
                      cardInfo={a} />
      </div>
    </div>
    </Draggable>
  );
  return(
    <div className="assetTable"  >
      {assetCards}
    </div>
  )
}

function ExpandedCard(props){
  const currentExpandedCard = props.cardExpanded
  const cardInfo = props.cardInfo
  if (currentExpandedCard != null && currentExpandedCard == cardInfo.TableId){
    return(
      <div id="currentExpandedCard">
        <h1> {cardInfo.Name} </h1>
        <img src={cardInfo.Thumbnail} alt="No thumbnail :(" />
        <p> {cardInfo.Description} </p>
        <h4> Alignment: </h4>
        <p> {cardInfo.Alignment} </p>
        <h4> Stats: </h4>
        <p> {cardInfo.Stats} </p>
      </div>
    )
  }
  else{
  }
  return (<div> </div>)
}

function ExpandedAssets(props){
  const assets = props.assetGroup
  if (assets.length < 1 || props.expanded === false){
    return(<div></div>)
  }
  else{
    const assetHTML = assets.map((a) =>
                 <div id={a.TableId.toString()} className="assetGroupItems"
                      key={a.TableId.toString()}
                      onClick={props.handleAssetGroup}>
                 <span> {a.Name} </span>
                 </div>
                )
    return(
      <div> {assetHTML} </div>
  )
 }
}

export default AssetsBrowser

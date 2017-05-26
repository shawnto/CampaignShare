import { combineReducers } from "redux"

import user from "./userManagers.js"
import assetsView from "./assetsViewManagers.js"
import activeAsset from "./activeAssetManagers.js"
import activeCampaign from "./activeCampaignManager.js"

export default combineReducers({
  user, assetsView, activeAsset, activeCampaign
})

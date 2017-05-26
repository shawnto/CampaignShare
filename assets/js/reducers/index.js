import { combineReducers } from "redux"

import user from "./userManagers.js"
import assetsView from "./assetsViewManagers.js"
import activeAsset from "./activeAssetManagers.js"

export default combineReducers({
  user, assetsView, activeAsset
})

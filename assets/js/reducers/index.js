import { combineReducers } from "redux"

import user from "./userManagers.js"
import mapView from "./mapViewManagers.js"

export default combineReducers({
  user, mapView
})

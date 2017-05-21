var React = require('react')
var ReactDOM = require('react-dom')
import { Provider } from "react-redux"
import store from "./store.js"
import App from './app.jsx'
import '../css/global.css'

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('react-app')
)

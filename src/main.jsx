import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App'
import store from "./store/store"
import {Provider} from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
       <App />
        </Provider>
    </Router>
   
  </React.StrictMode>,
  document.getElementById('root')
)

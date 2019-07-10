import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './assets/registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))
registerServiceWorker()

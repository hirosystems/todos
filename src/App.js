import React, { Component } from 'react'
import './App.css'
import { UserSession } from 'blockstack'
import Landing from './Landing'
import Dashboard from './Dashboard'
import { appConfig } from './constants'

class App extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({ appConfig })
  }

  componentWillMount() {
    const session = this.userSession
    if(!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
      .then((userData) => {
        if(!userData.username) {
          throw new Error('This app requires a username.')
        }
        window.location = `/`
      })
    }
  }

  render() {
    return (
      <main role="main">
          {this.userSession.isUserSignedIn() ?
            <Dashboard userSession={this.userSession}/>
          :
            <Landing />
          }
      </main>
    );
  }
}

export default App

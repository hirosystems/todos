import React, { Component } from 'react'
import './App.css'
import { UserSession } from 'blockstack'
import Landing from './Landing'
import Dashboard from './Dashboard'
import { User, getConfig } from 'radiks'
import { appConfig } from './constants'
import { configure } from 'radiks'

class App extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({ appConfig })
  }

 async componentWillMount() {
    const userSession = this.userSession
    configure({
      apiServer: 'http://127.0.0.1:3000/',
      userSession: userSession
    })
    const s = getConfig()
    if(!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      await userSession.handlePendingSignIn();
        if(!userSession.loadUserData().username) {
          throw new Error('This app requires a username.')
        }
        window.location = `/`
        await User.createWithCurrentUser();
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

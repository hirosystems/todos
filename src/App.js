import React, { Component } from 'react'
import './App.css'
import { UserSession } from 'blockstack'
import Landing from './Landing'
import { Dashboard } from './Dashboard'
import { User, getConfig } from 'radiks'
import { appConfig } from './constants'
import { configure } from 'radiks'

class App extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({ appConfig })
  }

  async componentWillMount() {
    configure({
      apiServer: 'http://localhost:1260',
      userSession: this.userSession
    })
    const session = this.userSession
    const { userSession } = getConfig()

    if(userSession.isSignInPending()) {
      await userSession.handlePendingSignIn()
      if(!session.loadUserData().username) {
        throw new Error('This app requires a username.')
      }
      await User.createWithCurrentUser()
      window.location = `/`
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

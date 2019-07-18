import React, { Component } from 'react';
import '../styles/App.css'
import { Profile } from './Profile';
import Signin from './Signin';
import { UserSession } from 'blockstack';
import { appConfig } from '../assets/constants'
import { User, getConfig, configure } from 'radiks';

class App extends Component {

  constructor() {
    super();
    this.userSession = new UserSession({ appConfig });
  }

  async componentWillMount() {
    configure({
      apiServer: 'http://localhost:1260',
      userSession: this.userSession,
    });
    const { userSession } = getConfig();
    if (userSession.isSignInPending()) {
      await userSession.handlePendingSignIn();
      await User.createWithCurrentUser();
      window.location = '/';
    }
  }

  handleSignIn(e) {
    const { userSession } = getConfig();
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    const { userSession } = getConfig();
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !this.userSession.isUserSignedIn() ?
            <Signin userSession={this.userSession} handleSignIn={ this.handleSignIn } />
            : <Profile userSession={this.userSession} handleSignOut={ this.handleSignOut } />
          }
        </div>
      </div>
    );
  }
  
}

export default App;

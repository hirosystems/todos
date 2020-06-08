import React, { Component } from 'react';
import '../styles/App.css'
import Profile from './Profile.js';
import Signin from './Signin.js';
import { UserSession } from 'blockstack';
import { appConfig } from '../assets/constants'
import { Connect } from '@blockstack/connect';


const userSession = new UserSession({ appConfig })

export default class App extends Component {
  state = {
    userData: null,
  }

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const { userData } = this.state;
    const authOptions = {
      appDetails: {
        name: 'Blockstack App',
        icon: window.location.origin + '/favicon.ico'
      },
      userSession,
      finished: ({ userSession }) => {
        this.setState({ userData: userSession.loadUserData() });
      }
    }
    return (
      <Connect authOptions={authOptions}>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            { !userData ? <Signin /> : <Profile userData={userData} handleSignOut={ this.handleSignOut } /> }
          </div>
        </div>
      </Connect>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }
}

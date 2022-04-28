import React, { Component } from 'react';
import { Signin } from './Signin';
import { Header } from './Header';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import { TodoList } from './TodoList';
import { fetchFirstName, network, userSession } from '../auth';

export default class App extends Component {
  state = {
    userData: null,
    username: null,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <div className="site-wrapper">
            <div className="site-wrapper-inner">
              <Header username={this.state.username} address={this.state.address} />
              {!userSession.isUserSignedIn() ? (
                <Signin />
              ) : (
                <TodoList username={this.state.username} />
              )}
            </div>
          </div>
        </ToastProvider>
        <CSSReset />
      </ThemeProvider>
    );
  }

  setStateUser(userData) {
    const usernameFromProfile = userData.username;
    const address = userData.profile?.stxAddress?.mainnet;
    this.setState({ userData: userData, username: usernameFromProfile, address: address });

    if (!usernameFromProfile && address) {
      fetchFirstName(address, network).then(username => this.setState({ username }));
    }
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        this.setStateUser(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      this.setStateUser(userData);
    } else {
      this.setState({ userData: null, username: null });
    }
  }
}

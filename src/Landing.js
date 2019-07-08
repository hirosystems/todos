import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import { appConfig } from './constants'
import './Landing.css'
import { User, configure, getConfig } from 'radiks'

class Landing extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({ appConfig })
  }

  async signIn(e) {
    e.preventDefault()
    this.userSession.redirectToSignIn()
  }

  render() {
    return (
      <div className="Landing">
        <div className="form-signin">
          <h1 className="h1 mb-3 font-weight-normal">To-do List</h1>
          <p>A decentralized Todo app built on <a href="https://blockstack.org" target="_blank"rel="noopener noreferrer">Blockstack</a></p>
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={this.signIn.bind(this)}>Sign in with Blockstack
          </button>
        </div>
      </div>
    );
  }
}

export default Landing

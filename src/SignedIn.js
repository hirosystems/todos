import React, { Component } from 'react'
//import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
//import EditMe from './EditMe'
//import Kingdom from './Kingdom'
import NavBar from './NavBar'
//import OptionsList from './OptionsList'
//import OtherKingdoms from './OtherKingdoms'
import { appConfig, ME_FILENAME } from './constants'
import './SignedIn.css'


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      me: {},
      savingMe: false,
      savingKingdown: false
      //redirectToMe: false
    }

    this.loadMe = this.loadMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
    this.loadMe()
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   }

  loadMe() {
    const options = { decrypt: false }
    this.userSession.getFile(ME_FILENAME, options)
    .then((content) => {
      if(content) {
        const me = JSON.parse(content)
        this.setState({me})
        //this.setState({me, redirectToMe: false})
      } else {
        const me = null
        //this.setState({me, redirectToMe: true})
        this.setState({me})
      }
    })
  }


  saveMe(me) {
    this.setState({me, savingMe: true})
    const options = { encrypt: false }
    this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
    .finally(() => {
      this.setState({savingMe: false})
    })
  }


  addSubject(e) {
    e.preventDefault()
    const subject = subjectFromKingdomUrl(this.state.value)
    const subjects = jsonCopy(this.state.subjects)
    this.setState({value: '', clickAdd: false})
    subjects.push(subject)
    this.setState({ subjects })
    this.saveSubjects(subjects)
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username
    //const me = this.state.me



    return (
      <div className="SignedIn">
      <NavBar username={username} signOut={this.signOut}/>
      <div className="row justify-content-center">
                  <div
                    id="addSubject"
                    className="add-frame col-lg-6"
                    style={{borderColor: '#f8f9fa'}}
                  >
                    <form onSubmit={this.addTask} className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.value}
                        required
                        placeholder="Write a to-do..."
                        autofocus="true"
                      />
                      <div className="input-group-append">
                        <input type="submit" className="btn btn-primary" value="Add task"/>
                      </div>
                    </form>
                  </div>
                </div>
      </div>
    );
  }
}

export default SignedIn

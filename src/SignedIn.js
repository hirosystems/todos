import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import NavBar from './NavBar'
import {jsonCopy} from './utils'
import { appConfig, TASKS_FILENAME } from './constants'
import './SignedIn.css'


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      tasks: [],
      value: '',

    }

    this.loadTasks = this.loadTasks.bind(this)
    this.signOut = this.signOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
  }

  componentWillMount() {
    this.loadTasks()
  }

  componentWillReceiveProps(nextProps) {
    const nextTasks = nextProps.tasks
    if(nextTasks) {
      if (nextTasks.length !== this.state.tasks.length) {
        this.setState({ tasks: jsonCopy(nextTasks) })
      }
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   }

  loadTasks() {
    const options = { decrypt: false }
    this.userSession.getFile(TASKS_FILENAME, options)
    .then((content) => {
      if(content) {
        const tasks = JSON.parse(content)
        this.setState({tasks})
      } 
    })
  }

  saveTasks(tasks) {
    const options = { encrypt: false }
    this.userSession.putFile(TASKS_FILENAME, JSON.stringify(tasks), options)
    .finally(() => {
      if(window.location.search) {
        window.history.pushState(null, "", window.location.href.split("?")[0])
      }
    })
  }

  removeTask(e) {
    e.preventDefault()
    const index = e.target.dataset.index
    const tasks = jsonCopy(this.state.tasks)
    tasks.splice(index, 1) // remove subject at index
    this.setState({ tasks })
    this.saveTasks(tasks)
  }

  addTask(e) {
    e.preventDefault()
    const task = this.state.value
    const tasks = jsonCopy(this.state.tasks)
    this.setState({value: ''})
    tasks.push(task)
    this.setState({ tasks })
    this.saveTasks(tasks)
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username

    return (
      <div className="SignedIn">
      <NavBar username={username} signOut={this.signOut}/>
        <div className="row justify-content-center">
          <div
            id="addTask"
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
                autoFocus={true}
              />
              <div className="input-group-append">
                <input type="submit" className="btn btn-primary" value="Add task"/>
              </div>
            </form>
          </div>
          <div class = "list-group list-group-flush">
            {this.state.tasks.map((task, i) =>
              <ul key={i}>
                  <span class="input-group-text">{task}</span>
                  <button className="btn btn-primary" data-index={i} onClick={this.removeTask}>X</button>
              </ul>
            )}
          </div>
        </div>
      </div>
  
    );
  }
}

export default SignedIn

import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import NavBar from './NavBar'
import {jsonCopy, remove, add, check} from './utils'
import { appConfig, TASKS_FILENAME } from './constants'
import './Dashboard.css'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      value: '',
    }

    this.loadTasks = this.loadTasks.bind(this)
    this.signOut = this.signOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.checkTask = this.checkTask.bind(this)
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

 loadTasks() {
    const options = { decrypt: false }
    this.props.userSession.getFile(TASKS_FILENAME, options)
    .then((content) => {
      if(content) {
        const tasks = JSON.parse(content)
        this.setState({tasks})
      } 
    })
  }

  saveTasks(tasks) {
    const options = { encrypt: false }
    this.props.userSession.putFile(TASKS_FILENAME, JSON.stringify(tasks), options)
    .finally(() => {
      if(window.location.search) {
        window.history.pushState(null, "", window.location.href.split("?")[0])
      }
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   }

  removeTask(e) {
    e.preventDefault()
    const tasks = remove(e.target.dataset.index, this.state)
    this.setState({ tasks })
    this.saveTasks(tasks)
  }

  addTask(e) {
    e.preventDefault()
    const tasks = add(this.state)
    this.setState({value: '', tasks})
    this.saveTasks(tasks)
  }

  checkTask(e) {
    const tasks = check(e.target.dataset.index, this.state)
    this.setState({ tasks })
    this.saveTasks(tasks)
  }

  signOut(e) {
    e.preventDefault()
    this.props.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.props.userSession.loadUserData().username
    return (
      <div className="Dashboard">
      <NavBar username={username} signOut={this.signOut}/>
        <div className="row justify-content-md-center">
          <h1 className="user-info">
            <small>
              {username}'s to-dos
            </small>
          </h1>
        </div>
        <br></br>
        <div className="row justify-content-center">
          <div
            id="addTask"
            className="frame"
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
          </div>
        <br></br>
        <div className="row justify-content-center">
          <div className="frame">
            {this.state.tasks.map((task, i) =>
              <ul key={i}>
                <div className="row">
                  <input type="checkbox" className="form-check-input" data-index={i} onClick={this.checkTask} checked={task[1]? true : false}></input>
                  <div className="col">
                    <span className="input-group-text">
                      <div className="task">
                        {task[1]? <s>{task[0]}</s> : task[0]}
                      </div> 
                      <div className="delete">
                        <button className="btn btn-primary" data-index={i} onClick={this.removeTask}>X</button>
                      </div>
                    </span>
                    </div>
                  </div>
              </ul>
            )}
          </div>
      </div> 
    </div>
  );
  }
}
// Made this a default prop (instead of using this.userSession) so a dummy userSession
// can be passed in for testing purposes
Dashboard.defaultProps = {
  userSession: new UserSession(appConfig)
};

export default Dashboard
import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import NavBar from './NavBar'
import {jsonCopy, remove, check} from './utils'
import { appConfig, TASKS_FILENAME } from './constants'
import './Dashboard.css'
import { Model, configure, User } from 'radiks'
import CompTab from './CompTab'

class Tester extends Model {
  static className = 'Tester';
  static schema = { // all fields are encrypted by default
    task: String,
    completed: {
      type: Boolean,
      decrypted: true
    }
  }
};



class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.userSession = this.props.userSession
    this.state = {
      pending: [],
      completed: [],
      all: [],
      value: ''
    }

    this.loadTasks = this.loadTasks.bind(this)
    this.signOut = this.signOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
 
  }

  async componentWillMount() {
    configure({
      apiServer: 'http://localhost:1260',
      userSession: this.userSession
    })
    //await User.createWithCurrentUser();
    this.loadTasks()
  }


  async loadTasks() {
    console.log("dashboard")
    const incompleteTodos = await Tester.fetchList({
      completed: false
    });
    const completeTodos = await Tester.fetchList({
      completed: true
    })
    const allTodos = await Tester.fetchList({
    })
    this.setState({
      pending: incompleteTodos, 
      completed: completeTodos,
      all: allTodos
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

  async addTask(e) {
    e.preventDefault()
    const task = this.state.value
    const pending = this.state.pending
    const all = this.state.all
    const todo = new Tester({task: {task}, completed: false});
    pending.push(todo._id)
    all.push(todo._id)
    await todo.save();
    this.setState({pending: pending, all: all, value: ''})
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
            <ul className="nav nav-pills nav-fill" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" id="pills-all-tab">All</a>
              </li>
              <li className="nav-item">
              <a className="nav-link" data-toggle="pill" href="#pills-pending" role="tab" aria-controls="pills-pending" id="pills-pending-tab">Pending</a>
              </li>
              <li className="nav-item">
              <a className="nav-link" data-toggle="pill" href="#pills-comp" role="tab" aria-controls="pills-comp" id="pills-comp-tab">Completed</a>
              </li>
            </ul>
            <div className="tab-conent">
              <div class="tab-pane fade active show" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                <CompTab userSession={this.userSession} tasks={this.state.all} loadTasks={this.loadTasks}/>
              </div>
              <div class="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab">
                <CompTab userSession={this.userSession} tasks={this.state.pending} loadTasks={this.loadTasks}/>
              </div>
              <div class="tab-pane fade" id="pills-comp" role="tabpanel" aria-labelledby="pills-comp-tab">
                <CompTab userSession={this.userSession} tasks={this.state.completed} loadTasks={this.loadTasks}/>
              </div>
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

export { Dashboard, Tester }
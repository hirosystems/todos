import React, { Component } from 'react';
import { UserSession } from 'blockstack';
import { Model } from 'radiks';
import { appConfig } from './constants';
import './Dashboard.css';
import CompTab from './CompTab';
import NavBar from './NavBar';


class Tester extends Model {
  static className = 'Tester';

  static schema = { // all fields are encrypted by default
    task: String,
    completed: {
      type: Boolean,
      decrypted: true,
    },
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.userSession = this.props.userSession;
    this.state = {
      pending: [],
      completed: [],
      all: [],
      value: '',
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.signOut = this.signOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  async componentWillMount() {
    this.loadTasks();
  }

  async loadTasks() {
    var incompleteTodos = await Tester.fetchList({
      completed: false,
    });
    var completeTodos = await Tester.fetchList({
      completed: true,
    });
    var allTodos = await Tester.fetchList({
    });
    this.setState({
      pending: incompleteTodos,
      completed: completeTodos,
      all: allTodos,
    });
    console.log(incompleteTodos);
    console.log(completeTodos);
    console.log(allTodos);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async addTask(e) {
    e.preventDefault();
    const task = this.state.value;
    const todo = new Tester({ task: task, completed: false });
    await todo.save();
    this.setState({ value: '' });
    this.loadTasks();
  }


  signOut(e) {
    e.preventDefault();
    this.props.userSession.signUserOut();
    window.location = '/';
  }


  render() {
    const username = this.props.userSession.loadUserData().username;
    const pending = this.state.pending;
    const all = this.state.all;
    const completed = this.state.completed;
    return (
      <div className="Dashboard">
        <NavBar username={username} signOut={this.signOut} />
        <div className="row justify-content-md-center">
          <h1 className="user-info">
            <small>
              {username}
              's to-dos
            </small>
          </h1>
        </div>
        <br></br>
        <div className="row justify-content-center">
          <div
            id="addTask"
            className="frame"
            style={{ borderColor: '#f8f9fa' }}
          >
            <form onSubmit={this.addTask} className="input-group">
              <input
                className="form-control"
                type="text"
                onChange={this.handleChange}
                value={this.state.value}
                required
                placeholder="Write a to-do..."
              />
              <div className="input-group-append">
                <input type="submit" className="btn btn-primary" value="Add task" />
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
            <div className="tab-pane fade active show" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
              <CompTab userSession={this.userSession} tasks={all} loadTasks={this.loadTasks} />
            </div>
            <div className="tab-pane fade" id="pills-pending" role="tabpanel" aria-labelledby="pills-pending-tab">
              <CompTab userSession={this.userSession} tasks={pending} loadTasks={this.loadTasks} />
            </div>
            <div className="tab-pane fade" id="pills-comp" role="tabpanel" aria-labelledby="pills-comp-tab">
              <CompTab userSession={this.userSession} tasks={completed} loadTasks={this.loadTasks} />
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
  userSession: new UserSession(appConfig),
};

export { Dashboard, Tester };

import React, { Component } from 'react'
import { configure, User } from 'radiks'
import { Tester } from './Dashboard'


class Task extends Component {

  constructor(props) {
    super(props)
    this.userSession = this.props.userSession
    this.state = {
      task: '',
      completed: ''
    }

    this.loadTask = this.loadTasks.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.checkTask = this.checkTask.bind(this)
  }

  async componentWillMount() {
    //configure({
    //  apiServer: 'http://localhost:1260',
    //  userSession: this.userSession
    //})
    //await User.createWithCurrentUser();
    this.loadTask()
  }

  async loadTask() {
    // Set state with the text and status of this task
    const id = this.props.id 
    const todo = await Tester.findById({id});
    const {task, completed } = todo.attrs
    this.setState({task, completed})
  }

  async removeTask(e) {
    e.preventDefault()
    const id = this.props.id
    const todo = await Tester.findById({id});
    todo.destroy(); //delete this in the radiks server
    this.props.removeTask(this.props.index) //call the parent component to remove it from its state list of tasks
  }

  async checkTask(e) {
    e.preventDefault()
    const id = this.props.id
    const todo = await Tester.findById({id})
    const updatedStatus = {
      completed: !this.state.completed,
    }
    todo.update(updatedStatus); //update in radiks-server
    await todo.save();
    this.setState({completed: !this.state.completed}); //update in state
    this.props.checkTask()
  }

  render() {
    return (
      <div className="row">
        <input type="checkbox" className="form-check-input" onClick={this.checkTask} checked={this.state.completed? true : false}></input>
        <div className="col">
          <span className="input-group-text">
            <div className="task">
              {this.state.completed? <s>{this.state.task}</s> : this.state.task}
            </div> 
            <div className="delete">
              <button className="btn btn-primary" onClick={this.removeTask}>X</button>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default Task
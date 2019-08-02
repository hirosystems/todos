import React, { Component } from 'react';
import { Todo } from './Profile';

class Task extends Component {
  constructor(props) {
    super(props);
    this.userSession = this.props.userSession;
    this.state = {
      task: '',
      completed: '',
    };

    this.loadTask = this.loadTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
  }

  async componentWillMount() {
    this.loadTask();
  }

  async loadTask() {
    const id = this.props.task._id ;
    const todo = await Todo.findById( id );
    const { task, completed } = todo.attrs;
    this.setState({ task, completed });
  }

  async removeTask(e) {
    e.preventDefault();
    this.props.removeTask(this.props.task._id);
    console.log(this.props.task._id);
  }

  async checkTask(e) {
    e.preventDefault();
    this.setState({completed: !this.state.completed});
    this.props.checkTask(this.props.task._id);
  }

  render() {
    return (
      <div className="row">
        <input type="checkbox" className="form-check-input" onClick={this.checkTask} checked={this.state.completed}></input>
        <div className="col">
          <span className="input-group-text">
            <div className="task">
              {this.state.completed ? <s>{this.state.task}</s> : this.state.task}
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

export default Task;

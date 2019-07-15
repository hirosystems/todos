import React, { Component } from 'react';
import Task from './Task';

class CompTab extends Component {
  constructor(props) {
    super(props);
    this.userSession = this.props.userSession;
    this.state = {
      tasks: [], // contains Radiks ID of the tasks
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
  }

  async componentWillMount() {
    this.loadTasks();
  }

  removeTask = (index) => {
    this.setState((state) => {
      const tasks = [...state.tasks];
      tasks.splice(index, 1);
      return { tasks };
    }); // updating state may be redundant with reloading task
    this.props.loadTasks();
  }

  loadTasks() {
    const tasks = this.props.tasks;
    this.setState({tasks});
    console.log("hello im in comptab");
    console.log(this.state.tasks)
  }

  checkTask() {
    this.props.loadTasks();
    // Task's checkTask has updated radiks-server info, just reload that into state
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="frame">
          {this.props.tasks.map((task, i) =>
          <ul key={i}>
              <Task
                id={task}
                userSession={this.userSession}
                removeTask={this.removeTask}
                checkTask={this.checkTask}
                index={i}
              />
          </ul>
          )}
        </div>
      </div>
    );
  }
}

export default CompTab;

import React, { Component } from 'react';
import Task from './Task';

class CompTab extends Component {
  constructor(props) {
    super(props);
    this.userSession = this.props.userSession;
    this.state = {
      tasks: [],
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
  }

  componentWillMount() {
    this.loadTasks();
  }

  removeTask = (index) => {
    //this.setState((state) => {
    //  const tasks = [...state.tasks];
    //  tasks.splice(index, 1);
    //  return { tasks };
    //}); // updating state may be redundant with reloading task
    //console.log("compTab removeTask");
    this.props.loadTasks();
    this.loadTasks();
  }

  loadTasks() {
  //  console.log("compTabe loadTasks")
    //console.log("CompTab loadTasks")
    const tasks = this.props.tasks;
    //console.log(tasks);
  //  //console.log(this.props.tasks)
    this.setState({tasks});
    //console.log(this.state.tasks);
    //console.log("hello im in comptab");
    //console.log(this.state.tasks)
  }

  checkTask() {
    this.props.loadTasks();
    this.loadTasks();
    // Task's checkTask has updated radiks-server info, just reload that into state
  }

  render() {
    //this.loadTasks();
    //this.props.loadTasks();
    const newTasks = this.props.tasks
    console.log("render");
    console.log(newTasks);
    return (
      <div className="row justify-content-center">
        <div className="frame">
          {newTasks.map((task, i) =>
          <ul key={i}>
              <Task
                task={task}
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

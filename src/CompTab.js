import React, { Component } from 'react'
import Task from './Task'
import { User, configure } from 'radiks'


class CompTab extends Component {

  constructor(props) {
    super(props)
    this.userSession = this.props.userSession
    this.state = {
      tasks: [] //contains Radiks ID of the tasks
    }

    this.loadTasks = this.loadTasks.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.checkTask = this.checkTask.bind(this)
  }

  async componentWillMount() {
    configure({
      apiServer: 'http://localhost:1260',
      userSession: this.userSession
    })
    //await User.createWithCurrentUser();
    this.loadTasks()
  }

  loadTasks () {
    const tasks = this.props.tasks
    this.setState(tasks)
  }

  removeTask = (index) => {  
    this.setState(state => {
      const tasks = [...state.tasks];
      tasks.splice(index, 1);
      return { tasks };
    }); //updating state may be redundant with reloading task
    this.props.loadTasks()
  }

  checkTask () {
    this.props.loadTasks()
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="frame">
        {this.state.tasks.map((task,i) =>
        <ul key={i}>
          <Task 
              id={task} 
              userSession={this.userSession} 
              removeTask={this.removeTask}
              checkTask={this.checkTask} 
              index={i}/>
        </ul>
        )}
        </div>
      </div>
    );
  }
}

export default CompTab
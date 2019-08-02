import React, { Component } from 'react';
import Task from './Task';
import { jsonCopy } from '../assets/utils'


class CompTab extends Component {
  constructor(props) {
    super(props);
    this.userSession = this.props.userSession;

  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="frame">
          {this.props.tasks.map((task, i) =>
          <ul key={i}>
              <Task
                task={task}
                userSession={this.userSession}
                removeTask={this.props.removeTask}
                checkTask={this.props.checkTask}
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

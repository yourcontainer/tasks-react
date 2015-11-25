import React from 'react'
import { Task } from './Task'

const List = require('material-ui/lib/lists/list');

export class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tasks : [] }
  }

  _getTasks() {
    $.ajax({
      url: '/api/tasks',
      dataType: 'json',
      success: (data) => {
        this.setState({tasks: data});
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  componentDidMount() {
    this._getTasks()
  }

  render() {
    let tasks = this.state.tasks.map((task) => {
      return <Task key={task._id} name={task.name} active={task.active} status={task.status} />
    })

    console.log(this.state)

    return (
      <List subheader="Tasks"> {tasks} </List>
    );
  }
}

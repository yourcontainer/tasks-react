import React from 'react'
import { Task } from './Task'

const List = require('material-ui/lib/lists/list');

export class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tasks : [] }

    this.socket = io.connect()
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
    var self = this;

    this._getTasks();

    this.socket.on('taskChange', function (data) {
      self._getTasks()
    });
  }

  render() {
    let tasks = this.state.tasks.map((task) => {
      return <Task key={task._id} data={task} />
    })

    return (
      <List subheader="Tasks"> {tasks} </List>
    );
  }
}

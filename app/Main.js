import React from "react";
import ReactDOM from 'react-dom';
import { AddTask } from './components/AddTask';
import { Tasks } from './components/Tasks';

let App = React.createClass({

  render: function() {

    return (
      <div className="todo-application">
        <AddTask />
        <Tasks />
      </div>
    )
  }


})

ReactDOM.render(<App />, document.getElementById('app'))

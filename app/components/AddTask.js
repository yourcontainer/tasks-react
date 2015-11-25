import React from 'react'

const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const Paper = require('material-ui/lib/paper');
const Snackbar = require('material-ui/lib/snackbar');

export class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration : 3000
    }
    this._addTask = this._addTask.bind(this)
  }

  _addTask(el) {
    let name   = this.refs.TextInput.getValue(),
        status = this.refs.Status.getSelectedValue();

    if(name.trim() && status){
      $.post('/api/tasks', {
        name, status
      }, (response) => {
        response.status == 'success' ? this.refs.TaskMessage.show() :
          console.error(response);
      })

    }

    this.refs.TextInput.clearValue()
  }

  render() {

    return (
        <div className="form add-task">
          <Paper zDepth={5}>
          <TextField ref="TextInput"
            hintText="Add New Task"
            onEnterKeyDown={this._addTask}
            defaultValue="" />
          <RadioButtonGroup name="RadioButtonGroup" ref="Status" defaultSelected="Today">
              <RadioButton
                value="Today"
                label="Today"
                style={{marginBottom:16}} />
              <RadioButton
                value="Test me"
                label="Test me"
                style={{marginBottom:16}} />
              <RadioButton
                value="Done"
                label="Done"
                style={{marginBottom:16}} />
            </RadioButtonGroup>
          <RaisedButton label="Add" onClick={this._addTask} />
            <Snackbar
              message="Task has been added"
              autoHideDuration={this.state.autoHideDuration}
              ref="TaskMessage" />
          </Paper>
        </div>
      );
  }
}

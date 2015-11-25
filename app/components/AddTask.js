import React from 'react'

const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const Paper = require('material-ui/lib/paper');

export class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this._addTask = this._addTask.bind(this)
  }

  _addTask(el) {
    let text = this.refs.TextInput.getValue()

    if(text){

    }
  }

  render() {

    let style = {
      'float': 'left'
    };

    return (
        <div className="form add-task">
          <Paper zDepth={5}>
          <TextField ref="TextInput"
            hintText="Add New Task"
            onEnterKeyDown={this._addTask}
            defaultValue="" />
          <RadioButtonGroup name="Status" defaultSelected="Today">
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
          </Paper>
        </div>
      );
  }
}

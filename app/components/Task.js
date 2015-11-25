import React from 'react'

const ListItem = require('material-ui/lib/lists/list-item');
const Checkbox = require('material-ui/lib/checkbox');
const Badge = require('material-ui/lib/badge');
const IconButton = require('material-ui/lib/icon-button');
const FontIcon = require('material-ui/lib/font-icon');

export class Task extends React.Component {

  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(el) {
    let status = el.target.checked

    console.log(status)
  }

  render() {
    return (
      <ListItem primaryText={this.props.name}
        secondaryText={this.props.status}
        leftCheckbox={<Checkbox onCheck={this.onCheck}
        defaultChecked={this.props.active} />}
      />
    )
  }

}

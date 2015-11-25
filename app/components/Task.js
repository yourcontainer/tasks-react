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
    this.delete = this.delete.bind(this);

  }

  onCheck(el) {
    let active = el.target.checked

    $.ajax({
      method: "PUT",
      url: "/api/tasks",
      data: { _id: this.props.data._id, active }
    })
  }

  delete() {
    if(confirm('Delete?')){
      $.ajax({
        method: "DELETE",
        url: "/api/tasks",
        data: { _id: this.props.data._id}
      })
    }
  }

  render() {

    return (
      <ListItem primaryText={this.props.data.name}
        secondaryText={this.props.data.status}
        ref="Item"
        rightIconButton={<IconButton onClick={this.delete} iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Delete">clear</IconButton>}
        leftCheckbox={<Checkbox onCheck={this.onCheck}
        defaultChecked={this.props.data.active} />}
      />
    )
  }

}

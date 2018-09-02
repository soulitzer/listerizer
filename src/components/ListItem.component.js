import React, { Component } from 'react';

class ListItem extends Component {
  constructor() {
    super();
    this.state = {inputValue:""}
    this.submit = this.submit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({inputValue: e.target.value});
  }

  submit() {
    this.props.cb("update_item_name", this.props.item.id,
      this.state.inputValue, this.props.listId)
  }

  render() {
    const inputValue = this.state.inputValue
    const item = this.props.item;
    const cb = this.props.cb

    const inputBox = (
      <input type="text" value={inputValue} autoFocus
        onChange={this.onChange}
        onBlur={this.submit}
        onKeyPress = {(e) => {if(e.key === 'Enter') this.submit()}}>
      </input>
    );

    return (
      <div className="list-item"
        onDoubleClick={() => {cb("begin_edit_mode", item.id);}}>
        <b>{ this.props.isEditMode ? inputBox : item.name }</b>: {item.frequency}
      </div>
    );
  }
}

export default ListItem

import React, { Component } from 'react';
import ItemObj from '../classes/ItemObj.class.js'

class  NewListItem extends Component {
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
    const newItemObj = new ItemObj(this.state.inputValue, "1");
    if(this.state.inputValue !== "")
      this.props.cb("add_item", this.props.listId, newItemObj);
  }

  render() {
    const inputValue = this.state.inputValue
    const item = this.props.item;
    const cb = this.props.cb

    const inputBox = (
      <input type="text" value={inputValue} autoFocus
        onChange={this.onChange}
        onBlur={this.submit}
        onKeyPress = {(e) => {if(e.key === 'Enter') {this.submit(); this.state.inputValue = "";}}}>
      </input>
    );

    return (
      <div className="list-item">
        <b>{ inputBox }</b>
      </div>
    );
  }
}

export default NewListItem

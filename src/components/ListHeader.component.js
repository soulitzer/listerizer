import React, { Component } from 'react';

class ListHeader extends Component {
  constructor() {
    super();
    this.state = {inputValue:""};
    this.updateInputValue = this.updateInputValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateInputValue(e) {
    this.setState({inputValue: e.target.value});
  }

  submit() {
    this.props.cb("update_list_name", this.props.list.id, this.state.inputValue)
  }

  render() {
    const cb = this.props.cb
    const list = this.props.list
    const id = list.id
    const name = list.name
    const inputValue = this.state.inputValue

    const inputBox = (
      <input type="text" value={inputValue} autoFocus
        onChange={this.updateInputValue} onBlur={this.submit}
        onKeyPress = {(e)=>{if (e.key === 'Enter') this.submit()}}>
      </input>
    );

    return (
      <div className="list-header">
        <h1 onDoubleClick={()=>{cb("begin_edit_mode", id, inputValue)}}>
          {this.props.isEditMode ? inputBox : name}
        </h1>
      </div>
    )
  }
}

export default ListHeader

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListArea from './classes/ListArea.class.js'
import ListObj from './classes/ListObj.class.js'
import List from './components/List.component.js'

const print = console.log

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLists: new ListArea(),
    }
    this.state.allLists.initializeDummy();
    this.handleActions = this.handleActions.bind(this);
  }

  handleActions(action, entity, parameter, parameter2) {
    print(action, entity, parameter, parameter2)
    this.state.allLists.handleActions(action, entity, parameter, parameter2);
    this.setState({allLists: this.state.allLists});
  }

  makeLists(listObjs) {
    const selected = listObjs.selected;
    const editMode = listObjs.editMode;
    const lists = listObjs.lists;
    return (
      Object.values(lists).map(list => {
        return (
          <List list={list} key={list.id} cb={this.handleActions}
                isSelected = {selected.includes(list.id)}
                isEditMode = {editMode === list.id}
                editMode = {editMode}></List>);
      }));
  }

  render() {
    const listsElements = this.makeLists(this.state.allLists);
    const newListOnClick = () => {
      this.state.allLists.push(new ListObj("Untitled1"));
      this.setState({allLists: this.state.allLists});
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Listerizr</h1>
          <div className="button-add-list" onClick={newListOnClick}>
            <b>+ Add List</b>
          </div>
        </header>
        <div className="lists-area">
          <div className="list-background"
            onClick={(e)=>{this.handleActions("unselect_all")}}></div>
          {listsElements}
        </div>
      </div>
    );
  } // render
} // App

export default App;

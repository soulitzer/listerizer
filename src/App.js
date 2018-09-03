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
      keyDownMap : {}
    }
    this.state.allLists.initializeDummy();
    this.handleActions = this.handleActions.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
                singleSelected = {selected.length == 1}
                editMode = {editMode}></List>);
      }));
  }

  componentDidMount() {
    document.addEventListener('keydown' , (event) => {
      this.handleKeyDown(event);
      const keyName = event.key;
      this.state.allLists.keyDownMap[keyName] = true
      this.setState({allLists: this.state.allLists});
    });
    document.addEventListener('keyup', (event) => {
      const keyName = event.key;
      this.state.allLists.keyDownMap[keyName] = false
      this.setState({allLists: this.state.allLists});
    });
  }

  componentWillUnmount(){
    document.removeEventListener("keydown");
    document.removeEventListener("keyup");
  }

  handleKeyDown(e) {
    const keyDownMap = this.state.allLists.keyDownMap;
    const allLists = this.state.allLists;
    print(keyDownMap)
    switch(e.key) {
      case "Escape":
        this.handleActions("unselect_all");
        break;
      case "c":
      case "Meta":
        if(!allLists.newItemMode && !allLists.editMode)
          if(keyDownMap["c"] && keyDownMap["Meta"]) {
            allLists.copySelectedToBuffer();
          }
        break;
      case "v":
      case "Meta":
        if(!allLists.newItemMode && !allLists.editMode)
          if(keyDownMap["v"] && keyDownMap["Meta"]) {
            this.handleActions("paste_buffer");
          }
        break;
      default:
        break;
    }
    this.setState({allLists: allLists});
  }

  render() {
    const listsElements = this.makeLists(this.state.allLists);
    const newListOnClick = () => {
      const allLists = this.state.allLists;
      allLists.selected = [allLists.push(new ListObj("Untitled1"))];
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

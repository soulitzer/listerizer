import assert from 'assert'

import ItemObj from './ItemObj.class.js'
import ListObj from './ListObj.class.js'

class ListArea {
  constructor() {
    this.lists = [];
    this.selected = []; //ids
    this.editMode = ""; //id of the element (list or item) being editted
    this.newItemMode = ""; //id of list with new element being added
    this.keyDownMap = {}; //Key down map
    this.buffer = []; //Empty object
    this.bufferType = "";
    this.history = []; // History of past list states
    this.currentStateIndex = 0; //Keep track of what the current history is
  }

  copySelectedToBuffer() {
    this.buffer = []
    this.lists.forEach((l)=>{
      if(this.selected.includes(l.id)) {
        this.buffer.push(l);
      }
    });
    this.bufferType = "list"
  }

  pasteBuffer() {
    var counter = 0
    this.buffer.forEach((l)=>{
      counter ++
      const newList = new ListObj(l.name, counter)
      l.list.forEach((i)=> {
        counter++
        newList.push(new ItemObj(i.name, i.frequency, counter))
      })
      this.lists.push(newList);
    });
  }

  updateHistory() {
    this.history.push(this.lists);
    this.currentStateIndex++;
  }

  push(list) {
    assert(list instanceof ListObj);
    this.lists.push(list);
    return list.id
  }

  remove(listId) {
    const newLists = [];
    this.lists.forEach((l)=>{
      if(!(l.id === listId)) {
        newLists.push(l);
      }
    });
    this.lists = newLists;
    return true;
  }

  updateName(listId, newName) {
    this.lists.forEach((l)=>{
      if(l.id === listId) {
        l.updateName(newName);
        return true;
      }
    });
    return false;
  }

  updateItemName(listId, ItemId, newName) {
    this.lists.forEach((l)=>{
      if(l.id === listId) {
        l.updateItemName(ItemId, newName);
        return true;
      }
    });
    return false;
  }

  addItem(listId, item) {
    this.lists.forEach((l)=>{
      if(l.id === listId) {
        l.push(item);
        return true;
      }
    });
    return false;
  }

  removeItem(listId, itemName) {
    this.lists.forEach((l)=>{
      if(l.id === listId) {
        return l.remove(itemName);
      }
    });
    return false
  }

  initializeDummy() {
    const id = this.push(new ListObj("Untitled", "1"));
    this.addItem(id, new ItemObj("Hello", "1", "1"));
    this.addItem(id, new ItemObj("Hello", "2", "2"));
  }

  handleActions(action, entity, parameter, parameter2) {
    switch(action) {
      case "add_item":
        this.addItem(entity, parameter);
        break;
      case "remove_list":
        this.remove(entity);
        break;
      case "toggle_selection":
        const selected = this.selected;
        const beforeToggle = selected.includes(entity);

        if(!this.keyDownMap.Shift && !this.keyDownMap.Meta) selected.length = 0;
        if(beforeToggle) selected.splice(selected.indexOf(entity), 1);
        else selected.push(entity);
        break;
      case "unselect_all":
        this.selected = [];
        break;
      case "begin_edit_mode":
        this.editMode = entity;
        break;
      case "update_list_name":
        this.updateName(entity, parameter);
        this.editMode = "";
        break;
      case "update_item_name":
        this.updateItemName(parameter2, entity, parameter);
        this.editMode = "";
        break;
      case "paste_buffer":
        this.pasteBuffer();
      default:
        break;
    }
    this.updateHistory();
  } // handleActions
} // ListArea

export default ListArea

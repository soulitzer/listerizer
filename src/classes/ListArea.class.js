import assert from 'assert'

import ItemObj from './ItemObj.class.js'
import ListObj from './ListObj.class.js'

const keyDownMap = {}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  keyDownMap[keyName] = true
});
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  keyDownMap[keyName] = false
});

class ListArea {
  constructor() {
    this.lists = [];
    this.selected = []; //ids
    this.editMode = ""; //id of the element being editted
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
        this.addItem(entity, new ItemObj("test", "123"));
        break;
      case "remove_list":
        this.remove(entity);
        break;
      case "toggle_selection":
        const selected = this.selected;
        const beforeToggle = selected.includes(entity);

        if(!keyDownMap.Shift) selected.length = 0;
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
      default:
        break;
    }
  } // handleActions
} // ListArea

export default ListArea

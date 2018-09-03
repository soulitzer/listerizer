import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import ListItem from './ListItem.component.js'
import ListHeader from './ListHeader.component.js'
import NewListItem from './NewListItem.component.js'

function makeContextMenu(actions, id, cb) {
  const menuItems = (Object.values(actions).map(action => {
    return (
      <MenuItem onClick={()=>{cb(action, id)}}>
        <div className="ctxt-menu-item">{action}</div>
      </MenuItem>
    );
  }));
  return (
    <ContextMenu id={id}>
      {menuItems}
    </ContextMenu>
  );
}

class List extends Component {
  makeListElements(listObj) {
    return (
      Object.values(listObj.list).map(item => {
        return (
          <ListItem item={item} key={item.id} listId={listObj.id} cb={this.props.cb}
          isEditMode = {this.props.editMode === item.id}></ListItem>
        );
      })
    );
  }

  render() {
    const list = this.props.list
    const listElements = this.makeListElements(list);
    const isSelected = this.props.isSelected;
    const singleSelected = this.props.singleSelected;
    const isEditMode = this.props.isEditMode;
    const cb = this.props.cb
    const id = list.id

    const displayAddItem = isSelected && singleSelected && !isEditMode;
    const newListItem = (<NewListItem listId={id} cb={cb}></NewListItem>);

    return (
      <div className={isSelected ? "list list-selected" : "list"}
          onClick={()=>{cb("toggle_selection", id);}}>
        <ContextMenuTrigger id={id}>
          <ListHeader list={list} cb={cb} isEditMode={isEditMode}></ListHeader>
          <div className="list-body">{listElements}
            {displayAddItem ? newListItem : ""}
          </div>
        </ContextMenuTrigger>

        { makeContextMenu(["remove_list", "add_item"], id, cb) }
      </div>
    );
  }
}

export default List

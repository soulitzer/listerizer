import assert from 'assert'
import ItemObj from './ItemObj.class.js'

class ListObj {
  constructor(name, seed) {
    this.name = name;
    this.list = [];
    this.id = this.genId(seed);
  }

  genId(seed) {
    return "list-" +this.name+(new Date()).getTime().toString() +seed
  }

  updateName(newName) {
    this.name = newName;
  }

  updateItemName(itemId, newName) {
    this.list.forEach((i)=>{
      if(i.id === itemId) {
        i.updateName(newName);
      }
    });
  }

  push(item) {
    assert(item instanceof ItemObj);
    this.list.push(item);
  }

  extend(otherList) {
    assert(otherList instanceof ListObj);
    Array.prototype.push.apply(this.list, otherList);
  }

  remove(itemName) {
    const newList = [];
    for (var i in this.list) {
      if(!(i.name === itemName))
        newList.push(i);
    }
    this.list = newList;
    return true;
  }
}

export default ListObj;

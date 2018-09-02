class ItemObj {
  constructor(name, frequency, seed) {
    this.name = name;
    this.frequency = frequency;
    this.id = this.genId(seed)
  }

  updateName(newName) {
    this.name = newName;
  }

  genId(seed) {
    return "item-" + this.name+this.frequency+(new Date()).getTime().toString()+seed
  }
}

export default ItemObj

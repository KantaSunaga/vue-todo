export default class Todo {
  constructor(text) {      
    this.text = text;
    this._type = "doing";
  }
  get type(){
    return this._type;
  }
  set type(value){
    this._type = value;
  }
}

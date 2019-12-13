import React, { Component } from "react";
import Header from "./components/Header";
import Undolist from './components/Undolist'
import axios from 'axios'
import './style.css'

class TodoList extends Component {
  constructor() {
    super();
    this.addUndoItem = this.addUndoItem.bind(this)
    this.deleteUndoItem = this.deleteUndoItem.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.changeValue = this.changeValue.bind(this)
    
    this.state = {
      undoList: []
    };
  }

  componentDidMount() {
    axios.get('/list.json').then(res => {
      this.setState({
        undoList: res.data.data
      })
    }).catch(e => {
      console.log(e)
    })
  }

  addUndoItem(data) {
    const list = this.state.undoList;
    list.push(data);
    this.setState({
      undoList: list
    })
  }

  deleteUndoItem(index) {
    const list = this.state.undoList;
    list.splice(index, 1)
    this.setState({
      undoList: list
    })
  }

  changeStatus(index, type) {
    let list = this.state.undoList
    list[index].type=type
    this.setState({
      undoList: list
    })
  }

  changeValue(index, value) {
    let list = this.state.undoList
    list[index].value = value
    this.setState({
      undoList: list
    })
  }

  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} data-test="Header"></Header>
        <Undolist list={this.state.undoList} deleteItem={this.deleteUndoItem} changeStatus={this.changeStatus} changeValue={this.changeValue}></Undolist>
        
      </div>
    );
  }
}

export default TodoList;

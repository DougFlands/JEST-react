import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleInputKeyUp(e) {
    if (e.keyCode === 13 && this.state.value) {
      this.props.addUndoItem({
        type: 'div',
        value: this.state.value
      })
      this.setState({
        value: ''
      })
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div data-test="Header" style={{display: 'flex', height: '24px', justifyContent: 'space-around'}}>
        <p>todolist</p>
        <input
          data-test="header-input"
          value={value}
          onChange={this.handleInputChange.bind(this)}
          onKeyUp={this.handleInputKeyUp.bind(this)}
        />
      </div>
    );
  }
}

export default Header;

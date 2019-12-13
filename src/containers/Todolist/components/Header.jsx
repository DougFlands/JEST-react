import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../store";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleInputKeyUp(e) {
    if (e.keyCode === 13 && this.props.value) {
      this.props.addUndoItem({
        type: "div",
        value: this.props.value
      })
      this.props.handleInputKeyUpChange('')
    }
  }

  render() {
    const { value, handleInputChange } = this.props;
    return (
      <div
        data-test="Header"
        style={{
          display: "flex",
          height: "24px",
          justifyContent: "space-around"
        }}
      >
        <p>todolist</p>
        <input
          data-test="header-input"
          value={value}
          onChange={e => handleInputChange(e.target.value)}
          onKeyUp={this.handleInputKeyUp.bind(this)}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    value: state.todo.inputValue
  };
};

const mapDispatch = dispatch => ({
  handleInputChange(value) {
    dispatch(
      actions.changeInputValue(value)
    );
  },
  handleInputKeyUpChange(value) {
    dispatch(
      actions.changeInputValue(value)
    );
  }
});

export default connect(mapState, mapDispatch)(Header);

import React, { Component } from "react";
// import { connect } from "react-redux";

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
    if (e.keyCode === 13 && this.state.value) {
      this.props.addUndoItem({
        type: "div",
        value: this.state.value
      });
      this.setState({
        value: ""
      });
    }
  }

  render() {
    // const { value, handleInputChange } = this.props;
    const { value } = this.state;
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
          data-test="input"
          value={value}
          // onChange={e => handleInputChange(e.target.value)}
          onChange={this.handleInputChange.bind(this)}
          onKeyUp={this.handleInputKeyUp.bind(this)}
        />
      </div>
    );
  }
}

// const mapState = () => {
//   return {
//     value: state.todo.inputValue
//   }
// }

// const mapDispatch = dispatch => ({
//   handleInputChange(value) {
//     dispatch(actions.changeInputValue(value))
//   }
// })

// export default connect(mapState, mapDispatch)(Header);
export default Header;

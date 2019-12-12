import React, { Component } from "react";

class Undolist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list = [], deleteItem, changeStatus, changeValue } = this.props;
    return (
      <div data-test="UndoList">
        <div data-test="count">{list.length}</div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              {item.type === "div" ? (
                <span
                  data-test="undolist-item"
                  onClick={() => {
                    changeStatus(index, "input");
                  }}
                >
                  {item.value}
                </span>
              ) : (
                <input
                  value={item.value}
                  data-test="undolist-item-input"
                  autoFocus="autofocus"
                  onBlur={() => {
                    changeStatus(index, "div")
                  }}
                  onChange={e => {
                    changeValue(index, e.target.value)
                  }}
                />
              )}

              <span
                data-test="undoDelete-btn"
                onClick={() => {
                  deleteItem(index);
                }}
              >
                -
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Undolist;

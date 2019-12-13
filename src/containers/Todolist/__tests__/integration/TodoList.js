import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../../../../store/createStore'
import TodoList from '../../index'

it(`
  1. 用户输入框输入内容
  2. 点击回车
  3. 列表增加输入的内容 
`, () => {
  const wrapper = mount(<Provider store={store}><TodoList /></Provider> )
  const inputElem = wrapper.find("[data-test='header-input']")
  const value = 'test'
  inputElem.simulate('change', {
    target: {
      value
    }
  })

  inputElem.simulate('keyUp', {
    keyCode: 13
  })

  const listItem = wrapper.find("[data-test='undolist-item']")
  expect(listItem.length).toEqual(1)
  expect(listItem.text()).toContain(value)


})










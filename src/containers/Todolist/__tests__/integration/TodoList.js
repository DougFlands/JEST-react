import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import store from '../../../../store/createStore'
import TodoList from '../../index'
import axios from '../../__mocks__/axios'


beforeEach(() => {
  axios.success = true
})

it(`
  1. 用户输入框输入内容
  2. 点击回车
  3. 列表增加输入的内容 
`, () => {
  const wrapper = mount(<Provider store={store}><TodoList /></Provider>)
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

it(`
  用户打开页面应该展示接收的数据 
`, (done) => {
  const wrapper = mount(<Provider store={store}><TodoList /></Provider>)
  process.nextTick(() => {
    wrapper.update()
    const listItem = wrapper.find("[data-test='undolist-item']")
    expect(listItem.length).toEqual(2)
    done()
  })
})

it(`
  用户打开页面，请求不正常，页面正常展示
`, (done) => {
  axios.success = false
  const wrapper = mount(<Provider store={store}><TodoList /></Provider>)
  process.nextTick(() => {
    wrapper.update()
    const listItem = wrapper.find("[data-test='undolist-item']")
    expect(listItem.length).toEqual(0)
    done()
  })
})






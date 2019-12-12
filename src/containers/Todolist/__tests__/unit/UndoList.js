import React from 'react';
import { shallow } from 'enzyme';
import Undolist from '../../components/Undolist'

describe('UndoList 组件', () => {

  it('数组为空时，count 为0', () => {
    const wrapper = shallow(<Undolist />)
    const countElem = wrapper.find("[data-test='count']")
    const listItem = wrapper.find("[data-test='undolist-item']")
    expect(countElem.text()).toEqual('0')
    expect(listItem.length).toBe(0)
  })

  it('数组不为空时，count 为列表长度，列表不为空', () => {
    const listData = [
      {
        type: 'div',
        value: '12'
      }
    ]
    const wrapper = shallow(<Undolist list={listData} />)
    const countElem = wrapper.find("[data-test='count']")
    const listItem = wrapper.find("[data-test='undolist-item']")
    expect(countElem.text()).toEqual('1')
    expect(listItem.length).toBe(1)
  })

  it('列表有数据，存在删除按钮', () => {
    const listData = [
      {
        type: 'div',
        value: '12'
      }
    ]
    const wrapper = shallow(<Undolist list={listData} />)
    const deleteItem = wrapper.find("[data-test='undoDelete-btn']")
    expect(deleteItem.length).toBe(1)
  })

  it('点击删除按钮，调用删除方法', () => {
    const listData = [
      {
        type: 'div',
        value: '12'
      }
    ]
    const fn = jest.fn()
    const wrapper = shallow(<Undolist list={listData} deleteItem={fn} />)
    const deleteItem = wrapper.find("[data-test='undoDelete-btn']")
    deleteItem.at(0).simulate('click')
    expect(fn).toHaveBeenCalledWith(0)
  })

  it('某一项被点击时，触发 changeStatus 方法', () => {
    const listData = [
      {
        type: 'div',
        value: '12'
      }
    ]
    const fn = jest.fn()
    const wrapper = shallow(<Undolist list={listData} changeStatus={fn} />)
    const listItem = wrapper.find("[data-test='undolist-item']")
    listItem.at(0).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(0, "input")
  })

  it('某一项是Input时为输入框', () => {
    const listData = [
      {
        type: 'input',
        value: '12'
      }
    ]
    const wrapper = shallow(<Undolist list={listData} />)
    const listItem = wrapper.find("[data-test='undolist-item-input']")
    expect(listItem.length).toBe(1)
  })

  it('Input 失去焦点时触发 changeStatus', () => {
    const listData = [
      {
        type: 'input',
        value: '12'
      }
    ]
    const fn = jest.fn()
    const wrapper = shallow(<Undolist list={listData} changeStatus={fn} />)
    const listItem = wrapper.find("[data-test='undolist-item-input']")
    listItem.at(0).simulate('blur')
    expect(fn).toHaveBeenLastCalledWith(0, "div")
  })

  it('Input 输入变更时，触发 changeValue', () => {
    const listData = [
      {
        type: 'input',
        value: '12'
      }
    ]
    const fn = jest.fn()
    const wrapper = shallow(<Undolist list={listData} changeValue={fn}/>)
    const listItem = wrapper.find("[data-test='undolist-item-input']")
    listItem.at(0).simulate('change', {
      target: {
        value: '123'
      }
    })
    expect(fn).toHaveBeenCalledWith(0, '123')
  })


})



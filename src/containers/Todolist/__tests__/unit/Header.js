import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header'


describe('Header 组件', () => {
  it('样式渲染正常', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  })

  it('组件包含 input', () => {
    const wrapper = shallow(<Header />)
    const inputElem = wrapper.find("[data-test='input']")
    expect(inputElem.length).toBe(1)
  })

  it('input 初始化内容为空', () => {
    const wrapper = shallow(<Header />)
    const inputElem = wrapper.find("[data-test='input']")
    // 对Input做的测试，所以是prop
    expect(inputElem.prop('value')).toEqual('')
  })

  it('input 用户输入时会跟随变化', () => {
    const wrapper = shallow(<Header />)
    const inputElem = wrapper.find("[data-test='input']")
    inputElem.simulate('change', {
      target: {
        value: 'test'
      }
    })
    expect(wrapper.state('value')).toEqual('test')
    const newInputElem = wrapper.find("[data-test='input']")
    expect(newInputElem.prop('value')).toEqual('test')
  })

  it('input 用户输入回车时，无内容则无操作', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = wrapper.find("[data-test='input']")
    wrapper.setState({ value: '' })
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).not.toHaveBeenCalled()
    expect(wrapper.state('value')).toEqual('')
  })

  it('input 用户输入回车时，有内容则传出，并清除', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = wrapper.find("[data-test='input']")
    wrapper.setState({ value: 'test' })
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).toHaveBeenCalled()
    expect(wrapper.state('value')).toEqual('')
    // 最后一次调用时的参数
    expect(fn).toHaveBeenLastCalledWith({ "type": "div", "value": "test" })
  })


})



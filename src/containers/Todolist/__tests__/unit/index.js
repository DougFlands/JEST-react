import React from 'react';
import { shallow } from 'enzyme';
import Index from '../../index'

describe('todolist 组件', () => {

  it('list 初始化列表为空', () => {
    const wrapper = shallow(<Index />)
    expect(wrapper.state('undoList')).toEqual([])
  })

  it('给header传递一个增加undoList的方法', () => {
    const wrapper = shallow(<Index />)
    const Header = wrapper.find('Header')
    // 这种测试不能在代码中写 addUndoItem={this.addUndoItem.bind(this)}
    expect(Header.prop('addUndoItem')).toBeTruthy()
  })

  it('addUndoItem时，list新增一条内容', () => {
    const data = {
      type: 'div',
      value: '123'
    }
    const wrapper = shallow(<Index />)
    wrapper.instance().addUndoItem(data)
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toEqual(data)
  })

  it('给未完成列表传递 undoList、deleteItem, changeStatus, changeValue', () => {
    const wrapper = shallow(<Index />)
    const Undolist = wrapper.find('Undolist')
    expect(Undolist.prop('list')).toBeTruthy()
    expect(Undolist.prop('deleteItem')).toBeTruthy()
    expect(Undolist.prop('changeStatus')).toBeTruthy()
    expect(Undolist.prop('changeValue')).toBeTruthy()
  })

  it('触发删除方法，删除列表的数据', () => {
    const data = {
      type: 'div',
      value: '123'
    }
    const wrapper = shallow(<Index />)
    wrapper.setState({
      undoList: [data]
    })
    wrapper.instance().deleteUndoItem(0)
    expect(wrapper.state('undoList').length).toBe(0)
  })

  it('触发 changeStatus 方法，更改列表的数据', () => {
    let data = {
      type: 'div',
      value: '123'
    }
    const wrapper = shallow(<Index />)
    wrapper.setState({
      undoList: [data]
    })
    wrapper.instance().changeStatus(0, 'input')
    expect(wrapper.state('undoList')[0]).toEqual(
      {
        type: 'input',
        value: '123'
      }
    )

    data = {
      type: 'input',
      value: '123'
    }
    wrapper.setState({
      undoList: [data]
    })
    wrapper.instance().changeStatus(0, 'div')
    expect(wrapper.state('undoList')[0]).toEqual(
      {
        type: 'div',
        value: '123'
      }
    )
  })

  it('触发 changeValue 方法，更改列表的数据', () => {
    let data = {
      type: 'input',
      value: '123'
    }
    const wrapper = shallow(<Index />)
    wrapper.setState({
      undoList: [data]
    })
    wrapper.instance().changeValue(0, '111')
    expect(wrapper.state('undoList')[0]).toEqual(
      {
        type: 'input',
        value: '111'
      }
    )
  })

})

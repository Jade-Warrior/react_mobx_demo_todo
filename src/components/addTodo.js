import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject('todo')
@observer
class AddTodo extends Component {
  // 添加任务
  addTodo (event) {
    // React里面的事件并不是真实的DOM事件，而是自己在原生DOM事件上进行了封装与合成。
    // 合成事件是由事件池来管理的，合成事件对象可能会被重用，合成事件的所有属性也会随之被清空。
    // 所以当在异步处理程序（如setTimeout等等）中或者浏览器控制台中去访问合成事件的属性，默认react 会把其属性全部设为null
    // event.persist()将当前的合成事件从事件池中移除了，所以能够继续保有对该事件的引用以及仍然能访问该事件的属性
    event.persist();
    console.log('event', event)
    const { todoAdd } = this.props.todo;
    // 判断用户敲击的是否是回车键
    if (event.key === 'Enter') {
      // 获取用户在文本框中输入的内容
      const taskName = event.target.value;
      // 判断用户在文本框中是否输入了内容
      if (taskName.trim().length === 0) {
        // 阻止程序向下执行
        return;
      }
      // 将任务添加到任务列表数组中
      todoAdd (taskName);
      // 清空文本框中的内容
      event.target.value = '';
    }

  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input onKeyUp={this.addTodo.bind(this)} className="new-todo" placeholder="What needs to be done?" />
      </header>
    );
  }
}

export default AddTodo;

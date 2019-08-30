import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import bridge from './bridge';
import Layout from './component/layout';
import ToDoList from './component/todo-list';
import ToDoDetail from './component/todo-detail';

class App extends React.Component {
  render() {
    return (
      <Layout sidebar={<ToDoList />}>
        <ToDoDetail />
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

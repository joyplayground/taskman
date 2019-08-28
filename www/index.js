import React from 'react';
import ReactDOM from 'react-dom';
import bridge from './bridge';

function TODO(props) {
  return (
    <div>
      <p>{props.content}</p>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      content: ''
    };

    this.todoService = bridge.getService('todo');

    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  async componentDidMount() {
    const rows = await this.todoService.getToDoList();
    this.setState({
      todos: rows.map(row => {
        return {
          content: row.content,
          createTime: new Date(row.createTime)
        };
      })
    });
  }
  handleInput(e) {
    this.setState({
      content: e.target.value.trim()
    });
  }
  async handleKeyPress(e) {
    if (!this.state.content) {
      return;
    }
    if (e.key === 'Enter') {
      await this.todoService.newToDo({
        content: this.state.content
      });

      this.setState(state => {
        const todos = state.todos.concat({ content: this.state.content });
        return {
          todos,
          content: ''
        };
      });
    }
  }
  render() {
    return (
      <div class="todo">
        <div className="new-todo">
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleInput}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="todo-list">
          {this.state.todos.map(item => {
            return <TODO {...item} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

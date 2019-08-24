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
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    bridge
      .request('store', 'query', {
        sql: `select * from todos;`
      })
      .then(rows => {
        console.log('row', rows);
        this.setState({
          todos: rows.map(row => {
            return {
              content: row.content,
              createTime: new Date(row.createTime)
            };
          })
        });
      });
  }
  handleInput(e) {
    this.setState({
      content: e.target.value.trim()
    });
  }
  handleKeyPress(e) {
    if (!this.state.content) {
      return;
    }
    if (e.key === 'Enter') {
      bridge.request('store', 'query', {
        sql: `insert into todos 
            (content, createTime)
          values
            ($content, $createTime);`,
        params: {
          $content: this.state.content,
          $createTime: new Date()
        }
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

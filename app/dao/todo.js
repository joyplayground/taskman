const bridge = require('../bridge');
const db = require('./db');

module.exports = {
  async newToDo(todo) {
    if (!todo.content) {
      throw new Error('content should not be empty!');
    }

    const sql =
      'insert into todos (content, tag, createTime, isFinished) values ($content, $tag, $createTime, $isFinished);';
    const { lastID } = await db.update(sql, {
      $content: todo.content,
      $tag: todo.tag,
      $createTime: new Date(),
      $isFinished: 0
    });

    todo.id = lastID;
    console.log('new todo', todo);
    return todo;
  },
  async finishToDo(todo) {
    if (!todo.id) {
      throw new Error('id should not be empty!');
    }

    const sql =
      'update todos set isFinished = 1, finishedTime = $time where id = $id;';
    const { changes } = await db.update(sql, {
      $time: new Date(),
      $id: todo.id
    });
  },
  async getToDoList() {
    const sql = 'select * from todos;';
    const rows = await db.query(sql);
    return rows;
  }
};

bridge.addService('todo', module.exports);

const sqlite3 = require('sqlite3');
const config = require('../config');

const dbPath = config.getDBPath();
let db;

function openDB(mode) {
  console.log('openDB');
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath, mode, async error => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });
}

// 确保数据库创建成功
async function ensureDB() {
  if (db) {
    return db;
  }

  db = await openDB(sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
  await ensureTable();
}

async function ensureTable() {
  const tables = await query(
    `SELECT tbl_name FROM sqlite_master WHERE type = 'table' and tbl_name = 'todos';`
  );
  console.log('tables', tables);
  if (!tables.length) {
    console.log('create todos');
    await update(
      `CREATE TABLE todos (
        id INTEGER PRIMARY KEY,
        content TEXT,
        tag TEXT,
        createTime TEXT,
        isFinished INT,
        finishTime TEXT
      );`
    );
    console.log('create todos done');
  }
}

async function update(sql, params) {
  console.log(sql);
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve({
          lastID: this.lastID,
          changes: this.changes
        });
      }
    });
  });
}

async function query(sql, params) {
  console.log(sql);
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

let _promise;
exports.init = () => {
  if (!_promise) {
    _promise = ensureDB();
  }
  return _promise;
};
exports.destroy = async () => {
  const db = await dbpromise;
  db.close();
};
exports.query = query;
exports.update = update;

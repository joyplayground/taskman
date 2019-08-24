const sqlite3 = require('sqlite3');
const utils = require('../');
const bridge = require('../bridge');

const dbPath = utils.getDBPath();

function openDB(mode) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, mode, async error => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });
}

// 打开数据库，如果没有的话，会新建一个
async function ensureDB() {
  if (ensureDB.rwdb) {
    return ensureDB.rwdb;
  }

  // 初始化权限比较高
  const db = await openDB(sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
  await ensureTable(db);
  db.close();
  // 初始化读写权限
  ensureDB.rwdb = await openDB(sqlite3.OPEN_READWRITE);
  return ensureDB.rwdb;
}

function update(db, sql, params) {
  console.log('sql:', sql);
  console.log('params:', params);
  return new Promise((resolve, reject) => {
    db.run(sql, params, (error, row) => {
      console.log('row:', row);
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function query(db, sql, params) {
  console.log('sql:', sql);
  console.log('params:', params);
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      console.log('row:', rows);
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

process.on('exit', async () => {
  const db = await ensureDB();
  db.close();
});

async function ensureTable(db) {
  const tables = await query(
    db,
    `SELECT tbl_name FROM sqlite_master WHERE type = 'table' and tbl_name = 'todos';`
  );
  if (!tables || !tables.length) {
    await update(
      db,
      `CREATE TABLE todos (
        id UNSIGNED BIG INT PRIMARY KEY,
        content TEXT,
        createTime TEXT,
        finishTime TEXT
      );`
    );
  }
}

module.exports = {
  async query({ sql, params }) {
    const db = await ensureDB();
    const row = await query(db, sql, params);
    return row;
  },
  async update({ sql, params }) {
    const db = await ensureDB();
    const row = await update(db, sql, params);
    return row;
  }
};

bridge.addService('store', module.exports);

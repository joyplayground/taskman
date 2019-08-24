const sqlite3 = require('sqlite3');
const utils = require('../');
const bridge = require('../bridge');

const dbPath = utils.getDBPath();

module.exports = {
  initDB() {
    return new Promise((resolve, reject) => {
      new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }
};

bridge.addService('store', module.exports);

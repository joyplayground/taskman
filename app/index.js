const path = require('path');
const fs = require('fs');
const { app } = require('electron');

module.exports = {
  getDBPath() {
    return path.join(this.getUserDataPath(), 'task_db');
  },
  getUserDataPath() {
    return app.getPath('userData');
  }
};

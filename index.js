const { BrowserWindow, app } = require('electron');
const db = require('./service/dao/db');
const todo = require('./service/dao/todo');

// 开始初始化数据库
db.init();

let mainWindow;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: false
    }
  });
  mainWindow.once('closed', () => {
    mainWindow = null;
  });
  mainWindow.loadURL(`file://${__dirname}/www-dist/index.html`);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (mainWindow === null) {
    createMainWindow();
  }
});

app.once('will-quit', () => {
  // 数据库链接关闭
  db.destroy();
});

app.once('ready', async () => {
  await db.init();
  createMainWindow();
});

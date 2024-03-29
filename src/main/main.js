const { app, BrowserWindow, MessageChannelMain, ipcMain } = require('electron')
const path = require('path')
const { initDBWoker } = require('./db-worker')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit()
}
require('./app-appearence').initAppMenu()

const createWindow = async () => {
    let dbWorker = await initDBWoker()

    ipcMain.on('ipc-channel', (event) => {
        // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
        // MessagePortMain.
        let port = event.ports[0]
        dbWorker.webContents.postMessage('ipc-channel', null, [port])
    })

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // eslint-disable-next-line no-undef
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    })

    // and load the index.html of the app.
    // eslint-disable-next-line no-undef
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'right' })

    console.log('ready to show init success')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
console.log(process.versions)

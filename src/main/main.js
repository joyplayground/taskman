const { app, BrowserWindow, MessageChannelMain } = require('electron')
const path = require('path')
const { initDBWoker } = require('./db-worker')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit()
}
require('./app-appearence').initAppMenu()
const createWindow = async () => {
    const dbWorker = await initDBWoker()
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    })

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // 在这里我们不能使用 ipcMain.handle() , 因为回复需要传输
    // MessagePort.
    // Listen for message sent from the top-level frame
    mainWindow.webContents.mainFrame.on('request-worker-channel', (event) => {
        // Create a new channel ...
        const { port1, port2 } = new MessageChannelMain()
        // ... send one end to the worker ...
        dbWorker.webContents.postMessage('new-client', null, [port1])
        // ... and the other end to the main window.
        event.senderFrame.postMessage('provide-worker-channel', null, [port2])
        // Now the main window and the worker can communicate with each other
        // without going through the main process!
    })
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

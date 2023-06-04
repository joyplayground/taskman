const { BrowserWindow } = require('electron')

async function initDBWoker(port) {
    const dbWorker = new BrowserWindow({
        show: true,
        webPreferences: {
            preload: DB_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    })
    dbWorker.on('ready-to-show', () => {
        console.log('ready to show init success 1 ')
        dbWorker.webContents.postMessage('port', null, [port])
    })
    await dbWorker.loadURL(DB_WINDOW_WEBPACK_ENTRY)
    dbWorker.webContents.openDevTools({ mode: 'right' })
    return dbWorker
}

module.exports.initDBWoker = initDBWoker

const { BrowserWindow } = require('electron')

async function initDBWoker() {
    const dbWorker = new BrowserWindow({
        show: true,
        webPreferences: {
            preload: DB_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    })
    dbWorker.loadURL(DB_WINDOW_WEBPACK_ENTRY)
    dbWorker.webContents.openDevTools({ mode: 'right' })
    return dbWorker
}

module.exports.initDBWoker = initDBWoker

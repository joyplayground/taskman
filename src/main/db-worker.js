const { BrowserWindow } = require('electron')

async function initDBWoker() {
    const dbworker = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: DB_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    })
    await dbworker.loadURL(DB_WINDOW_WEBPACK_ENTRY)
    return dbworker
}

module.exports.initDBWoker = initDBWoker

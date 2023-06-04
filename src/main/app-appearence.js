const { Menu, MenuItem, app } = require('electron')

function initAppMenu() {
    Menu.setApplicationMenu(null)
}

module.exports.initAppMenu = initAppMenu

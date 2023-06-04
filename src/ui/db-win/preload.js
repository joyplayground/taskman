const { ipcRenderer } = require('electron')

ipcRenderer.on('port', (e) => {
    // port received, make it globally available.
    const electronMessagePort = e.ports[0]
    electronMessagePort.onmessage = (messageEvent) => {
        // handle message
        console.log('db thread: ' + messageEvent.data)
    }
})

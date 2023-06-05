const { ipcRenderer, contextBridge } = require('electron')

ipcRenderer.on('ipc-channel', (e) => {
    // port received, make it globally available.
    const electronMessagePort = e.ports[0]
    console.log('electronMessagePort', electronMessagePort)
    contextBridge.exposeInMainWorld('electronMessagePort', e.ports[0])
    electronMessagePort.onmessage = (messageEvent) => {
        // handle message
        console.log('db thread: ' + messageEvent.data)
    }
    electronMessagePort.on('close', () => {
        console.log('the other end cose')
    })
    ipcRenderer.send('ipc-channel-db-worker-ready')
})

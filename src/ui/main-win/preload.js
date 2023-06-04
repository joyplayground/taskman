const { ipcRenderer } = require('electron')

let port
ipcRenderer.on('port', (e) => {
    // port received, make it globally available.
    console.log('port ', e)
    port = e.ports[0]
    port.onmessage = (messageEvent) => {
        // handle message
        console.log('main thread: ' + messageEvent)
    }
})
setTimeout(() => {
    port.postMessage('hello world!')
}, 3000)

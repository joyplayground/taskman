const { ipcRenderer, contextBridge } = require('electron')

const channel = new MessageChannel()

ipcRenderer.postMessage('ipc-channel', null, [channel.port1])

setTimeout(() => {
    channel.port2.postMessage('hello world!55')
}, 3000)

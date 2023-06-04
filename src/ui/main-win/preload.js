// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer } = require('electron')

// We request that the main process sends us a channel we can use to
// communicate with the worker.
ipcRenderer.send('request-worker-channel')

ipcRenderer.once('provide-worker-channel', (event) => {
    // 一旦收到回复, 我们可以这样做...
    const [port] = event.ports
    // ... 注册一个接收结果处理器 ...
    port.onmessage = (event) => {
        console.log('received result:', event.data)
    }
    // ... 并开始发送消息给 work!
    port.postMessage(21)
})

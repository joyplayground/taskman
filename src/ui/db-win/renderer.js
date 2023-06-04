const { ipcRenderer } = require('electron')

const doWork = (input) => {
    // Something cpu-intensive.
    return input * 2
}

// 我们可能会得到多个 clients, 比如有多个 windows,
// 或者假如 main window 重新加载了.
ipcRenderer.on('new-client', (event) => {
    const [port] = event.ports
    port.onmessage = (event) => {
        // 事件数据可以是任何可序列化的对象 (事件甚至可以
        // 携带其他 MessagePorts 对象!)
        const result = doWork(event.data)
        port.postMessage(result)
    }
})

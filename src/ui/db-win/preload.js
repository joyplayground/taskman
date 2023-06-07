const { ipcRenderer } = require('electron')

const context = {
    serviceHolder: {},
    regService: (url, handler) => {
        if (!url) {
            throw new Error('url can not be empty')
        }
        if (context.serviceHolder[url]) {
            throw new Error('url was already used!')
        }
        context.serviceHolder[url] = handler
    },
}

context.regService('/service/hb', () => {
    return 1
})

async function handleMessage({ port, data }) {
    if (!data || !data.url || !data.transactionID) {
        return
    }
    const handler = context.serviceHolder[data.url]
    if (!handler) {
        port.postMessage({
            transactionID: data.transactionID,
            status: false,
            message: `there no service name ${data.url}, please check`,
        })
        return
    }
    try {
        const resp = await handler(data.payload)
        port.postMessage({
            transactionID: data.transactionID,
            status: true,
            data: resp,
        })
    } catch (e) {
        port.postMessage({
            transactionID: data.transactionID,
            status: false,
            message: `there no service name ${data.url}, please check`,
        })
    }
}

ipcRenderer.on('ipc-channel', (e) => {
    // port received, make it globally available.
    const port = e.ports[0]
    context.__port = port
    port.onmessage = async (e) => {
        handleMessage({ port: port, data: e.data })
    }
    port.onclose = () => {
        console.warn(
            'ui window close port, do nothing just wait new connection'
        )
    }
    // 发送建联成功信号
    port.postMessage('__ready__')
})

const { ipcRenderer, contextBridge } = require('electron')

const CONNECT_SERVICE_TIMEOUT_MS = 5 * 1000
const TRANSACTION_TIMEOUT_MS = 5 * 1000
let __transaction_id = 1

const context = {
    __port: null,
    __connect_promise: null,
    connectService: () => {
        if (context.__port) {
            return Promise.resolve(context.__port)
        }
        if (context.__connect_promise) {
            return context.__connect_promise
        }
        context.__connect_promise = connectService()
        return context.__connect_promise
    },
    requestHolder: {},
    request: (url, payload, timeout) => {
        let transactionID = `${__transaction_id++}`
        return new Promise(async (resolve, reject) => {
            context.requestHolder[transactionID] = (resp) => {
                resolve(resp)
            }
            if (isNaN(timeout) || timeout <= 0) {
                timeout = TRANSACTION_TIMEOUT_MS
            }
            setTimeout(() => {
                delete context.requestHolder[transactionID]
                reject(
                    new Error(
                        `call service tiemout, over ${TRANSACTION_TIMEOUT_MS}ms`
                    )
                )
            }, timeout)
            await context.connectService()
            context.__port.postMessage({
                transactionID,
                url,
                payload,
            })
        })
    },
}

function handleMessage(data) {
    const callback = context.requestHolder[data.transactionID]
    delete context.requestHolder[data.transactionID]

    if (callback) {
        callback.call(null, data.data)
    } else {
        console.warn(
            `no callback found for transactionID:${data.transactionID}`
        )
    }
}

function connectService() {
    return new Promise((resolve, reject) => {
        const channel = new MessageChannel()
        channel.port1.onclose = () => {
            console.warn('service message port is closed!')
            context.__port = null
        }
        channel.port1.onmessage = (e) => {
            if (e.data === '__ready__') {
                console.log('connect service success')
                context.__port = channel.port1
                resolve(channel.port1)
                return
            }
            handleMessage(e.data)
        }
        // 一般遇到序列化问题时会出这个错误
        channel.port1.onmessageerror = (e) => {
            reject(new Error(e.data))
        }
        ipcRenderer.postMessage('ipc-channel', null, [channel.port2])

        setTimeout(() => {
            reject(
                new Error(
                    `connect service timeout over ${CONNECT_SERVICE_TIMEOUT_MS}ms`
                )
            )
        }, CONNECT_SERVICE_TIMEOUT_MS)
    })
}

context.connectService()
contextBridge.exposeInMainWorld('__service__', {
    request: context.request,
})

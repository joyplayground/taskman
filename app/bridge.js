// 管理注册所有的 api
const { ipcMain } = require('electron');

const service_list = {};
const TaskManBridgeRequest = 'taskman_bridge_request';
const TaskManBridgeResponse = 'taskman_bridge_response';
const ResponseStatus = {
  BAD_REQUEST: -1,
  API_NOT_FOUND: 1,
  FAIL: 2,
  SUCC: 0
};

ipcMain.on(TaskManBridgeRequest, async (evt, request) => {
  if (!request || !request.service || !request.method) {
    evt.reply(TaskManBridgeResponse, {
      status: ResponseStatus.BAD_REQUEST,
      responseId: request.requestId
    });
    return;
  }

  const service = service_list[request.service];
  console.log('service', service, request.method);
  let payload = null;
  if (request.payload) {
    try {
      payload = JSON.parse(request.payload);
    } catch (e) {
      payload = request.payload;
    }
  }

  if (!service[request.method]) {
    evt.reply(TaskManBridgeResponse, {
      status: ResponseStatus.API_NOT_FOUND,
      responseId: request.requestId
    });
    return;
  }

  try {
    console.log('ret', payload);
    const ret = await service[request.method].call(service, payload);
    console.log('ret', ret);
    let data = JSON.stringify(ret);
    evt.reply(TaskManBridgeResponse, {
      status: ResponseStatus.SUCC,
      payload: data,
      responseId: request.requestId
    });
  } catch (e) {
    evt.reply(TaskManBridgeResponse, {
      status: ResponseStatus.FAIL,
      error: e && e.message,
      responseId: request.requestId
    });
  }
});

module.exports = {
  addService(url, service) {
    if (!url) {
      throw new Error('url must not be empty');
    }
    service_list[url] = service;
  }
};

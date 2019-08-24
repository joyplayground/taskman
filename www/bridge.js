import { ipcRenderer, webFrame } from 'electron';

const TaskManBridgeRequest = 'taskman_bridge_request';
const TaskManBridgeResponse = 'taskman_bridge_response';

const ResponseStatus = {
  BAD_REQUEST: -1,
  API_NOT_FOUND: 1,
  FAIL: 2,
  SUCC: 0,
  TIMEOUT: 3
};

const request_callback_queue = {};

const uid = webFrame.routingId;
let seq = 1;

function getRequestId() {
  return `bridge_request_${uid}_${seq++}`;
}

ipcRenderer.on(TaskManBridgeResponse, (evt, response) => {
  console.log(arguments);
  const responseId = response.responseId;
  const handle = request_callback_queue[responseId];
  delete request_callback_queue[responseId];

  if (handle) {
    handle(response);
  } else {
    console.warn('callback not found');
  }
});

export default {
  request(service, method, payload, timeout = 3000) {
    return new Promise((resove, reject) => {
      setTimeout(() => {
        reject({
          status: ResponseStatus.TIMEOUT
        });
      }, timeout);

      const requestId = getRequestId();
      const requestMessage = {
        service,
        method,
        payload,
        requestId
      };

      request_callback_queue[requestId] = response => {
        const { status, payload } = response;
        if (status !== ResponseStatus.SUCC) {
          reject(response);
        } else {
          let data;
          if (payload) {
            try {
              data = JSON.parse(payload);
            } catch (e) {
              data = payload;
            }
          }

          resove(data);
        }
      };

      ipcRenderer.send(TaskManBridgeRequest, requestMessage);
    });
  }
};

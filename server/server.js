const WebSocket = require("ws");
const uuidv4 = require("uuid/v4");

const wss = new WebSocket.Server({ port: 8080 });

let devices = new Map();
let devicesWS = new Map();
let webs = new Map();

const broadcast = (socketMap, event, data) => {
  console.log("Broadcasting", data);
  for (let [id, ws] of socketMap) {
    ws.send(JSON.stringify({ event: event, data: data }));
  }
};

const addDevice = (ws, req) => {
  let device = {
    ip: req.connection.remoteAddress,
    name: req.headers.name,
    desc: req.headers.desc,
    scripts: JSON.parse(req.headers.scripts),
    id: uuidv4()
  };

  console.log("Device: " + device.id);

  devices.set(device.id, device);
  devicesWS.set(device.id, ws);

  ws.on("message", msg => {
    const scriptRes = JSON.parse(msg);
    console.log(scriptRes);
    broadcast(webs, "script_update", {
      id: device.id,
      scriptNb: scriptRes.scriptNb,
      returnCode: scriptRes.returnCode
    });
  });

  ws.on("close", ws => {
    console.log("delete device");
    devices.delete(device.id);
    broadcast(webs, "delete_device", device);
  });
  broadcast(webs, "add_device", device);
};

const addWebClient = (ws, req) => {
  const id = uuidv4(); // assign a unique id to each client
  console.log("Web: " + id);

  webs.set(id, ws);

  ws.on("close", ws => {
    console.log("Removing web " + id);
    webs.delete(id);
  });

  ws.on("message", msg => {
    const scriptOrder = JSON.parse(msg);
    console.log(scriptOrder, typeof scriptOrder.data, scriptOrder.data.id);

    const deviceWS = devicesWS.get(scriptOrder.data.id);
    deviceWS.send(scriptOrder.data.scriptNb);
  });

  for (let [id, device] of devices) {
    ws.send(
      JSON.stringify({
        event: "add_device",
        data: {
          id: device.id,
          ip: device.ip,
          desc: device.desc,
          scripts: device.scripts,
          name: device.name
        }
      })
    );
  }
};

wss.on("connection", function connection(ws, req) {
  req.headers.type === "device" ? addDevice(ws, req) : addWebClient(ws, req);
});

console.log("Server started on port 8080...");

/*
{
    type: 'web', 'device'

}
*/

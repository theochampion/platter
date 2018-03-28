const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const wss = new WebSocket.Server({ port: 8080 });

let devices = new Map()
let devicesWS = new Map()
let webs = new Map()


const broadcast = (socketMap, payload) => {
    console.log("Broadcasting", payload)
    for (let [id, ws] of socketMap) {
        ws.send(JSON.stringify(payload))
    };
}

const addDevice = (ws, req) => {

    let device = {
        status: 'online',
        ip: req.connection.remoteAddress,
        name: req.headers.name,
        desc: req.headers.desc,
        id: uuidv4()
    }

    console.log("Device: " + device.id)

    devices.set(device.id, device)
    devicesWS.set(device.id, ws)


    ws.on('close', ws => {
        console.log("delete device")
        devices.delete(device.id)
        device.status = 'offline'
        broadcast(webs, device)
    });
    broadcast(webs, device)
}

const addWebClient = (ws, req) => {
    const id = uuidv4(); // assign a unique id to each client
    console.log("Web: " + id)

    webs.set(id, ws)

    ws.on('close', ws => {
        console.log("Removing web " + id);
        webs.delete(id)
    });

    ws.on('message', msg => {
        const scriptOrder = JSON.parse(msg)
        console.log(scriptOrder)

        const deviceWS = devicesWS.get(scriptOrder.id)
        deviceWS.send(scriptOrder.script)

    })
    for (let [id, device] of devices) {
        ws.send(JSON.stringify({
            status: device.status,
            id: device.id,
            ip: device.ip,
            desc: device.desc,
            name: device.name
        }))
    }
}

wss.on('connection', function connection(ws, req) {
    req.headers.type === 'device' ? addDevice(ws, req) : addWebClient(ws, req)
});



console.log("Server started on port 8080...")


/*
{
    type: 'web', 'device'

}
*/
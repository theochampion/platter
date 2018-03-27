const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const wss = new WebSocket.Server({ port: 8080 });

let devices = new Map()
let webs = new Map()


const addDevice = (ws, req) => {
    const id = uuidv4(); // assign a unique id to each client
    console.log("Device: " + id)

    const device = {
        ws: ws,
        ip: req.connection.remoteAddress,
        name: req.headers.name
    }
    devices.set(id, ws)

    ws.on('close', ws => {
        console.log("Removing device " + id);
        devices.delete(id)
    });
    for (let [id, ws] of webs) {
        console.log("Sending " + JSON.stringify({
            ip: req.connection.remoteAddress,
            name: req.headers.name
        }))
    }
    //signal webs
}

const addWeb = (ws, req) => {
    const id = uuidv4(); // assign a unique id to each client
    console.log("Web: " + id)

    webs.set(id, ws)

    ws.on('close', ws => {
        console.log("Removing web " + id);
        webs.delete(id)
    });
}

wss.on('connection', function connection(ws, req) {

    req.headers.type === 'device' ? addDevice(ws, req) : addWeb(ws, req)
});



console.log("Server started on port 8080")


/*
{
    type: 'web', 'device'

}
*/
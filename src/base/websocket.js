const { createServer } = require("node:http");
const { Server } = require("socket.io");

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

const wsPort = process.env.WSPORT || 3001;

function start() {
    return new Promise((resolve, reject) => {
        try {
            server.listen(wsPort, (...params) => resolve([`Websocket: Opened at ws://localhost:${wsPort}`, ...params]));
        } catch (err) {
            reject(err);
        }
    });
}

function emitGesture(gesture) {
    io.emit("gesture", gesture);
}

function emitDebug(gesture) {
    io.emit("debug", gesture);
}

module.exports = { start, emitGesture, emitDebug };

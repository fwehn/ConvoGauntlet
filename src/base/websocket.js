const {createServer} = require('node:http');
const {Server} = require('socket.io');

const server = createServer();
const io = new Server(server, {cors: {origin: "*"}});

const wsPort = process.env.WSPORT || 3001;

server.listen(wsPort, () => {
	console.log(`Websocket connection available at ws://localhost:${wsPort}`);
});

function emitGesture(gesture) {
	io.emit('gesture', gesture);
}

function emitDebug(gesture) {
	io.emit('debug', gesture);
}

module.exports = {emitGesture, emitDebug};

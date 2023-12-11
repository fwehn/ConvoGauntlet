const {createServer} = require('node:http');
const {Server} = require('socket.io');

const server = createServer();
const io = new Server(server, {cors: {origin: "*"}});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

function emitGesture(gesture) {
    io.emit('gesture', gesture);
}

function emitDebug(gesture) {
    io.emit('debug', gesture);
}

module.exports = {emitGesture, emitDebug};
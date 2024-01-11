const satelliteAdapter = require("./satelliteAdapter");
const gestureizer = require("./gestureizer");
const rest = require("./rest");
const websocket = require("./websocket");

satelliteAdapter.onData(gestureizer.read);

gestureizer.onGesture(websocket.emitGesture);
gestureizer.onDebug(websocket.emitDebug);

const satelliteAdapter = require("./satelliteAdapter");
const gestureizer = require("./gestureizer");
const rest = require("./rest");
const websocket = require("./websocket");
const fileHandler = require("./fileHandler");

Promise.all([satelliteAdapter.start(), websocket.start(), rest.start()])
    .then((messages) => {
        // eslint-disable-next-line no-console
        messages.map((message) => console.log(message[0]));
        satelliteAdapter.onData(gestureizer.analyze);
        gestureizer.onGesture(websocket.emitGesture);
        gestureizer.onDebug((gesture) => {
            websocket.emitDebug(gesture);
            // eslint-disable-next-line no-console
            console.log(gesture, (fileHandler.readConfigFile()[gesture] || "Unknown Gesture"));
        });
    })
    // eslint-disable-next-line no-console
    .catch(console.error);

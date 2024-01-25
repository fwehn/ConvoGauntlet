const satelliteAdapter = require("./satelliteAdapter");
const gestureizer = require("./gestureizer");
const rest = require("./rest");
const websocket = require("./websocket");
const fileHandler = require("./fileHandler");
const ttsAdapter = require("./ttsAdapter");

let busy = false;

Promise.all([satelliteAdapter.start(), websocket.start(), rest.start()])
    .then((messages) => {
        // eslint-disable-next-line no-console
        messages.map((message) => console.log(message[0]));
        satelliteAdapter.onData(gestureizer.analyze);
        gestureizer.onGesture((gesture) => {
            websocket.emitDebug(gesture);

            if (!busy && fileHandler.readConfigFile("gestures")[gesture]) {
                busy = true;
                ttsAdapter.sayText(fileHandler.readConfigFile("gestures")[gesture])
                    // eslint-disable-next-line no-console
                    .catch(console.error)
                    .finally(() => busy = false);
            }
        });
    })
    // eslint-disable-next-line no-console
    .catch(console.error);

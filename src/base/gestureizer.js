const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();

let lastGesture = "";
let timeout;

// TODO rename this shit
function read(data) {
    let currentGesture =
        data["f"].reduce((carry, value) => carry + readFlexSensor(value), "") +
        "_" +
        readAccelerometerAndGyroscope(...data["a"], ...data["g"]);

    eventEmitter.emit("debug", currentGesture);

    if (currentGesture !== lastGesture) {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            eventEmitter.emit("gesture", currentGesture);
            lastGesture = "";
        }, 3000); // TODO make this time customizable

        lastGesture = currentGesture;
    }
}

// TODO assign values to Letters
// eslint-disable-next-line no-unused-vars
function readFlexSensor(sensorValue) {
    return "A";
}

// TODO find a way to characterize motions
// eslint-disable-next-line no-unused-vars
function readAccelerometerAndGyroscope(ax, ay, az, gx, gy, gz) {
    return "wave";
}

function onGesture(fn) {
    eventEmitter.on("gesture", fn);
}

function onDebug(fn) {
    eventEmitter.on("debug", fn);
}

module.exports = { read, onGesture, onDebug };

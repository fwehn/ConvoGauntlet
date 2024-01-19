const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();

const gestureTime = parseInt(process.env.GESTURETIME || 3000);
let lastGesture = "";
let timeout;

let valueMap = {};
let lastCharacter = "@";
const flexSensorZones = parseInt(process.env.FLEXSENSORZONES || 8);
const flexSensorMin = parseInt(process.env.FLEXSENSORMIN || 400);
const flexSensorMax = parseInt(process.env.FLEXSENSORMAX || 600);

for (let i = 0; i < flexSensorZones; i++) {
    lastCharacter = String.fromCharCode(lastCharacter.charCodeAt(0) + 1);
    valueMap[lastCharacter] = flexSensorMin + ((flexSensorMax - flexSensorMin) / flexSensorZones) * i;
}

function analyze(data) {
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
        }, gestureTime);

        lastGesture = currentGesture;
    }
}

function readFlexSensor(sensorValue) {
    let currentValue = "A";

    for (let letter in valueMap) {
        if (sensorValue >= valueMap[letter]) currentValue = letter;
        else return currentValue;
    }

    return currentValue;
}

// TODO find a way to characterize motions
// eslint-disable-next-line no-unused-vars
function readAccelerometerAndGyroscope(ax, ay, az, gx, gy, gz) {
    return "up";
}

function onGesture(fn) {
    eventEmitter.on("gesture", fn);
}

function onDebug(fn) {
    eventEmitter.on("debug", fn);
}

module.exports = { analyze, onGesture, onDebug };

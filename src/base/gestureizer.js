const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();
const fileHandler = require("./fileHandler");

const gestureTime = parseInt(process.env.GESTURETIME || 3000);
let lastData = {};
let lastGesture = "";
let timeout;

const flexSensorZones = parseInt(process.env.FLEXSENSORZONES || 8);
let valueMap = {};
calculateFlexZones();

function calibrate(mode = "min") {
    let calibration = fileHandler.readConfigFile("calibration");

    for (let finger in lastData["f"]) {
        calibration[finger][mode] = lastData["f"][finger];
    }

    fileHandler.writeConfigFile("calibration", calibration);
}

function calculateFlexZones() {
    let calibration = fileHandler.readConfigFile("calibration");
    valueMap = {};

    for (let finger in calibration) {
        const flexSensorMin = (calibration[finger]["min"] || 150);
        const flexSensorMax = (calibration[finger]["max"] || 300);

        valueMap[finger] = {};
        let lastCharacter = "@";

        for (let i = 0; i < flexSensorZones; i++) {
            lastCharacter = String.fromCharCode(lastCharacter.charCodeAt(0) + 1);
            valueMap[finger][lastCharacter] = flexSensorMin + ((flexSensorMax - flexSensorMin) / flexSensorZones) * i;
        }
    }
}

function analyze(data) {
    lastData = data;
    let currentGesture =
        data["f"].reduce((carry, value, index) => carry + readFlexSensor(index, value), "") +
        "_" +
        readAccelerometerAndGyroscope(...data["a"]);

    eventEmitter.emit("debug", currentGesture);

    if (currentGesture !== lastGesture) {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            eventEmitter.emit("gesture", currentGesture);
        }, gestureTime);

        lastGesture = currentGesture;
    }
}

function readFlexSensor(index, sensorValue) {
    let currentValue = "A";

    for (let letter in (valueMap[index] || {})) {
        if (sensorValue >= valueMap[index][letter]) currentValue = letter;
        else return currentValue;
    }

    return currentValue;
}

function readAccelerometerAndGyroscope(ax, ay, az) {
    const limit = 10000;

    return [ax, ay, az].map(value => {
        if (value > limit) return 2;
        if (value < -limit) return 1;
        return 0;
    }).reduce((carry, value, index) => {
        return carry + (value * Math.pow(3, index));
    }, 0);
}

function onGesture(fn) {
    eventEmitter.on("gesture", fn);
}

function onDebug(fn) {
    eventEmitter.on("debug", fn);
}

module.exports = { calibrate, calculateFlexZones, analyze, onGesture, onDebug };

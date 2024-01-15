const { SerialPort, ReadlineParser } = require("serialport");

let mode = "dummy";
const satellitePort = process.env.SERIALPORT || "/dev/ttyUSB0";
let port = new SerialPort({
    path: satellitePort,
    baudRate: 9600,
}).setEncoding("utf8");

port.on("close", () => setTimeout(() => port.open(), 5000));
port.on("error", () => setTimeout(() => port.open(), 5000));

function start() {
    return new Promise((resolve, reject) => {
        try {
            let timeout = setTimeout(() => {
                resolve(["SatelliteAdapter: Started in 'dummy' mode"]);
            }, 1000);

            port.on("open", (...params) => {
                clearTimeout(timeout);
                mode = "live";
                resolve([`SatelliteAdapter: Found satellite at ${satellitePort}`, ...params]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

function onData(fn) {
    switch (mode) {
        case "dummy":
            setInterval(() => {
                let dummyData = {
                    a: [0, 0, 0],
                    g: [0, 0, 0],
                    f: [0, 0, 0, 0, 0],
                };

                fn(dummyData);
            }, 200);

            break;
        case "live":
            port.pipe(new ReadlineParser({ delimiter: "\r\n" })).on("data", (data) => {
                const matches = [
                    ...data
                        .toString()
                        .replaceAll("\n", "")
                        .matchAll(/([agf])=([\s\-;\d]*)/gm),
                ];

                let formattedData = {};

                for (let i in matches) {
                    formattedData[matches[i][1]] = matches[i][2].split(";").map((value) => parseInt(value));
                }

                fn(formattedData);
            });
            break;
    }
}

module.exports = { start, onData };

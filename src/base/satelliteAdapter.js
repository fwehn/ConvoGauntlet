const {SerialPort, ReadlineParser} = require("serialport");

let port = new SerialPort({
    path: process.argv[2] || "/dev/ttyUSB0",
    baudRate: 9600
}).setEncoding("utf8");

port.on('open', () => console.log("Serial device connected"));
port.on('close', () => setTimeout(() => port.open(), 5000));
port.on('error', () => setTimeout(() => port.open(), 5000));

function onData(fn) {
    const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
    parser.on('data', (data) => {
        const matches = [...data.toString().replaceAll("\n", "").matchAll(/([agf])=([\s\-;\d]*)/gm)];

        let formattedData = {};

        for (let i in matches) {
            formattedData[matches[i][1]] = matches[i][2].split(";").map(value => parseInt(value))
        }

        fn(formattedData)
    });
}

module.exports = {onData};
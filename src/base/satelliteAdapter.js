const {SerialPort, ReadlineParser} = require("serialport");

async function init(fn) {
    const portList = await SerialPort.list();
    const path = (portList.filter(port => port["friendlyName"].startsWith("USB-SERIAL CH340"))[0] || {})["path"];

    if (!path) {
        throw new Error("No serial device found!");
    }

    const port = new SerialPort({
        path: path,
        baudRate: 9600
    }).setEncoding("utf8");

    port.on('open', () => console.log("Serial device connected on port: " + path));

    const parser = port.pipe(new ReadlineParser({delimiter: '\r\n'}));
    parser.on('data', data => fn(onData(data)));

    return port;
}

function onData(data) {
    const matches = [...data.toString().replaceAll("\n", "").matchAll(/([agf])=([\s\-;\d]*)/gm)];

    let formattedData = {};

    for (let i in matches) {
        formattedData[matches[i][1]] = matches[i][2].split(";").map(value => parseInt(value))
    }

    return formattedData;
}

module.exports = {init}
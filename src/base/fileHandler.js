const fs = require("fs");
const path = require("path");

function readConfigFile(fileName = "config") {
    const configFilePath = path.join(__dirname, "config", `${fileName}.json`);
    return fs.existsSync(configFilePath) ? JSON.parse(fs.readFileSync(configFilePath).toString()) : {};
}

function writeConfigFile(fileName = "config", config = {}) {
    const configFilePath = path.join(__dirname, "config", `${fileName}.json`);
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

module.exports = {
    readConfigFile,
    writeConfigFile,
};

const fs = require("fs");
const path = require("path");

const configFilePath = path.join(__dirname, "config", "config.json");

function readConfigFile() {
	return fs.existsSync(configFilePath) ? JSON.parse(fs.readFileSync(configFilePath).toString()) : {};
}

function writeConfigFile(config) {
	fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

module.exports = {
	readConfigFile, writeConfigFile
}

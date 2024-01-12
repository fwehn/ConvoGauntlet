const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const restPort = process.env.RESTPORT || 3000;

const fh = require("./fileHandler");

app.use(bodyParser.json());

app.get("/gestures", (req, res) => {
    res.status(200).json(fh.readConfigFile());
});

app.post("/gestures", (req, res) => {
    if (!req.body["gesture"] || typeof req.body["gesture"] !== "string") {
        res.status(400).json({ error: "Key 'gesture' missing or in wrong type (string)" });
        return;
    }

    if (!req.body["sentence"] || typeof req.body["sentence"] !== "string") {
        res.status(400).json({ error: "Key 'sentence' missing or in wrong type (string)" });
        return;
    }

    let config = fh.readConfigFile();
    config[req.body["gesture"]] = req.body["sentence"];
    fh.writeConfigFile(config);

    res.status(200).json({});
});

app.delete("/gestures", (req, res) => {
    if (!req.body["gesture"] || typeof req.body["gesture"] !== "string") {
        res.status(400).json({ error: "Key 'gesture' missing or in wrong type (string)" });
        return;
    }

    let config = fh.readConfigFile();
    delete config[req.body["gesture"]];
    fh.writeConfigFile(config);
    res.status(200).json({});
});

function start() {
    return new Promise((resolve, reject) => {
        try {
            app.listen(restPort, (...params) => {
                resolve([`Rest: Listening on http://localhost:${restPort}`, ...params]);
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { start };

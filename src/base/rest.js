const fileHandler = require("./fileHandler");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const gestureizer = require("./gestureizer");

const restPort = process.env.RESTPORT || 3000;

app.use(bodyParser.json());

app.post("/calibrate", (req, res) => {
    if (!req.body["mode"] || typeof req.body["mode"] !== "string") {
        res.status(400).json({ error: "Key 'mode' missing or in wrong type (string)" });
        return;
    }

    if (req.body["calculate"] && typeof req.body["calculate"] !== "boolean") {
        res.status(400).json({ error: "Key 'calculate' in wrong type (boolean)" });
        return;
    }

    gestureizer.calibrate(req.body["mode"]);

    if (req.body["calculate"]) gestureizer.calculateFlexZones();

    res.status(200).json({})
});

app.get("/gestures", (req, res) => {
    res.status(200).json(fileHandler.readConfigFile("gestures"));
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

    let config = fileHandler.readConfigFile("gestures");
    config[req.body["gesture"]] = req.body["sentence"];
    fileHandler.writeConfigFile("gestures", config);

    res.status(200).json({});
});

app.delete("/gestures", (req, res) => {
    if (!req.body["gesture"] || typeof req.body["gesture"] !== "string") {
        res.status(400).json({ error: "Key 'gesture' missing or in wrong type (string)" });
        return;
    }

    let config = fileHandler.readConfigFile("gestures");
    delete config[req.body["gesture"]];
    fileHandler.writeConfigFile("gestures", config);
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

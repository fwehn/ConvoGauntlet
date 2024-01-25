const axios = require("axios");
const url = require("url");
const fs = require("fs");
const path = require("path");
const wavPlayer = require("node-wav-player");

const ttsUrl = `${process.env.TTSURL || "http://localhost:59125"}`;
const audioPath = path.resolve(__dirname, "tmp", "audio.wav");

function sayText(text = "") {

    const params = new url.URLSearchParams({
        INPUT_TYPE: "TEXT",
        INPUT_TEXT: text,
        OUTPUT_TYPE: "AUDIO",
        AUDIO: "WAVE",
        LOCALE: "en_US",
    });

    return new Promise((resolve, reject) => {
        axios.get(`${ttsUrl}/process?${params.toString()}`, {
            responseType: "stream",
        }).then((response) => {
            response.data.pipe(fs.createWriteStream(audioPath));

            response.data.on("end", () => {
                wavPlayer.play({ path: audioPath }).then(resolve).catch(reject);
            });

            response.data.on("error", err => {
                reject(err);
            });

        }).catch(reject);
    });
}

module.exports = {
    sayText,
};

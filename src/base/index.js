const satelliteAdapter = require("./satelliteAdapter");

satelliteAdapter
    .init(console.log)
    .catch(console.error);
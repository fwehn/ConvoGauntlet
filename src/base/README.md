# ConvoGauntlet - Base

## Usage

### Install

```shell
npm install
```

### Run

#### Dev

First Create `.env` file next to `index.js`.  
The available ENV-variables are:

```.dotenv
RESTPORT=3000
WSPORT=3001
SERIALPORT=COM3
TTSURL=http://marytts
GESTURETIME=1500
FLEXSENSORZONES=8
FLEXSENSORMIN=400
FLEXSENSORMAX=600
```

After you created the `.env` file and modified it, you can simply run `npm run dev`.  
For every variable default values are set (see below). When there is no `SERIALPORT` defined or the service cannot connect to, it will start in `dummy` mode.

## Websocket

To connect to the websocket provided by the base service, add the following to your HTML:

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
    let socket = io("ws://localhost:<Port set in .env file>");
    socket.on("debug", console.log);
    socket.on("gesture", console.log);
</script>
```

Insert the port number you set in the `.env` file (Default: `3001`).

## API

After starting the base service, the REST api will be available at `http://localhost:<port set in .env file>`.  
You can change the port by setting it in the `.env` file (Default: `3000`).

### Gestures

| Method | Endpoint   | Body                                                 |
| ------ | ---------- | ---------------------------------------------------- |
| POST   | /calibrate | `{"mode": "min", "calculate": true}`                 |
| GET    | /gestures  | doesn't matter                                       |
| POST   | /gestures  | `{"gesture": "AAAAA_up", "sentence": "Hello World"}` |
| DELETE | /gestures  | `{"gesture": "AAAAA_up"}`                            |

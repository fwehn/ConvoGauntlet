# ConvoGauntlet - Base

## Usage
### Install
```shell
npm install
```

### Run
#### Dev
First Create ```.env``` file next to ```index.js```.  
The required ENV-variables are:
```.dotenv
RESTPORT=3000
WSPORT=3001
SERIALPORT=COM3
```

After you created the ```.env``` file and modified it, you can simply run ```npm run dev```.

## API
### Gestures

| Method | Endpoint  | Body                                                     |
|--------|-----------|----------------------------------------------------------|
| GET    | /gestures | doesn't matter                                           |
| POST   | /gestures | ```{"gesture": "AAAAA_up", "sentence": "Hello World"}``` |
| DELETE | /gestures | ```{"gesture": "AAAAA_up", "sentence": "Hello World"}``` |

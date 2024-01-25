FROM node:21

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        libasound2 \
        alsa-utils && \
    apt-get clean

WORKDIR /usr/src/convo-gauntlet-base
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . .
VOLUME ["/usr/src/convo-gauntlet-base/config", "/usr/src/convo-gauntlet-base/tmp"]

ENV RESTPORT=3000 \
    WSPORT=3001 \
    SERIALPORT='/dev/ttyUSB0' \
    FLEXSENSORZONES=4 \
    GESTURETIME=1500 \
    TTSURL='http://localhost:59125'

EXPOSE $RESTPORT
EXPOSE $WSPORT

CMD ["node", "index.js"]

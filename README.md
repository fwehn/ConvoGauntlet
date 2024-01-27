# ConvoGauntlet

## Miro

Link to our [Miro-Board](https://miro.com/app/board/uXjVNS7nv_c=/).

## Concept

[//]: # (TODO write a Concept)

![Concept-Image](./assets/Concept.jpg)


## Installation

### Linux (tested on Raspbian and Arch)

The following packages are required to run ConvoGauntlet:

- Git
- Docker and Docker-Compose
- ALSA and ALSA Utils

After you installed all required packages, you can simply run the following commands:

```shell
git clone https://github.com/fwehn/ConvoGauntlet.git
cd ConvoGauntlet
```

Move to ```ConvoGauntlet``` directory.  
Get a list of your connected sound cards:

```shell
cat /proc/asound/cards
```

Edit ```./asound.conf``` and change the number according to your preferred card: 

```text
defaults.pcm.card 0
defaults.ctl.card 0
```

Start the service by running the following command:

```shell
sudo docker-compose up --build -d
```
(You may have to run this command with ```root``` privileges.)

# automin
A personal node project to enable webhooks between different services. Conforms the webhooks to the outbound apis.
In this early stage only working with [Rescuetime](https://rescuetime.com) and [Amazing Marvin](https://www.amazingmarvin.com).

## Installation

Clone this repo then run `npm build` followed by `npm start`.
(_Note_: You will need to rebuild the project and update your webhook calls in Amazing Marvin). 

## Usage

Run from the directory of the app using `npm start`. It will either take a command line argument, an environment variable `$PORT` or will default to port 80.

*Local Mode*:

*If you'd like to specify a port please specify it as an argument `npm start #portnum`.* If you use this method your url will be `http://localhost:portnum` where portnum
is the port you chose. Be aware that using this method will only allow amazing marvin's timers to call rescuetime from the same device you run the server on. You need to
host the code remotely in order to run it from a mobile device. Heroku, Google Cloud, Azure are all viable options here.

**NOTE**: running in local mode may cause issues with safari and the marvin desktop app. 

## Setting Up Amazing Marvin to call Rescuetime
You will need to enable the API strategy. Once you have the server running you will need webhooks for each of the possible timer settings. The following settings
can be used as a template. The phrase `https://yourUrlHere` is where you would paste either localhost if utilizing it locally or the url of the hosted server.
You will then need to get your API key from rescuetime [here](https://www.rescuetime.com/anapi/manage).

| Call Event | Call Type | URL | Header 1 | Header 2 |
| --- | --- | :-: | --- | --- 
| Add Timer | POST | `https://yourURLHere/rescue_time_start` | Content-Type: application/json | X-Api-Key: `yourAPIKey` |
| Pause Timer | POST | `https://yourURLHere/rescue_time_end` | Content-Type: application/json | X-Api-Key: `yourAPIKey` |
| Resume Timer | POST | `https://yourURLHere/rescue_time_start` | Content-Type: application/json | X-Api-Key: `yourAPIKey` |
| Delete Timer | POST | `https://yourURLHere/rescue_time_end` | Content-Type: application/json | X-Api-Key: `yourAPIKey` |
| Timer Done | POST | `https://yourURLHere/rescue_time_end` | Content-Type: application/json | X-Api-Key: `yourAPIKey` |


## Current Limitations
The local version has a lot of issues with the desktop version of Amazing Marvin, and the web version in Safari. For now these are considered 
unsupported platforms when runnng the server locally. Firefox is recommended.

The other major limitation is an api limitation from Rescuetime. Specifically, the api only works on multiples of 5. If you get a timer 
smaller then five we strongly reccomend leaving it on until your session ends, if only to prevent issues w/ synchronization later.

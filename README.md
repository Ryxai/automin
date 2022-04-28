# automin
A personal node project to enable webhooks between different services. Conforms the webhooks to the outbound apis.
In this early stage only working with [Rescuetime](https://rescuetime.com) and [Amazing Marvin](https://www.amazingmarvin.com).

## Installation

Clone this repo then run `npm build` followed by `npm start`. By defaut this will run on port **9540** unless it is changed in index.ts.
(_Note_: You will need to rebuild the project and update your webhook calls in Amazing Marvin). 

## Usage

Run from the directory of the app using `npm start`. It currently used the local environment variable $PORT. For legacy I have left the previous methodology commented in for usage.
*If you'd like to specify a port please specify it as an argument `npm start #portnum`.*

## Setting Up Amazing Marvin
You will need to enable the API strategy. Then add the following webhooks ![Webhook structure]wawwws(https://postimg.cc/dLYBXCRq).

You will then need to get your API key from rescuetime [here](https://www.rescuetime.com/anapi/manage). Click on the headers so it brings
up an extra dialog. Hit enter once, the type `X-Api-Key: "your api-key'`. You will need to complete this process for each webhook.

## Current Limitations
This has a lot of issues with the desktop version of Amazing Marvin, and the web version in Safari. For now these are considered 
unsupported platforms. 

The other major limitation is an api limitation from Rescuetime. Specifically, the api only works on multiples of 5. If you get a timer 
smaller then five we strongly reccomend leaving it on until your session ends, if only to prevent issues w/ synchronization later.

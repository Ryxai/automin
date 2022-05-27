import {Request, Response} from "express";
import Ajv from "ajv/dist/jtd";
import {Timer,timerSchema} from "../models/timer.model";
import {updateTimer} from "../utils/timer";
import {generateNewTimer, parseTimer, serializeTimer} from "../utils/timer";
import {setMarvinRequiredHeaders} from "../utils/response_headers";



export const getRemainingDuration = (request: Request, response: Response) => {
  const timer = request.app.get("Timer");
  request.app.set("Timer", updateTimer(timer));
    if (!timer.isPopulated) {
      console.log("Timer api called before initialized");
        response.status(412).json({
          error:'api-timer-uninitialized',
          message:'Ther internal server timer has not been updated',
      details: 'Please start a timer via one of the supported applications to update the system timer first before requesting updates. If you have started a timer, please'
      + 'ensure that the webhook\'s headers are properly configured to utilize the "Origin-Request" header appropriately.' 
    })
  }
  else {
    if (request.app.get("debug"))
      console.log(`Exporting remaining duration to ${request.ip}`);
    response.status(200).json(request.app.get("Timer") as Timer);
  }
}

export const updateServerTimer = (request: Request, response: Response) => {
  if (request.app.get("debug"))
    console.log(`Updating server using ${request.body} from ${request.ip}`);
  request.app.set("Timer", generateNewTimer(parseTimer(request.body)));
  response = setMarvinRequiredHeaders(response);
  response.sendStatus(200).json({success: true});
}

export const getTimerObject = (request: Request, response: Response) => {
  const serializedTimer = serializeTimer(request);
  if (request.app.get("debug"))
    console.log(`Sending the timer ${serializedTimer} to ${request.ip}`);
  response
    .sendStatus(200).json(serializedTimer);
}

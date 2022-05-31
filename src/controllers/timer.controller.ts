import {Request, Response} from "express";
import {timerUninitializedResponse, 
  timerAlreadyPaused, 
  timerAlreadyUnpaused} from "../models/error.model";
import {MultiTimer,Timer} from "../models/timer.model";
import {updateTimer} from "../utils/timer";
import {generateNewTimer, parseTimer, serializeTimer} from "../utils/timer";
import {setMarvinRequiredHeaders} from "../utils/response_headers";


export const getRemainingDuration = (request: Request, response: Response) => {
  const timer = request.app.get("Timer");
  request.app.set("Timer", updateTimer(timer));
    if (!timer.isPopulated) {
      console.log("Timer api called before initialized");
        response.status(412).json(timerUninitializedResponse);
  }
  else {
    if (request.app.get("debug"))
      console.log(`Exporting remaining duration to ${request.ip}`);
    response.status(200).json(request.app.get("Timer") as Timer);
  }
}

export const updateServerTimer = (request: Request, response: Response) => {
  if (request.app.get("debug"))
    console.log(`Updating server using ${JSON.stringify(request.body)} from ${request.ip}`);
  const parsedTimer = parseTimer(request);
  if (request.app.get("debug"))
    console.log(`The parsed object is ${JSON.stringify(parsedTimer)}`);
  request.app.set("Timer", generateNewTimer(parsedTimer));
  response = setMarvinRequiredHeaders(response);
  response.status(200).json({
    updatedObject: serializeTimer(request.app.get("Timer"))});
}

export const getTimerObject = (request: Request, response: Response) => {
  const serializedTimer = serializeTimer(request);
  if (request.app.get("Timer").isPopulated) {
    if (request.app.get("debug"))
      console.log(`Sending the timer ${serializedTimer} to ${request.ip}`);
    response
      .status(200).json(serializedTimer);
  }
  else {
    if (request.app.get("debug"))
      console.log(`Unable to send the timer since it has not been populated`);
    response.status(412).json(timerUninitializedResponse);
  }
}

export const pauseTimer = (request: Request, response: Response) => {
  const timer : MultiTimer = request.app.get("Timer") as MultiTimer;
  if(timer.isPaused) {
    response.status(409).json(timerAlreadyPaused);
  }
  else {
    timer.pause();
    request.app.set("Timer", timer);
    response.status(200).json({pausedAt: timer.pausedAt});
  }
}

export const unpauseTimer = (request: Request, response: Response) => {
  const timer: MultiTimer = request.app.get("Timer") as MultiTimer;
  if (!timer.isPaused) {
    response.status(409).json(timerAlreadyUnpaused);
  }
  else {
    timer.unpause();
    request.app.set("Timer", timer);
    response.status(200).json({unpaused: true});
  }
}

export const endTimer = (request: Request, response: Response) => {
  
}

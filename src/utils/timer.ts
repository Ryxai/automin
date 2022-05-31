import {Timer, MultiTimer, timerSchema} from "../models/timer.model";
import {ParsedTimerObject,
  MarvinTimer,
  MarvinPomodoroTimer,
  marvinTimerSchema,
  marvinPomodoroTimerSchema,} from "../models/marvintimer.model";
import Ajv from "ajv/dist/jtd";
import {Request} from "express";

export const updateTimer = (timer: MultiTimer) : Timer => {
  timer.recalculateElapsedTime();
  return timer;
}

export const parseTimer = (request: Request) : ParsedTimerObject => {
  const ajv = new Ajv();
  const timerParser = ajv.compileParser<MarvinTimer>(marvinTimerSchema);
  const pomodoroTimerParser = ajv.compileParser<MarvinPomodoroTimer>(marvinPomodoroTimerSchema);
  const timerParseResults = timerParser(JSON.stringify(request.body));
  const pomodoroParseResults = pomodoroTimerParser(JSON.stringify(request.body));
  if (request.app.get("debug"))
    console.log(`The timer parse results: ${timerParseResults} `
               + `and the pomodoro parse results are ${pomodoroParseResults}`);
  return timerParseResults
    ? {timer: timerParseResults} : {pomodoroTimer: pomodoroParseResults};
}

export const generateNewTimer = (timer : ParsedTimerObject) : Timer => {
  const newTimer = new MultiTimer();
  if ("timer" in timer && timer.timer !== undefined)
   newTimer.updateTimer(timer.timer);
  else if ("pomodoroTimer" in timer && timer.pomodoroTimer !== undefined)
    newTimer.updatePomodoroTimer(timer.pomodoroTimer);
  else 
    throw new Error("Issue with parsed timer, cannot retrieve parsed timer " 
                    + "from output object");
  return newTimer;
}

export const serializeTimer = (request: Request) : string => {
  const app = request.app;
  const ajv = app.get("ajv") as Ajv;
  return ajv.compileSerializer(timerSchema)(app.get("Timer"));
}

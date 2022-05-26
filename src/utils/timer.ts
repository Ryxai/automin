import {Timer, MultiTimer} from "../models/timer.model";
import {MarvinTimer, MarvinPomodoroTimer, ParsedTimerObject,
  marvinTimerSchema,
  marvinPomodoroTimerSchema} from "../models/marvintimer.model";
import Ajv,{JTDSchemaType} from "ajv/dist/jtd";

export const updateTimer = (timer: Timer) : Timer => {
  const time = Date.now();
  const diff = time - timer.lastUpdated;
  timer.elapsed += diff;
  timer.lastUpdated = time;
  return timer;
}

export const parseTimer = (jsonObject: string) : ParsedTimerObject => {
  const ajv = new Ajv();
  const timerParser = ajv.compileParser(marvinTimerSchema);
  const pomodoroTimerParser = ajv.compileParser(marvinPomodoroTimerSchema);
  const timerParseResults = timerParser(jsonObject);
  return timerParseResults
    ? {timer: timerParseResults} : {pomodoroTimer: pomodoroTimerParser(jsonObject)}
}

export const generateNewTimer = (timer : ParsedTimerObject) : Timer => {
  const newTimer = new MultiTimer();
  if ("timer" in timer && timer.timer)
   newTimer.updateTimer(timer.timer);
  else if ("pomodoroTimer" in timer && timer.pomodoroTimer)
    newTimer.updatePomodoroTimer(timer.pomodoroTimer);
  else 
    throw new Error("Issue with parsed timer, cannot retrieve parsed timer from output object");
  return newTimer;
}

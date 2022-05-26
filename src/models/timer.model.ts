import {JTDSchemaType} from "ajv/dist/jtd";
import {MarvinTimer, MarvinPomodoroTimer} from "./marvintimer.model";
export interface Timer {
  elapsed: number;
  progress: number;
  workDuration: number;
  breakDuration: number;
  duration: number;
  cycle: number;
  repeat: number;
  taskId: string;
  isWork: boolean;
  done: boolean;
  isPomo : boolean;
  isPopulated: boolean;
  lastUpdated: number;
}

export class MultiTimer implements Timer {

  elapsed: number;
  progress: number;
  workDuration: number;
  breakDuration: number;
  duration: number;
  cycle: number;
  repeat: number;
  taskId: string;
  isWork: boolean;
  done: boolean;
  isPomo : boolean;
  isPopulated: boolean;
  lastUpdated: number;

  constructor() {
    this.elapsed = 0;
    this.progress = 0;
    this.workDuration = 0;
    this.breakDuration = 0;
    this.duration = 0;
    this.cycle = 0;
    this.repeat = 0;
    this.taskId = "";
    this.isWork = false;
    this.done = false;
    this.isPomo = false;
    this.isPopulated = false;
    this.lastUpdated = Date.now();
  }

  updateTimer = (timer: MarvinTimer) => {
    this.elapsed = timer.elapsed;
    this.progress = timer.progress;
    this.duration = timer.duration;
    this.taskId = timer.taskId; this.done = timer.done;
    this.isPomo = false;
    this.isPopulated = true;
    this.lastUpdated = Date.now();
    return this;
  }

  updatePomodoroTimer = (timer: MarvinPomodoroTimer) => {
    this.elapsed = timer.elapsed;
    this.progress = timer.progress;
    this.workDuration = timer.workDuration;
    this.breakDuration = timer.breakDuration;
    this.cycle = timer.cycle;
    this.repeat = timer.repeat;
    this.isWork = timer.isWork;
    this.done = timer.done;
    this.isPomo = true;
    this.isPopulated = true;
    this.lastUpdated = Date.now();
    return this;
  }
}

export const timerSchema: JTDSchemaType<Timer> = {
  properties: {
    elapsed: {type: "uint32"},
    progress: {type: "uint32"},
    workDuration: {type: "uint32"},
    breakDuration: {type: "uint32"},
    duration: {type: "uint32"},
    cycle: {type: "uint32"},
    repeat: {type: "uint32"},
    taskId: {type: "string"},
    isWork: {type: "boolean"},
    done: {type: "boolean"},
    isPomo : {type: "boolean"},
    isPopulated: {type: "boolean"},
    lastUpdated: {type: "uint32"}
  }
}

export type TimerSchema = JTDSchemaType<typeof timerSchema>;

import {JTDSchemaType} from "ajv/dist/jtd";

export interface MarvinTimer {
  elapsed: number,
  progress: number,
  duration: number,
  taskId: string,
  beepCount: number,
  done: boolean
}

export interface MarvinPomodoroTimer {
  elapsed: number,
  progress: number,
  workDuration: number,
  breakDuration: number,
  cycle: number,
  repeat: number,
  beepCount: number,
  isWork: boolean,
  done: boolean
}

export const marvinTimerSchema : JTDSchemaType<MarvinTimer> = {
  properties: {
    elapsed: {type: "uint32"},
    progress: {type: "uint32"},
    duration: {type: "uint32"},
    taskId: {type: "string"},
    beepCount: {type: "uint32"},
    done: {type: "boolean"}
  }
}

export const marvinPomodoroTimerSchema: JTDSchemaType<MarvinPomodoroTimer> = {
  properties: {
    elapsed: {type: "uint32"},
    progress: {type: "uint32"},
    workDuration: {type: "uint32"},
    breakDuration: {type: "uint32"},
    cycle: {type: "uint32"},
    repeat: {type: "uint32"},
    beepCount: {type: "uint32"},
    isWork: {type: "boolean"},
    done: {type: "boolean"}
  }
}

export type MarvinTimerSchema = JTDSchemaType<typeof marvinTimerSchema>;
export type MarvinPomodoroTimerSchema = JTDSchemaType<typeof marvinPomodoroTimerSchema>;
export interface ParsedTimerObject {
  timer? : MarvinTimer;
  pomodoroTimer? : MarvinPomodoroTimer;
}

import {JTDSchemaType} from "ajv/dist/jtd";

export interface MarvinTimer {
  timerId?: number;
  progress?: number,
  needsConfirmation?: boolean
  repeat?: boolean
  elapsed: number,
  duration: number,
  taskId: string | null,
  beepCount: number,
  done: boolean
}

export interface MarvinPomodoroTimer {
  timerId?: number;
  progress?: number,
  needsConfirmation?: boolean
  beepCount?: number,
  elapsed: number,
  workDuration: number,
  breakDuration: number,
  cycle: number,
  repeat: number,
  isWork: boolean,
  done: boolean
  taskId: string | null;
}

export const marvinTimerSchema : JTDSchemaType<MarvinTimer> = {
  optionalProperties: {
    timerId: {type: "uint32"},
    progress: {type: "uint32"},
    needsConfirmation: {type: "boolean"},
    repeat: {type: "boolean"}
  },
  properties: {
    elapsed: {type: "uint32"},
    duration: {type: "uint32"},
    taskId: {type: "string", nullable: true},
    beepCount: {type: "uint32"},
    done: {type: "boolean"}
  }
}

export const marvinPomodoroTimerSchema: JTDSchemaType<MarvinPomodoroTimer> = {
  optionalProperties: {
    timerId: {type: "uint32"},
    progress: {type: "uint32"},
    needsConfirmation: {type: "boolean"},
    beepCount: {type: "uint32"},
  },
  properties: {
    elapsed: {type: "uint32"},
    workDuration: {type: "uint32"},
    breakDuration: {type: "uint32"},
    cycle: {type: "uint32"},
    repeat: {type: "uint32"},
    isWork: {type: "boolean"},
    done: {type: "boolean"},
    taskId: {type: "string", nullable: true}
  }
}

export type MarvinTimerSchema = JTDSchemaType<typeof marvinTimerSchema>;
export type MarvinPomodoroTimerSchema = 
  JTDSchemaType<typeof marvinPomodoroTimerSchema>;
export interface ParsedTimerObject {
  timer? : MarvinTimer;
  pomodoroTimer? : MarvinPomodoroTimer;
}

export class MultiTimer {
  elapsed: Number;
  progress: Number;
  workDuration: Number;
  breakDuration: Number;
  duration: Number;
  cycle: Number;
  repeat: Number;
  taskID: string;
  isWork: boolean;
  done: boolean;
  isPomo : boolean;

  constructor() {
    this.elapsed = 0;
    this.progress = 0;
    this.workDuration = 0;
    this.breakDuration = 0;
    this.duration = 0;
    this.cycle = 0;
    this.repeat = 0;
    this.taskID = "";
    this.isWork = false;
    this.done = false;
    this.isPomo = false;
  }
  
  createTimer = (_elapsed: Number,
                 _progress: Number,
                 _duration: Number,
                 _taskID: string,
                 _done: boolean) => {
    this.elapsed = _elapsed;
    this.progress = _progress;
    this.duration = _duration;
    this.taskID = _taskID;
    this.done = _done;
    this.isPomo = false;
  }

  createPomodoroTimer = (_elapsed: Number,
                         _progress: Number,
                         _workDuration : Number,
                         _breakDuration: Number,
                         _cycle: Number,
                         _repeat: Number,
                         _isWork: boolean,
                         _done: boolean) => {
    this.elapsed = _elapsed;
    this.progress = _progress;
    this.workDuration = _workDuration;
    this.breakDuration = _breakDuration;
    this.cycle = _cycle;
    this.repeat = _repeat;
    this.isWork = _isWork;
    this.done = _done;
    this.isPomo = true;
  }
}

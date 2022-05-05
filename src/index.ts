import axios from 'axios';
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import {compare} from 'bcrypt';
import {MultiTimer,
  MarvinTimer,
  MarvinPomodoroTimer,
  marvinPomodoroTimerSchema,
  timerSchema,
  marvinTimerSchema,
  MarvinTimerSchema,
  MarvinPomodoroTimerSchema,
  TimerSchema} from './interfaces';
import Ajv from 'ajv/dist/jtd';

const port = process.argv[2] || process.env.PORT || 80;
const app = express();
const ajv = new Ajv();
const tryParseMarvinTimer= ajv.compileParser<MarvinTimerSchema>(marvinTimerSchema);
const tryParseMarvinPomo= ajv.compileParser<MarvinPomodoroTimerSchema>(marvinPomodoroTimerSchema);
const serializeTimer= ajv.compileSerializer<TimerSchema>(timerSchema);
const default_token = "DEFAULT!!!"; // To satisfy typing issues w/ bcrypt
const hashed_apikey = process.env.APIKEY || "";
const isSecure = process.env.APIKEY ? (process.env.SECURE === "true") || false : false;
const timer : MultiTimer = new MultiTimer();
app.use(bodyParser.json());

/* Internal functions */

const updateDuration = () => {
  const time = Date.now();
  const diff = time - timer.lastUpdated;
  timer.elapsed += diff;
  timer.lastUpdated = time;
}

const apiKeyCheck = async (req : express.Request) => {
  return isSecure &&
    !(await compare(req.get("Automin-API-Key") ?? default_token, hashed_apikey));
}


/*General Routing */
/*Middleware*/

app.use((req, res, next) => {
  console.log(`Request from ${req.ips}`);
  if (!apiKeyCheck(req) && req.originalUrl !== "/"){
    console.log(`Failure to handle authentication: ${req.get("Automin-API-Key")}`);
    res.status(401).json({error: 'Auth-fail',
                         message: 'Failed to authenticate api-key',
                         detail: 'Server api access is secured and requires'
                         + 'the correct api-key. If you are the owner of this'
                         + 'server please cycle your keys to update, otherwise'
                         + 'please contact your server administrator for'
                         + 'further instructions'});
  }
  else
    next();
});

app.use((req, res, next) => {
  if (req.get("Origin-Request")=="Marvin-Timer") {
    const parsedTimer = tryParseMarvinTimer(req.body);
    const parsedPomo = tryParseMarvinPomo(req.body);
    if (!parsedTimer && !parsedPomo) {
        res.sendStatus(400).json({
          error: 'api-timer-malformed',
          message: 'A malformed request was sent to the timer-api',
          detail: `The following parsing errors were indicated:\n` +
            `${tryParseMarvinTimer.message} at location ${tryParseMarvinTimer.position}` +
            `${tryParseMarvinPomo.message} at location ${tryParseMarvinPomo.position}`
        });
        return;
    }
    if (parsedTimer) {
      timer.updateTimer(parsedTimer as unknown as MarvinTimer);
      console.log(`Updated timer as regular timer: ${JSON.stringify(parsedTimer)}`);
    }
    else {
      timer.updatePomodoroTimer(parsedPomo as unknown as MarvinPomodoroTimer);
      console.log(`Updated timer as pomodoro timer: ${JSON.stringify(parsedPomo)}`);
    }
  }
  next();
});



//CORS handling for Marvin
app.options('/*',(_, res) => {
  res.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  res.set("Access-Control-Allow-Origin","*");
  res.sendStatus(200);
});

/*Rescue Time*/

//Linking Rescuetime to Marvin for timer start/stop etc
app.post('/rescue_time_start', async (req, res) => {
  res.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.set("Access-Control-Allow-Origin","*");
  const duration = Math.ceil(((req.body.isWork ? req.body.workDuration - req.body.elapsed : (req.body.breakDuration ?? req.body.duration)  - req.body.elapsed)/60000)/5)*5;
  //console.log(req.body);
  console.log(`Passing rescuetime a start session prompt with a duration of ${duration} minutes`);
  axios.post(`https://www.rescuetime.com/anapi/start_focustime?key=${req.get('X-Api-Key')}&duration=${duration}`)
    .then((_) => {/*console.log(response.data);*/res.sendStatus(200);});
});

app.post('/rescue_time_end', async (req, res) => {
  res.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.set("Access-Control-Allow-Origin","*");
  //console.log(req.body);
  console.log(`Passing rescuetime an end session prompt`);
  axios.post(`https://www.rescuetime.com/anapi/end_focustime?key=${req.get('X-Api-Key')}`)
    .then((_) => {/*console.log(response.data);*/res.sendStatus(200);});
});



/* Pomodoro API */
app.get("/remaining_duration", (_, res) => {
  res.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key, Origin-Request");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.set("Access-Control-Allow-Origin","*");
  updateDuration();
  res.json(timer);
});

app.get("/", (_, res) => res.send("See https://github.com/Ryxai/automin for details on how to host your own!"));

app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
  console.log(`Setup is currently ${isSecure ? "secure" : "insecure"}`);
});


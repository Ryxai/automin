import axios from 'axios';
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import {compare} from 'bcrypt';
import {MultiTimer} from './interfaces';

const port = process.argv[2] || process.env.PORT || 80;
const app = express();
const default_token = "DEFAULT!!!"; // To satisfy typing issues w/ bcrypt
const hashed_apikey = process.env.APIKEY || "";
const isSecure = process.env.APIKEY ? (process.env.SECURE === "true") || false : false;
const timer : MultiTimer = MultiTimer();
app.use(bodyParser.json());




const apiKeyCheck = async (req : express.Request) => {
  return isSecure &&
    !(await compare(req.get("Automin-API-Key") ?? default_token, hashed_apikey));
}


app.use((req, res, next) => {
  console.log(`Request from ${req.ips}`);
  if (!apiKeyCheck(req) && req.originalUrl !== "/"){
    console.log(`Failure to handle authentication: ${req.get("Automin-API-Key")}`);
    res.sendStatus(401);
  }
  else
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
app.get("/pomotimer", (req, res) => {
  res.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.set("Access-Control-Allow-Origin","*");
  
});

app.get("/", (_, res) => res.send("See https://github.com/Ryxai/automin for details on how to host your own!"));

app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
  console.log(`Setup is currently ${isSecure ? "secure" : "insecure"}`);
});


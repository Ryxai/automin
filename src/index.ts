import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import {MultiTimer, timerSchema, TimerSchema} from "./models/timer.model"
import {authenticateAPIKey} from "./middleware/auth.middleware";
import {router} from "./routes/default.routes";
import Ajv from 'ajv/dist/jtd';

/* Configu*/
const app = express();
//Setting globals + settings
app.set("port", process.argv[2] || process.env.PORT || 80);
app.set("Timer", new MultiTimer());
app.set("isSecure", process.env.APIKEY 
  ? (process.env.SECURE === "true") || false 
  : false
);
app.set("hashed_apikey", process.env.APIKEY || "");
app.set("default_token", "DEFAULT!!!");
app.set("ajv", new Ajv());
app.use(bodyParser.json());
app.use(authenticateAPIKey);
app.use(router);

/* Pomodoro API */
app.listen(app.get("port"), () => {
  console.log(`Listening on the port ${app.get("port")}`);
  console.log(`Setup is currently ${app.get("isSecure") ? "secure" : "insecure"}`);
});


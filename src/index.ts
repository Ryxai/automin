import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import {Timer, MultiTimer, timerSchema} from "./models/timer.model"
import {router} from "./routes/default.routes";
import {logError, respondToError} from "./middleware/error.middleware";
import Ajv from 'ajv/dist/jtd';

/* Configu*/
const app = express();
//Setting globals + settings
app.set("debug", (process.env.DEBUG == "true") || false);
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
app.use(router);
app.use(logError);
app.use(respondToError);

/* Pomodoro API */
app.listen(app.get("port"), () => {
  console.log(`Listening on the port ${app.get("port")}`);
  console.log(`Setup is currently ${app.get("isSecure") ? "secure" : "insecure"}`);
  if (app.get("debug"))
    console.log(`Timer object is initialized ${
      (app.get('ajv') as Ajv).compileSerializer(timerSchema)((app.get("Timer")))
  }`)
});


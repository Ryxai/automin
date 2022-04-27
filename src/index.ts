import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

const port = '9540';
const app = express();
app.use(bodyParser.json());

//CORS handling for Marvin
app.options('/*',(req, res) => {
  res.header("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  res.header("Access-Control-Allow-Origin","*");
  res.sendStatus(200);
});


//Linking Rescuetime to Marvin for timer start/stop etc
app.post('/rescue_time_start', (req, res) => {
  const duration = Math.ceil(((req.body.isWork ? req.body.workDuration - req.body.elapsed : req.body.breakDuration - req.body.elapsed)/60000)/5)*5;
  console.log(req.body);
  console.log(`Passing rescuetime a session duration of ${duration}`);
  axios.post(`https://www.rescuetime.com/anapi/start_focustime?key=${req.get('X-Api-Key')}&duration=${duration}`)
    .then((response) => {/*console.log(response.data);*/res.sendStatus(200);});
});

app.post('/rescue_time_end', (req, res) => {
  console.log(req.body);
  console.log(`Passing rescuetime an end session`);
  axios.post(`https://www.rescuetime.com/anapi/end_focustime?key=${req.get('X-Api-Key')}`)
    .then((response) => {/*console.log(response.data);*/res.sendStatus(200);});
});

app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});


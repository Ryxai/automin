import {Request, Response, NextFunction} from "express";
import {setMarvinRequiredHeaders} from "../utils/response_headers";
import axios from "axios";

export const start_focustime = (request: Request, response: Response) => {
  response = setMarvinRequiredHeaders(response);
  const duration = Math.ceil(
    (
      (
        request.body.isWork 
          ? request.body.workDuration - request.body.elapsed 
          : (request.body.breakDuration 
            ?? request.body.duration)  - request.body.elapsed
      )/60000)/5)*5;
  if (request.app.get("debug"))
    console.log(`Passing rescuetime a start session prompt with a duration of ${duration} minutes`);
  axios.post(`https://www.rescuetime.com/anapi/start_focustime?key=${request.get('X-Api-Key')}&duration=${duration}`)
    .then((_) => {/*console.log(response.data);*/response.sendStatus(200);});

};

export const end_focustime = (request: Request, response: Response) => {
  response = setMarvinRequiredHeaders(response);
  if (request.app.get('debug'))
    console.log(`Passing rescuetime an end session prompt`);
  axios.post(`https://www.rescuetime.com/anapi/end_focustime?key=${request.get('X-Api-Key')}`)
    .then((_) => {/*console.log(response.data);*/response.sendStatus(200);});

}

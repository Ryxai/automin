import {Request, Response} from "express";

export const marvinCORS = (request: Request, response: Response) => {
  console.log(`Options request from ${request.ip}`)
  response.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key"
  + ", Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key"
  + ",Origin-Request");
  response.set("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  response.set("Access-Control-Allow-Origin","*");
  response.sendStatus(200);

};

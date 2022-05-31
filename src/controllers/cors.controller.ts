import {Request, Response} from "express";
import {setMarvinRequiredHeaders} from "../utils/response_headers";

export const marvinCORS = (request: Request, response: Response) => {
  if (request.app.get('debug'))
    console.log(`Options request from ${request.ip}`)
  response = setMarvinRequiredHeaders(response);
  response.sendStatus(200);
};

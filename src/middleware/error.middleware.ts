import express, {Request, Response, NextFunction} from "express";

export const logError = 
  (error: Error,
   request: Request,
   response: Response,
   next: NextFunction) => {
  console.log(`Error: ${error.message}\n${error.stack}`);
  next();
}

export const respondToError = 
  (error: Error,
   request: Request,
   response: Response,
   _: NextFunction) => {
  response.status(400).json(error);
}

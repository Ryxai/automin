import {Request, Response, NextFunction} from "express";
import {apiKeyCheck} from "../utils/authentication";

export const authenticateAPIKey = (request: Request, response: Response, next: NextFunction) => {
  console.log(`Request from ${request.ip}`);
  if (!apiKeyCheck(request) && request.originalUrl !== "/"){
    console.log(`Failure to handle authentication: ${request.get("Automin-API-Key")}`);
    response.status(401).json({error: 'Auth-fail',
                         message: 'Failed to authenticate api-key',
                         detail: 'Server api access is secured and requires'
                         + 'the correct api-key. If you are the owner of this'
                         + 'server please cycle your keys to update, otherwise'
                         + 'please contact your server administrator for'
                         + 'further instructions'});
  }
  else {
    next();
  }
}

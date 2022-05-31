import {Request, Response, NextFunction} from "express";
import {apiKeyCheck} from "../utils/authentication";

export const authenticateAPIKey = async (request: Request, response: Response, next: NextFunction) => {
  console.log(`Request from ${request.ip}`);
  const apiCheck = apiKeyCheck(request);
  if (request.app.get("debug"))
    console.log(`Results of keycheck are: ${request.app.get("isSecure")} and ${!apiCheck}`)
  if (request.app.get("isSecure") && !(await apiCheck)){
    console.log(`Failure to handle authentication: ${request.get("Automin-API-Key")}`);
    response.status(401).json({error: 'Auth-fail',
                         message: 'Failed to authenticate api-key',
                         detail: 'Server api access is secured and requires'
                         + 'the correct api-key. If you are the owner of this'
                         + 'server please cycle your keys to update, otherwise'
                         + 'please contact your server administrator for'
                         + 'further instructions'});
    return;
  }
  else {
    if (request.app.get("debug")) {
      if (request.app.get("isSecure"))
        console.log(`Authorized api key`);
      else
        console.log(`Insecure, api-check passed`);
    }
    next();
  }
}

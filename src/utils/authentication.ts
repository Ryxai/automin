import {compare} from "bcrypt";
import {Request} from "express";

export const apiKeyCheck = async (request : Request) => {
  const default_token = request.app.get('default_token');
  const hashed_apikey = request.app.get('hashed_apikey');
  if (request.app.get("debug"))
    console.log(`Authenticating API key: default_token: ${default_token} `
                + `:: hashed_apikey: ${hashed_apikey}`);
  const result = await compare(request.get("Automin-API-Key") ?? default_token,
                               hashed_apikey);
  if (request.app.get("debug"))
    console.log(`Result of the comparison was ${result}`);
  return result;
}


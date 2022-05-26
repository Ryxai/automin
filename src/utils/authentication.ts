import {compare} from "bcrypt";
import process from "process";
import {Request} from "express";

export const hashed_apikey = process.env.APIKEY || "";
export const default_token = "DEFAULT!!!"; // To satisfy typing issues w/ bcrypt
export const isSecure = process.env.APIKEY 
  ? (process.env.SECURE === "true") || false 
  : false;

export const apiKeyCheck = async (req : Request) => {
  const isSecure = req.app.get('isSecure');
  const default_token = req.app.get('default_token');
  const hashed_apikey = req.app.get('hashed_apikey');
  return isSecure &&
    !(await compare(req.get("Automin-API-Key") ?? default_token, hashed_apikey));
}


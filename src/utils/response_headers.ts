import {Response} from "express";

export const setMarvinRequiredHeaders = (res : Response) : Response => {
  res.set("Access-Control-Allow-Headers", "Content-Type, contenttype, X-Api-Key, Access-Control-Allow-Methods,Access-Control-Allow-Origin,Automin-API-Key,Origin-Request");
  res.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.set("Access-Control-Allow-Origin","*");
  return res;
}

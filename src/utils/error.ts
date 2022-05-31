import axios, {AxiosError} from "axios";
import {Request} from "express";

export const logAxiosError = (error: Error | AxiosError, request: Request)
  : void =>
  {
    if (axios.isAxiosError(error)) {
      if (error.response)
        console.log(`Error detected: `
          + `\nStatus: ${error.response.status}`
          + `\nHeaders: ${error.response.headers}`
          + `\nBody: ${error.response.data}`);
      else if(error.request)
        console.log(`No reponse to request. Request was: ${error.request}`);
      console.log(`Logging config: ${error.config}`);
    }
    else {
        console.log(`Errror message was: ${error.message}`);
    }
  }




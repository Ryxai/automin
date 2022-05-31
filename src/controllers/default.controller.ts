import {Request, Response} from "express";

export const defaultRoute = (_: Request, response: Response) => {
  console.log(`Default page request triggered`);
  response.send("See https://github.com/Ryxai/automin for details on how to "
                + "host your own!");
}

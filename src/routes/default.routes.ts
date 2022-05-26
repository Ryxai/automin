import express from "express";
import {router as rescuetime} from "./rescuetime.routes";
import {defaultRoute} from "../controllers/default.controller";
import {router as timer} from "./timer.routes";
import {router as cors} from "./cors.routes";

const router = express.Router();
router.use('/timer',timer);
router.use('/rescuetime',rescuetime);
router.use('/cors',cors);
router.get('/',defaultRoute);

export {router};


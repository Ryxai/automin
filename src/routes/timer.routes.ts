import express from "express";
import {getRemainingDuration, updateServerTimer,getTimerObject} from "../controllers/timer.controller";
const router = express.Router();

router.get("/remaining", getRemainingDuration);
router.post("/", updateServerTimer);
router.get("/",getTimerObject);

export {router};

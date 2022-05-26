import express from "express";
import {getRemainingDuration, updateServerTimer,getTimerObject} from "../controllers/timer.controller";
import {authenticateAPIKey} from "../middleware/auth.middleware";
const router = express.Router();

router.use(authenticateAPIKey);
router.get("/remaining", getRemainingDuration);
router.post("/", updateServerTimer);
router.get("/",getTimerObject);

export {router};

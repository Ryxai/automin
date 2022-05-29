import express from "express";
import {getRemainingDuration,
  updateServerTimer,
  getTimerObject,
  pauseTimer,
  unpauseTimer
} from "../controllers/timer.controller";
import {authenticateAPIKey} from "../middleware/auth.middleware";
const router = express.Router();

router.use(authenticateAPIKey);
router.get("/remaining", getRemainingDuration);
router.get("/pause", pauseTimer);
router.get("/unpause", unpauseTimer);
router.post("/", updateServerTimer);
router.get("/",getTimerObject);

export {router};

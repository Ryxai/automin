import express from 'express';
import {start_focustime, end_focustime} from "../controllers/rescuetime.controller";
import {authenticateAPIKey} from "../middleware/auth.middleware";
const router = express.Router();
router.use(authenticateAPIKey);
router.post("/start", start_focustime);
router.post("/end", end_focustime)

export {router};

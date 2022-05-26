import express from 'express';
import {start_focustime, end_focustime} from "../controllers/rescuetime.controller";
const router = express.Router();

router.post("/start", start_focustime);
router.post("/end", end_focustime)

export {router};

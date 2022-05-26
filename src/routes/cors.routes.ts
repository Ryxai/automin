import express from "express";
import {marvinCORS} from "../controllers/cors.controller";
const router = express.Router();

router.options('/*', marvinCORS);

export {router};


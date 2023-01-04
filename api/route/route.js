import express from "express"

import {candidates} from "../controller/candidates.js"

const router = express.Router();

router.get("/candidates", candidates) 
  
export default router
import express from "express";
import { authenticate } from "../middlewares/auth.js";
import * as peers from "../middlewares/peers.js";

const router = express.Router();

router.get("/", authenticate, peers.getPeer);

router.get("/channels", authenticate, peers.getChannels);

export { router };
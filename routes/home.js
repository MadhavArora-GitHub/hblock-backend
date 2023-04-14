import express from "express";
import { authenticate } from "../middlewares/auth.js";
import * as users from "../middlewares/users.js";

const router = express.Router();

router.post("/check-api-key", users.checkApiKey);

router.get("/", authenticate, users.userDetails);

router.get("/new-request-id", authenticate, users.getNewId);

export { router };
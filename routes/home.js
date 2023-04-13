import express from "express";
import { authenticate } from "../middlewares/auth.js";
import * as users from "../middlewares/users.js";

const router = express.Router();

router.get("/", authenticate, async (req, res)=>{
    res.status(200).json({
        message: "perfetto"
    });
});

export { router };
import * as dotenv from "dotenv"
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { router as peerRouter } from "./routes/peer.js"
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use("/peer", peerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});
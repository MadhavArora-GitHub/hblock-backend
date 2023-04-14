import { txCount } from "../app.js";
import jwt from "jsonwebtoken";

export async function userDetails(req, res){
    return res.status(200).json({
        ORG_NAME: process.env.ORG_NAME,
        ORG_ID: process.env.ORG_ID,
        CHANNEL_NAME: process.env.CHANNEL_NAME,
        CHAINCODE_NAME: process.env.CHAINCODE_NAME
    });
}

export async function getNewId(req, res){
    return res.status(200).json({
        id: `${process.env.ORG_NAME}${txCount}`
    });
}

export async function checkApiKey(req, res){
    const apiKey = req.body.apiKey;

    try {    
        const payload = jwt.verify(apiKey, process.env.JWT_SECRET);
        let isValid = false;
        if (payload.MSP_ID===process.env.MSP_ID && payload.ORG_NAME===process.env.ORG_NAME && payload.ORG_ID===process.env.ORG_ID){
            isValid = true;
        }

        return res.status(200).json({ isValid });
    }
    catch (err){
        return res.status(500).json({ err });
    }
}
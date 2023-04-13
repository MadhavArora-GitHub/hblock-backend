import express from "express";
import { authenticate } from "../middlewares/auth.js";
import * as transactions from "../middlewares/transactions.js";

const router = express.Router();

router.post("/query", authenticate, transactions.queryTransaction);

router.post("/invoke", authenticate, transactions.invokeTransaction);

router.get("/requests/get-by", authenticate, transactions.getRequestsRequestedBy);

router.get("/requests/get-to", authenticate, transactions.getRequestsRequestedTo);

router.get("/requests/:id", authenticate, transactions.getRequest);

router.get("/requests/get-all", authenticate, transactions.getAllTransactions);

router.post("/blood/request", authenticate, transactions.requestBlood);

router.post("/blood/grant", authenticate, transactions.grantBlood);

router.post("/blood/decline", authenticate, transactions.declineRequest);

router.post("/blood/shut", authenticate, transactions.shutRequest);

export { router };
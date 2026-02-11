import { Router } from "express";
const paymentRouter = Router();
import { verifyToken, isUser } from "../middleware/authMiddleware.js";
import { makePayment } from "../controllers/payment.controller.js";

paymentRouter.route("/make").post(verifyToken, isUser, makePayment);

export default paymentRouter;
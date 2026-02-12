import { Router } from "express";
import { placeOrder, getMyOrders } from "../controllers/order.controller.js";
import { verifyToken, isUser } from "../middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.route("/place").post(verifyToken, isUser, placeOrder);
orderRouter.route("/my-orders").get(verifyToken, isUser, getMyOrders);

export default orderRouter;
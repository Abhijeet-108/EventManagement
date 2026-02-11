import { Router } from "express";
const cartRouter = Router();
import { verifyToken, isUser } from "../middleware/authMiddleware.js";
import { addToCart, cancelCart } from "../controllers/cart.controller.js";

cartRouter.route("/add").post(verifyToken, isUser, addToCart);
cartRouter.route("/cancel/:id").put(verifyToken, isUser, cancelCart);

export default cartRouter;
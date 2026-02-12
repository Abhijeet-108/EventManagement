import { Router } from "express";
const cartRouter = Router();
import { verifyToken, isUser } from "../middleware/authMiddleware.js";
import { addToCart, cancelCart, getMyCart } from "../controllers/cart.controller.js";

cartRouter.route("/add").post(verifyToken, isUser, addToCart);
cartRouter.route("/cancel/:id").delete(verifyToken, isUser, cancelCart);
cartRouter.route("/my-cart").get(verifyToken, isUser, getMyCart);

export default cartRouter;
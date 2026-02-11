import { Router } from "express";
const paymentRouter = Router();
import { verifyToken, isUser } from "../middleware/authMiddleware.js";
import {addGuest, updateGuest, deleteGuest} from "../controllers/guest.controller.js";

paymentRouter.route("/add").post(verifyToken, isUser, addGuest);
paymentRouter.route("/update/:id").put(verifyToken, isUser, updateGuest);
paymentRouter.route("/delete/:id").delete(verifyToken, isUser, deleteGuest);

export default paymentRouter;
import { Router } from "express"
import { userregister, userlogin, viewVendor, checkOrderStatus } from "../controllers/user.controller.js";
import { verifyToken, isUser } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/register").post(userregister);
userRouter.route("/login").post(userlogin);

userRouter.route("/vendors").get(verifyToken, isUser, viewVendor);
userRouter.route("/orders").get(verifyToken, isUser, checkOrderStatus);

export default userRouter;
import { Router } from "express"
import { adminLogin, adminRegister, getAllMemberships, addMembership, updateMembership, getAllUsers, getAllVendors } from "../controllers/admin.controller.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const adminRouter = Router();

adminRouter.route("/register")
    .post(adminRegister);
adminRouter.route("/login")
    .post(adminLogin);

adminRouter.route("/memberships")
  .get(verifyToken, isAdmin, getAllMemberships)
  .post(verifyToken, isAdmin, addMembership);

adminRouter.route("/membership/:id")
  .put(verifyToken, isAdmin, updateMembership)

adminRouter.route("/users")
  .get(verifyToken, isAdmin, getAllUsers);

adminRouter.route("/vendors")
  .get(verifyToken, isAdmin, getAllVendors);

export default adminRouter;
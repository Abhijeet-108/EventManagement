import { Router } from "express";
import {vendorregister, Vendorlogin, addItem, getMyItems, deleteItem, viewTransactions } from "../controllers/vendor.controller.js";

import { verifyToken, isVendor } from "../middleware/authMiddleware.js";

const vendorRouter = Router();

vendorRouter.route("/register").post(vendorregister);
vendorRouter.route("/login").post(Vendorlogin);

vendorRouter.route("/items")
  .post(verifyToken, isVendor, addItem)
  .get(verifyToken, isVendor, getMyItems);

vendorRouter.route("/items/:id").delete(verifyToken, isVendor, deleteItem);

vendorRouter.route("/transactions").get(verifyToken, isVendor, viewTransactions);

export default vendorRouter;

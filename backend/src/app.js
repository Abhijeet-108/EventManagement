import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser());

// routes
import userRouter from "./routes/user.route.js";
import vendorRouter from "./routes/vendor.route.js";
import adminRouter from "./routes/admin.route.js";
import cartRouter from "./routes/cart.route.js";
import paymentRouter from "./routes/payment.route.js";
import guestRouter from "./routes/guest.route.js";
import orderRouter from "./routes/order.route.js";

app.use("/api/users", userRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/admins", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/guest", guestRouter);
app.use("/api/orders", orderRouter);

export {app};
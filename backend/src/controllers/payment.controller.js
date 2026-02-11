import Payment from "../models/payment.model.js";
import Cart from "../models/cart.model.js";

const makePayment = async (req, res) => {
    try {
        const { cartId } = req.body;

        const cart = await Cart.findById(cartId);

        const payment = await Payment.create({
        userId: req.user.id,
        cartId,
        amount: cart.totalAmount,
        paymentStatus: "success"
        });

        cart.status = "paid";
        await cart.save();

        res.json({ message: "Payment successful", payment });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { makePayment };
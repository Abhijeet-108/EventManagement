import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js"

const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({
            userId,
            status: "pending"
        }).populate("items.itemId", "name price");

        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = cart.items.map(i => ({
            itemId: i.itemId._id,
            name: i.itemId.name,
            price: i.itemId.price,
            quantity: i.quantity
        }));

        const order = await Order.create({
            userId,
            items: orderItems,
            totalAmount: req.body.totalAmount,
            paymentMethod: req.body.paymentMethod,
            customerDetails: req.body.customerDetails
        })

        cart.items = [];
        await cart.save();

        res.json({ message: "Order placed successfully", order });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate("items.itemId", "name price image")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { placeOrder, getMyOrders };
import Cart from "../models/cart.model.js";

const addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id, status: "pending" });

        if (!cart) {
        cart = await Cart.create({
            userId: req.user.id,
            items: []
        });
        }

        cart.items.push({ itemId, quantity });
        await cart.save();

        res.json({ message: "Item added to cart", cart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cancelCart = async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.id, { status: "cancelled" });
        res.json({ message: "Cart cancelled" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { addToCart, cancelCart };
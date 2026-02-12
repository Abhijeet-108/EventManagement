import Cart from "../models/cart.model.js";
import Item from "../models/item.model.js";

const addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.user._id, status: "pending" });
        if (!cart) {
            cart = await Cart.create({
                userId: req.user._id,
                items: []
            });
        }
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const existingItem = cart.items.find(i => i.itemId.toString() === itemId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ itemId, quantity });
        }

        await cart.save();

        res.json({ message: "Item added to cart", cart });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMyCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ 
            userId: req.user._id, 
            status: "pending" 
        }).populate("items.itemId", "name price");
        if(!cart) {
            return res.json({ message: "Cart is empty", items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const cancelCart = async (req, res) => {
    try {
        const {itemId} = req.params;

        const cart = await Cart.findOne({
            userId: req.user._id,
            status: "pending"
        });

        cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);

        await cart.save();

        res.json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { addToCart, cancelCart, getMyCart };
import User from "../models/user.model.js";
import Item from "../models/item.model.js";
import Cart from "../models/cart.model.js";
import Vendor from "../models/vendor.model.js";

const userregister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ name });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await User.hashPassword(password);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log("New user created: ", newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userlogin = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name }).select("+password");

        if(!user){
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await user.isPasswordCorrect(password);

        if(!isMatch){
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = user.generateAuthToken();

        user.password = undefined;

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false 
        });

        res.status(200).json({ token, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const viewVendor = async (req, res) => {
    try {
        const items = await Item.find().populate("vendorId", "name category");
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
}

const getVendorsByCategory = async (req, res) => {
  try {

    const vendors = await Vendor.find({
      category: req.params.category
    });

    res.json(vendors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.vendorId);
        const items = await Item.find({ vendorId: req.params.vendorId });
        res.json({ vendorName: vendor.name, items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const checkOrderStatus = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user.id });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { userregister, userlogin, viewVendor, checkOrderStatus, getVendorsByCategory, getVendorById };

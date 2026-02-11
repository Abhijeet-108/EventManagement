import Vendor from "../models/vendor.model.js";
import Item from "../models/item.model.js";
import Cart from "../models/cart.model.js";

const vendorregister = async (req, res) => {
  try {
    const { name, email, password, category } = req.body;

    const existingVendor = await Vendor.findOne({ name });

    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const hashedPassword = await Vendor.hashPassword(password);

    const newVendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      category
    });

    const vendorObj = newVendor.toObject();
    delete vendorObj.password;

    return res.status(201).json({
      message: "Vendor registered successfully",
      vendor: vendorObj
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Vendorlogin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const vendor = await Vendor.findOne({ name }).select("+password");

    if (!vendor) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await vendor.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = vendor.generateAuthToken();

    vendor.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });

    return res.status(200).json({
      token,
      vendor
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const item = await Item.create({
      vendorId: req.user.id,
      name,
      price,
      description
    });

    res.status(201).json({ message: "Item added", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getMyItems  = async (req, res) => {
  try {
    const items = await Item.find({ vendorId: req.user.id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const viewTransactions = async (req, res) => {
  try {
    const transactions = await Cart.find({ status: "paid" })
      .populate("items.itemId");

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { vendorregister, Vendorlogin, addItem, getMyItems , deleteItem, viewTransactions };

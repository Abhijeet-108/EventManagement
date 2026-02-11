import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import vendor from "../models/vendor.model.js";
import Membership from "../models/membership.model.js"; 

const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await Admin.hashPassword(password);

    const admin = await Admin.create({
      username,
      password : hashedPassword
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // console.log("Login attempt:", { username, password });

    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.isPasswordCorrect(password);
    // console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = admin.generateToken();

    res.status(200).json({
      message: "Login successful",
      token,
      admin
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

const getAllVendors = async (req, res) => {
  const vendors = await vendor.find();
  res.json(vendors);
}

const addMembership = async (req, res) => {
  const { vendorId, type, price, durationInDays } = req.body;

  const membership = await Membership.create({
    vendorId,
    type,
    price,
    durationInDays,
    assignedBy: req.user.id
  });

  res.json(membership);
}

const updateMembership = async (req, res) => {
  try {
    const { type, price, durationInDays } = req.body;

    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      {
        type,
        price,
        durationInDays
      },
      { new: true }
    );

    if (!updatedMembership)
      return res.status(404).json({ message: "Membership not found" });

    res.status(200).json({
      message: "Membership updated successfully",
      updatedMembership
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate("vendorId", "name email category")
      .populate("assignedBy", "username");

    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export { adminRegister, adminLogin, getAllUsers, getAllVendors, addMembership, updateMembership, getAllMemberships };

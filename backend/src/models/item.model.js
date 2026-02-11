import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["available", "requested", "sold"],
    default: "available"
  }
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);

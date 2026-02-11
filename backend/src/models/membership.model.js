import mongoose from "mongoose";


const membershipSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor", 
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: Number,
  durationInDays: Number,
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
}, { timestamps: true });

export default mongoose.model("Membership", membershipSchema);

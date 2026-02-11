import mongoose from "mongoose";


const guestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  phone: String,
  email: String
}, { timestamps: true });

export default mongoose.model("Guest", guestSchema);

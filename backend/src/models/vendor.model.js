import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Catering", "Florist", "Decoration", "Lighting"]
  }
}, {
  timestamps: true
});


vendorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

vendorSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

vendorSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

export default mongoose.model("Vendor", vendorSchema);
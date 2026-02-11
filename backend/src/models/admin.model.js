import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false
    }
  },
  { timestamps: true }
);


adminSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

adminSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
}

export default mongoose.model("Admin", adminSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item"
            },
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: String,

    customerDetails: {
        name: String,
        email: String,
        number: String,
        address: String,
        city: String,
        state: String,
        pincode: String
    },

    status: {
        type: String,
        default: "placed"
    }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

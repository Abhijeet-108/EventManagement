import React, { useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {

    const location = useLocation();
    const navigate = useNavigate();

    const cartItems = location.state?.cartItems || [];
    const grandTotal = location.state?.grandTotal || 0;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        number: "",
        state: "",
        pincode: "",
        paymentMethod: ""
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async() => {
        try {
            const token = localStorage.getItem("token");
            await api.post("/orders/place", {
                items: cartItems,
                totalAmount: grandTotal,
                paymentMethod: formData.paymentMethod,
                customerDetails: {
                    name: formData.name,
                    email: formData.email,
                    number: formData.number,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                }
            },{
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Order placed successfully!");
            navigate("/user-dashboard");
        } catch (error) {
            console.log("Order placement error: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center p-10">

        <div className="bg-[#5f76b5] text-black px-20 py-6 rounded-xl mb-12 text-center">
            <h2 className="text-xl font-semibold">Item</h2>
            <h3 className="text-lg font-medium">
                Grand Total ₹ {grandTotal}/-
            </h3>
        </div>

        <div className="bg-[#5f76b5] px-20 py-4 text-black rounded-xl mb-12">
            <h2 className="text-lg font-semibold">Details</h2>
        </div>

        <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-10">

            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            <input
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            </div>
            <div className="flex flex-col gap-10">

            <input
                name="number"
                placeholder="Number"
                value={formData.number}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black"
            >
                <option value="">Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
            </select>

            <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            <input
                name="pincode"
                placeholder="Pin Code"
                value={formData.pincode}
                onChange={handleChange}
                className="bg-[#5f76b5] p-6 rounded-xl text-black placeholder-black"
            />

            </div>

        </div>
        <button
            onClick={handleSubmit}
            className="mt-16 bg-white border-2 border-green-500 px-20 py-4 text-lg font-semibold"
        >
            Place Order
        </button>

        </div>
    );
}

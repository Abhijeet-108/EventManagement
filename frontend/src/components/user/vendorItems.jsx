import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function VendorItems() {

    const { vendorId } = useParams();
    const [items, setItems] = useState([]);
    const [vendorName, setVendorName] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, [vendorId]);

    const fetchItems = async () => {
        try {
            const res = await api.get(`/users/vendor-items/${vendorId}`);
            console.log("Vendor Items response:", res.data);
            setItems(res.data.items);
            setVendorName(res.data.vendorName);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = async(item) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Adding to cart with token:", token);
            await api.post("/cart/add",{
                itemId: item._id,
                quantity: 1
            },{
                headers:{ Authorization: `Bearer ${token}` }
            });
            alert("Item added to cart!");
            navigate("/cart");
        } catch (error) {
            
        }
    }

    const handleHome = () => {
        navigate("/user-dashboard");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/user-login");
    }

  return (
    <div className="min-h-screen bg-gray-200 p-10">

        <h2 className="text-2xl font-semibold mb-8">
            Vendor Items
        </h2>

        <div className="flex justify-between mb-10">

            <button
            onClick={handleHome}
            className="border-2 border-green-500 px-8 py-2"
            >
            Home
            </button>

            <h2 className="bg-blue-600 text-black px-20 py-3 text-lg font-semibold">
            {vendorName || "Vendor Name"}
            </h2>

            <button
            onClick={handleLogout}
            className="border-2 border-green-500 px-8 py-2"
            >
            LogOut
            </button>
        </div>

        <div className="mb-8">
            <button className="bg-blue-600 text-black px-20 py-3 font-semibold">
            Products
            </button>
        </div>

        <div className="grid grid-cols-3 gap-8">

            {items.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow">

                <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover mb-4"
                />

                <h3 className="text-lg font-semibold">
                {item.name}
                </h3>

                <p className="text-gray-600">
                ₹ {item.price}
                </p>

                <button
                onClick={() => handleAddToCart(item)}
                className="bg-white border-2 border-green-400 px-6 py-2"
                >
                Add to Cart
                </button>

            </div>
            ))}

        </div>

    </div>
  );
}

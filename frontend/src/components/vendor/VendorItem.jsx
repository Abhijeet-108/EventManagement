import React, {useState, useEffect} from "react";
import { api } from "../../services/api.js"

export default function ItemViewPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchItems = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/vendors/items", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setItems(res.data);
            setLoading(false); 
        } catch (error) {
            console.error("Error fetching items:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-600">Loading items...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">

        <h1 className="text-2xl font-bold text-center mb-10">
            Available Items
        </h1>

        {items.length === 0 ? (
            <h2 className="text-center">No items found</h2>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">


        {items.map((item) => (
            <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center"
            >
                <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h2 className="text-lg font-semibold">
                {item.name}
                </h2>

                <p className="text-gray-700 mt-2">
                ₹ {item.price}
                </p>
            </div>
        ))}
        </div>
        )}
        </div>
    );
}

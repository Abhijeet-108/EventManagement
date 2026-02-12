import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function ProductStatus() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/orders/my-orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Orders response:", res);
            setOrders(res.data);
        } catch (error) {
            console.log("Fetch orders error: ", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleHome = () => {
        navigate("/user-dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("vendor");
        navigate("/vendor-login");
    };

    const handleUpdate = (id) => {
        alert("Update Order " + id);
    };

    const handleDelete = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-200 p-10">

        <div className="bg-[#5f76b5] text-center text-black py-4 text-xl font-semibold mb-10">
            Order Status
        </div>

        <div className="flex justify-between mb-10">
            <button
            onClick={handleHome}
            className="bg-[#5f76b5] px-16 py-3 text-black rounded"
            >
                Home
            </button>

            <button
            onClick={handleLogout}
            className="bg-[#5f76b5] px-16 py-3 text-black rounded"
            >
                LogOut
            </button>
        </div>

        <div className="grid grid-cols-4 gap-16 justify-between mb-6 font-semibold">
            <div className="bg-[#5f76b5] p-4 w-36 text-center rounded">Name</div>
            <div className="bg-[#5f76b5] p-4 w-36 text-center rounded">E-Mail</div>
            <div className="bg-[#5f76b5] p-4 w-36 text-center rounded">Address</div>
            <div className="bg-[#5f76b5] p-4 text-center rounded">Status</div>
        </div>

        {orders.map(order => (
            <div key={order.id} className="grid grid-cols-4 gap-16 mb-6">

            <div className="bg-[#5f76b5] p-6 w-40 text-center rounded">
                {order.customerDetails?.name}
            </div>

            <div className="bg-[#5f76b5] p-6 w-40 text-center rounded">
                {order.customerDetails?.email}
            </div>

            <div className="bg-[#5f76b5] p-6 w-40 text-center rounded">
                {order.customerDetails?.address}
            </div>

            <div className="bg-[#5f76b5] p-6 text-center rounded">
                {order.status}
            </div>

            </div>
        ))}

        </div>
    );
}

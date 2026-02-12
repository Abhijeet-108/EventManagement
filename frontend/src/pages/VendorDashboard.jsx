import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {

    const [vendorData, setVendorData] = useState(null);

    const navigate = useNavigate();

    const handleYourItem = () => {
        navigate("/vendor-items");
    };

    const handleAddItem = () => {
        navigate("/add-item");
    };

    const handleTransaction = () => {
        alert("Navigate to Transactions");
    };

    const handleLogout = () => {
       localStorage.removeItem("token");
        localStorage.removeItem("vendor");
        navigate("/vendor-login");
    };

    useEffect(() => {
        const vendor = localStorage.getItem("vendor");
        console.log("Vendor data from localStorage:", vendor);
        if (vendor) {
            setVendorData(JSON.parse(vendor));
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#5f76b5] flex flex-col items-center justify-center">
        <div className="bg-gray-200 w-[80%] max-w-4xl p-6 rounded-md text-center mb-16 shadow-md">
            <div className="border border-blue-400 inline-block px-8 py-1 mb-2 text-lg font-semibold">
            Welcome
            </div>
            <h2 className="text-xl font-medium">{vendorData?.name || " "}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
            <button
            onClick={handleYourItem}
            className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
            >
            Your Item
            </button>

            <button
            onClick={handleAddItem}
            className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
            >
            Add New Item
            </button>

            <button
            onClick={handleTransaction}
            className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
            >
            Transaction
            </button>

            <button
            onClick={handleLogout}
            className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
            >
            LogOut
            </button>
        </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function VendorList() {

    const { category } = useParams();
    const [vendors, setVendors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchVendors();
    }, [category]);

    const fetchVendors = async () => {
        try {

        const res = await api.get(`/users/vendors/${category}`);
        setVendors(res.data);

        } catch (error) {
        console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/user-login";
    }

    const handleHome = () => {
        navigate("/user-dashboard");
    }

    const handleShop = (vendorId) => {
        navigate(`/vendor-items/${vendorId}`);
    }

    return (
        <div className="min-h-screen bg-gray-200 p-10">
            <div className="bg-white border p-6 flex justify-between items-center mb-10">

            <button
                onClick={handleHome}
                className="border-2 border-green-500 px-8 py-2"
            >
            Home
            </button>

        <h2 className="bg-blue-600 text-black px-20 py-3 text-lg font-semibold">
            Vendors {category}
        </h2>
        <button
            onClick={handleLogout}
            className="border-2 border-green-500 px-8 py-2"
            >
            LogOut
            </button>

        </div>

        <div className="grid grid-cols-3 gap-8">

            {vendors.map((vendor) => (
            <div
                key={vendor._id}
                className="bg-white p-6 rounded-xl shadow-md"
            >
                <h3 className="text-lg font-semibold">
                {vendor.name}
                </h3>

                <p>{vendor.email}</p>

                <p className="text-gray-600">
                Category: {vendor.category}
                </p>

                <button
                onClick={() => handleShop(vendor._id)}
                className="bg-white border-2 border-green-500 px-6 py-2"
                >
                Shop Item
                </button>
            </div>
            ))}

        </div>

        </div>
    );
}

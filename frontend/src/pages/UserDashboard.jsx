import React, { useState } from "react";

export default function UserDashboard() {

  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Catering", "Florist", "Decoration", "Lighting"];

  const handleCart = () => alert("Open Cart");
  const handleGuestList = () => alert("Open Guest List");
  const handleOrderStatus = () => alert("Check Order Status");
  const handleLogout = () => alert("Logging out...");

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <div className="flex-1 p-10">
        <div className="bg-blue-500 text-center text-black py-3 font-semibold text-xl mb-16">
          WELCOME USER
        </div>
        <div className="flex justify-around flex-wrap gap-10">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-blue-500 px-12 py-6 rounded-xl text-black font-medium shadow-md"
          >
            <option value="">Vendor</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={handleCart}
            className="bg-blue-500 px-12 py-6 rounded-xl text-black font-medium shadow-md"
          >
            Cart
          </button>

          <button
            onClick={handleGuestList}
            className="bg-blue-500 px-12 py-6 rounded-xl text-black font-medium shadow-md"
          >
            Guest List
          </button>

          <button
            onClick={handleOrderStatus}
            className="bg-blue-500 px-12 py-6 rounded-xl text-black font-medium shadow-md"
          >
            Order Status
          </button>

        </div>
        <div className="flex justify-center mt-20">
          <button
            onClick={handleLogout}
            className="bg-blue-500 px-16 py-6 rounded-xl text-black font-medium shadow-md"
          >
            LogOut
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const categories = ["Catering", "Florist", "Decoration", "Lighting"];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      navigate(`/vendors/${category}`);
    }
  };

  const handleCart = () => {
    navigate("/cart")
  };
  const handleGuestList = () => alert("Open Guest List");
  const handleOrderStatus = () => {
    navigate("/product-status"); 
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
    navigate("/user-login");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("Vendor data from localStorage:", user);
    if (user) {
      setName(JSON.parse(user));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <div className="flex-1 p-10">
        <div className="bg-blue-500 text-center text-black py-3 font-semibold text-xl mb-16">
          WELCOME {name?.name || " "}
        </div>
        <div className="flex justify-around flex-wrap gap-10">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
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

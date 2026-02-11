import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function VendorSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async() => {
    try {

      const res = await api.post("/vendors/register", {
        name,
        email,
        password,
        category
      });

      setMessage(res.data.message);
      alert(res.data.message);

      useNavigate("/vendor-login");

    } catch (error) {

      const msg =
        error?.response?.data?.message ||
        "Signup failed";

      setMessage(msg);
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[1100px] bg-gray-100 border border-gray-300 p-10 shadow-inner">
        <div className="bg-blue-200 text-center py-4 text-xl font-semibold border border-blue-300 rounded-lg mb-14">
          Event Management System
        </div>

        <div className="flex flex-col gap-10 items-center">
          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Name
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vendor"
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            />
          </div>
          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Email
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vendor"
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            />
          </div>

          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Password
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vendor"
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            />
          </div>

          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Category
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            >
              <option value="">Select Category</option>
              <option value="Catering">Catering</option>
              <option value="Florist">Florist</option>
              <option value="Decoration">Decoration</option>
              <option value="Lighting">Lighting</option>
            </select>
          </div>

          <div className="flex justify-center w-full mt-6">
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-black px-12 py-4 rounded-lg font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
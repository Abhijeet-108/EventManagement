import React, { useState } from "react";
import { api } from "../services/api";
import { use } from "react";

export default function VendorLogin() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/vendors/login", {
        name,
        password
      });

      console.log("Login response:", res.data);

      if (res.status === 200) {
        setMessage("Login successful!");
        alert("Login successful!");
      }

      navigate("/vendor-dashboard");

    } catch (error) {
      console.log("Login error:", error);

      setMessage(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  const handleCancel = () => {
    setUserId("");
    setPassword("");
    setMessage("");
  };

  const handleBack = () => {
    alert("Back Clicked");
  };

  const handleChart = () => {
    alert("Chart Clicked");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[950px] bg-gray-100 border border-gray-300 p-10 shadow-inner">

        <div className="flex justify-between mb-8">
          <button
            onClick={handleChart}
            className="bg-blue-600 text-black px-8 py-3 font-medium"
          >
            CHART
          </button>

          <button
            onClick={handleBack}
            className="bg-blue-600 text-black px-8 py-3 font-medium"
          >
            BACK
          </button>
        </div>

        <div className="bg-blue-200 text-center py-3 text-xl font-semibold border border-blue-300 mb-12">
          Event Management System
        </div>
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-10 w-full justify-center">
            <div className="bg-blue-500 text-black px-6 py-3 rounded-md w-40 text-center font-medium">
              User Id
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vendor"
              className="bg-blue-100 border border-blue-300 px-4 py-3 w-[450px] outline-none"
              required
            />
          </div>
          <div className="flex items-center gap-10 w-full justify-center">
            <div className="bg-blue-500 text-black px-6 py-3 rounded-md w-40 text-center font-medium">
              Password
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vendor"
              className="bg-blue-100 border border-blue-300 px-4 py-3 w-[450px] outline-none"
              required
            />
          </div>
          <div className="flex gap-16 mt-10">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-black px-10 py-3 rounded-xl shadow-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gray-400 hover:bg-gray-500 text-black px-10 py-3 rounded-xl shadow-md"
            >
              Login
            </button>
          </div>
          {message && (
            <p className="text-red-500 font-medium">{message}</p>
          )}

        </form>
      </div>
    </div>
  );
}

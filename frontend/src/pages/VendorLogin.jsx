import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function VendorLogin() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ⭐ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/vendor-dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/vendors/login", {
        name,
        password
      });

      // ✅ Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("vendor", JSON.stringify(res.data.vendor));

      navigate("/vendor-dashboard");

    } catch (error) {

      setMessage(
        error?.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setPassword("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[950px] bg-gray-100 border border-gray-300 p-10 shadow-inner">

        <div className="bg-blue-200 text-center py-3 text-xl font-semibold border border-blue-300 mb-12">
          Event Management System
        </div>

        <form onSubmit={handleLogin} className="flex flex-col items-center gap-8">

          {/* Username */}
          <div className="flex items-center gap-10 w-full justify-center">
            <div className="bg-blue-500 px-6 py-3 rounded-md w-40 text-center font-medium">
              User Id
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage("");
              }}
              className="bg-blue-100 border px-4 py-3 w-[450px]"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-10 w-full justify-center">
            <div className="bg-blue-500 px-6 py-3 rounded-md w-40 text-center font-medium">
              Password
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              className="bg-blue-100 border px-4 py-3 w-[450px]"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-16 mt-10">

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 px-10 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-400 px-10 py-3 rounded-xl"
            >
              {loading ? "Logging..." : "Login"}
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

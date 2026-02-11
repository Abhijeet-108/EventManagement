import React, { useState } from "react";
import { api } from "../services/api";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const res = await api.post("/admins/login", {
            username,
            password
            });
    
            console.log("Login response:", res.data);
    
            if (res.status === 200) {
            setMessage("Login successful!");
            alert("Login successful!");
            }
    
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
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[900px] bg-gray-100 border border-gray-300 p-10 shadow-inner">
        <div className="bg-blue-200 text-center py-3 text-xl font-semibold border border-blue-300 mb-12">
          Event Management System
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-10 w-full justify-center">
            <div className="bg-blue-500 text-black px-6 py-3 rounded-md w-40 text-center font-medium">
              User Id
            </div>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin"
              className="bg-blue-100 border border-blue-300 px-4 py-3 w-[450px] outline-none"
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
              placeholder="Admin"
              className="bg-blue-100 border border-blue-300 px-4 py-3 w-[450px] outline-none"
            />
          </div>
          <div className="flex gap-16 mt-10">
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-black px-10 py-3 rounded-xl shadow-md"
            >
              Cancel
            </button>

            <button
              onClick={handleLogin}
              className="bg-gray-400 hover:bg-gray-500 text-black px-10 py-3 rounded-xl shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
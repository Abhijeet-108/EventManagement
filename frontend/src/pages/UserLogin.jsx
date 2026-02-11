import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/users/login", {
        name,
        password
      });

      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful!");
      alert("Login successful!");

      navigate("/user-dashboard");

    } catch (error) {

      console.log("Login error:", error);

      setMessage(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  const handleCancel = () => {
    setName("");
    setPassword("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">

      <div className="w-[900px] bg-gray-100 border border-gray-300 p-10 shadow-inner">

        <div className="bg-blue-200 text-center py-3 text-xl font-semibold border border-blue-300 mb-12">
          Event Management System
        </div>

        <form onSubmit={handleLogin}>

          <div className="flex flex-col items-center gap-8">

            <div className="flex items-center gap-10 w-full justify-center">

              <div className="bg-blue-500 px-6 py-3 rounded-md w-40 text-center font-medium">
                User Id
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="User"
                className="bg-blue-100 border px-4 py-3 w-[450px] outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-10 w-full justify-center">

              <div className="bg-blue-500 px-6 py-3 rounded-md w-40 text-center font-medium">
                Password
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-blue-100 border px-4 py-3 w-[450px] outline-none"
                required
              />
            </div>

            <div className="flex gap-16 mt-10">

              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 px-10 py-3 rounded-xl shadow-md"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-gray-400 px-10 py-3 rounded-xl shadow-md"
              >
                Login
              </button>

            </div>

            {message && <p className="mt-4">{message}</p>}

          </div>

        </form>

      </div>

    </div>
  );
}

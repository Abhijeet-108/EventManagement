import React, { useState } from "react";
import { api } from "../services/api";  

export default function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    try{
        const res = api.post("/users/register", {
            name,
            email,
            password
        });
        console.log("Signup response:", res);
        alert("Signup successful!");
        setMessage("Signup successful!");
        // alert(res?.data?.message || "Signup success");


        navigate("/user-login");
    }catch(error){
        console.log("Full error:", error);
    }
  };

  const handleBack = () => {
    alert("Back Clicked");
  };

  const handleChart = () => {
    alert("Chart Clicked");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[1100px] bg-gray-100 border border-gray-300 p-10 shadow-inner">
        {/* Top Buttons */}
        <div className="flex justify-between mb-8">
          <button
            onClick={handleChart}
            className="bg-blue-600 text-black px-10 py-3 font-medium"
          >
            Chart
          </button>

          <button
            onClick={handleBack}
            className="bg-blue-600 text-black px-10 py-3 font-medium"
          >
            Back
          </button>
        </div>

        {/* Title */}
        <div className="bg-blue-200 text-center py-4 text-xl font-semibold border border-blue-300 rounded-lg mb-14">
          Event Management System
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-10 items-center">
          {/* Name */}
          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Name
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User"
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Email
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User"
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-16 w-full justify-center">
            <div className="bg-blue-500 text-black px-8 py-4 rounded-md w-48 text-center font-medium">
              Password
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="User"
              className="bg-blue-600 text-black px-6 py-4 w-[650px] outline-none"
            />
          </div>

          {/* Signup Button */}
          <div className="flex justify-end w-[800px] mt-6">
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-black px-12 py-4 rounded-lg font-medium"
            >
              Sign Up
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
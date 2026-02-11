import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const handleLogin = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-5xl">

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Vendor</h2>

          <button
            onClick={() => handleLogin("/vendor-login")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-2"
          >
            Login as Vendor
          </button>

          <button
            onClick={() => handleLogin("/vendor-signup")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Signup as Vendor
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Admin</h2>

          <button
            onClick={() => handleLogin("/admin-login")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Login as Admin
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">User</h2>

          <button
            onClick={() => handleLogin("/user-login")}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mb-2"
          >
            Login as User
          </button>

          <button
            onClick={() => handleLogin("/user-signup")}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Signup as User
          </button>
        </div>

      </div>
    </div>
  );
}

import React from "react";

export default function AdminDashboard() {

  const handleHome = () => {
    alert("Navigate to Home");
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleMaintainUser = () => {
    alert("Maintain User Section");
  };

  const handleMaintainVendor = () => {
    alert("Maintain Vendor Section");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start p-10">

      {/* Top Buttons */}
      <div className="w-full flex justify-between mb-16">
        <button
          onClick={handleHome}
          className="border-2 border-green-400 px-10 py-4 rounded-xl bg-white shadow-md hover:bg-gray-100"
        >
          Home
        </button>

        <button
          onClick={handleLogout}
          className="border-2 border-green-400 px-10 py-4 rounded-xl bg-white shadow-md hover:bg-gray-100"
        >
          LogOut
        </button>
      </div>

      {/* Welcome Box */}
      <div className="border-2 border-green-400 px-20 py-6 rounded-xl bg-white text-xl font-medium mb-20">
        Welcome Admin
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-between px-40">

        <button
          onClick={handleMaintainUser}
          className="border-2 border-green-400 px-14 py-6 rounded-xl bg-white shadow-md hover:bg-gray-100"
        >
          Maintain User
        </button>

        <button
          onClick={handleMaintainVendor}
          className="border-2 border-green-400 px-14 py-6 rounded-xl bg-white shadow-md hover:bg-gray-100"
        >
          Maintain Vendor
        </button>

      </div>

    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

export default function VendorMaintaince() {

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/admin-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const handleMembershipAdd = () => {
    alert("Add Membership");
  };

  const handleMembershipUpdate = () => {
    alert("Update Membership");
  };

  const handleUserAdd = () => {
    alert("Add User");
  };

  const handleUserUpdate = () => {
    alert("Update User");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">

      <div className="w-[900px] bg-gray-300 p-16 rounded-xl shadow-md relative">

        {/* Top Buttons */}
        <div className="flex justify-between mb-20">
          <button
            onClick={handleHome}
            className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={handleLogout}
            className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg"
          >
            LogOut
          </button>
        </div>

        {/* Membership Section */}
        <div className="flex items-center justify-between mb-20">

          <button className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg">
            Membership
          </button>

          <div className="flex flex-col gap-6">
            <button
              onClick={handleMembershipAdd}
              className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg"
            >
              Add
            </button>

            <button
              onClick={handleMembershipUpdate}
              className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg"
            >
              Update
            </button>
          </div>

        </div>

        {/* User Management Section */}
        <div className="flex items-center justify-between">

          <button className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg">
            User Management
          </button>

          <div className="flex flex-col gap-6">
            <button
              onClick={handleUserAdd}
              className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg"
            >
              Add
            </button>

            <button
              onClick={handleUserUpdate}
              className="bg-white border-2 border-green-500 px-12 py-4 rounded-lg"
            >
              Update
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

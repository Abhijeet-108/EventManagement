import React from "react";

export default function VendorDashboard() {

  const handleYourItem = () => {
    alert("Navigate to Your Items");
  };

  const handleAddItem = () => {
    alert("Navigate to Add New Item");
  };

  const handleTransaction = () => {
    alert("Navigate to Transactions");
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <div className="min-h-screen bg-[#5f76b5] flex flex-col items-center justify-center">
      {/* Welcome Box */}
      <div className="bg-gray-200 w-[80%] max-w-4xl p-6 rounded-md text-center mb-16 shadow-md">
        <div className="border border-blue-400 inline-block px-8 py-1 mb-2 text-lg font-semibold">
          Welcome
        </div>
        <h2 className="text-xl font-medium">Vendor</h2>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-10">
        <button
          onClick={handleYourItem}
          className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Your Item
        </button>

        <button
          onClick={handleAddItem}
          className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Add New Item
        </button>

        <button
          onClick={handleTransaction}
          className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Transaction
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-200 px-10 py-4 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

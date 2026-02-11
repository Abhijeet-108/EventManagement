import React, { useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export default function AddItem() {

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState(null);

  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get("/vendors/items");
      setItems(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddProduct = async () => {

    if (!productName || !productPrice) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/vendors/items", {
        name: productName,
        price: productPrice,
        image: productImage,
        description: ""
      });

      alert("Product Added");

      setProductName("");
      setProductPrice("");
      setProductImage("");

      fetchItems();

    } catch (err) {
      console.log("Add error:", err);
      alert(err?.response?.data?.message || "Error adding item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/vendors/items/${id}`);
      alert("Item deleted");
      fetchItems();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
    navigate("/vendor-login");
  };

  useEffect(() => {
    const vendor = localStorage.getItem("vendor");
    console.log("Vendor data from localStorage:", vendor);
    if (vendor) {
      setVendorData(JSON.parse(vendor));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">

      {/* Header */}
      <div className="bg-[#5f76b5] p-6 flex justify-between items-center text-black">
        <h2>Welcome {vendorData?.name || " "}</h2>

        <div className="flex gap-4">
          <button className="bg-gray-200 px-6 py-2 rounded-lg shadow">
            Product Status
          </button>

          <button className="bg-gray-200 px-6 py-2 rounded-lg shadow">
            Request Item
          </button>

          <button className="bg-gray-200 px-6 py-2 rounded-lg shadow">
            View Product
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-200 px-6 py-2 rounded-lg shadow"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="flex">

        {/* LEFT FORM */}
        <div className="bg-[#5f76b5] w-1/2 p-12 flex flex-col items-center gap-8">

          <input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-3/4 bg-gray-200 p-4 rounded-lg"
          />

          <input
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-3/4 bg-gray-200 p-4 rounded-lg"
          />

          {/* Keep as URL unless you implement multer */}
          <input
            placeholder="Image URL"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            className="w-3/4 bg-gray-200 p-4 rounded-lg"
          />

          <button
            onClick={handleAddProduct}
            disabled={loading}
            className="bg-gray-200 px-8 py-3 rounded-lg"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

        {/* RIGHT LIST */}
        <div className="w-1/2 p-12">

          <div className="grid grid-cols-4 gap-6 mb-6 font-semibold">
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {items.length === 0 && <p>No products added yet</p>}

          {items.map((item) => (
            <div key={item._id} className="grid grid-cols-4 gap-6 mb-4">

              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="h-24 object-cover rounded"
              />

              <div>{item.name}</div>

              <div>₹ {item.price}</div>

              <div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mr-2 bg-red-400 px-2 py-1 rounded"
                >
                  Delete
                </button>

                <button className="bg-yellow-400 px-2 py-1 rounded">
                  Update
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

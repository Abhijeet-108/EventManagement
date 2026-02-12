import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [])

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/cart/my-cart", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Cart response:", res);
            console.log("Cart response data:", res.data);

            if (res.data.items) {
                const formattedItems = res.data.items.map(i => ({
                    _id: i.itemId._id,
                    name: i.itemId.name,
                    price: i.itemId.price,
                    image: i.itemId.image,
                    quantity: i.quantity
                }));

                setCartItems(formattedItems);
            }

        } catch (error) {
            console.log("fetch cart error: ", error);
        }
    }

    const handleQuantityChange = (id, qty) => {
        const updated = cartItems.map(item =>
        item._id === id ? { ...item, quantity: Number(qty) } : item
        );
        setCartItems(updated);
    };

    const handleRemove = async(id) => {
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/cart/cancel/${id}`, {
                header : { Authorization: `Bearer ${token}`}
            });
            fetchCart();
        } catch (error) {
            console.log("Remove from cart error: ", error);
        }
    };

    const handleDeleteAll = () => {
        setCartItems([]);
    };

    const handleHome = () => {
        navigate("/user-dashboard");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/user-login");
    }

    const grandTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleProductStatus = () => {
        navigate("/product-status");
    }

    const handleProceedCart = () => {
        navigate("/checkout",{
            state:{
                cartItems,
                grandTotal
            }
        });
    }

    return (
        <div className="min-h-screen bg-gray-200 p-10">

        <div className="flex justify-between mb-10">

            <button onClick={handleHome} className="border-2 border-green-500 px-8 py-2 bg-white">
                Home
            </button>

            <div className="flex gap-10">
            <button className="border-2 border-green-500 px-8 py-2 bg-white">
                View Product
            </button>

            <button className="border-2 border-green-500 px-8 py-2 bg-white">
                Request Item
            </button>

            <button onClick={handleProductStatus} className="border-2 border-green-500 px-8 py-2 bg-white">
                Product Status
            </button>
            </div>

            <button onClick={handleLogout} className="border-2 border-green-500 px-8 py-2 bg-white">
            LogOut
            </button>
        </div>

        <div className="bg-blue-200 text-center py-3 font-semibold mb-10">
            Shopping Cart
        </div>


        <div className="grid grid-cols-6 gap-8 mb-6 font-semibold">

            <div className="bg-[#5f76b5] p-4 text-center text-black">Image</div>
            <div className="bg-[#5f76b5] p-4 text-center text-black">Name</div>
            <div className="bg-[#5f76b5] p-4 text-center text-black">Price</div>
            <div className="bg-[#5f76b5] p-4 text-center text-black">Quantity</div>
            <div className="bg-[#5f76b5] p-4 text-center text-black">Total Price</div>
            <div className="bg-[#5f76b5] p-4 text-center text-black">Action</div>

        </div>


        {cartItems.map(item => (
            <div key={item._id} className="grid grid-cols-6 gap-8 mb-8 items-center">

            <div className="bg-[#5f76b5] p-4 flex justify-center rounded-xl">
                <img src={item.image} alt="" className="h-20" />
            </div>

            <div className="bg-[#5f76b5] p-6 text-center rounded-xl">
                {item.name}
            </div>

            <div className="bg-[#5f76b5] p-6 text-center rounded-xl">
                ₹ {item.price}
            </div>

            <div className="bg-[#5f76b5] p-6 text-center rounded-xl">

                <select
                value={item.quantity}
                onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                }
                className="bg-transparent outline-none"
                >
                {[1, 2, 3, 4, 5].map(q => (
                    <option key={q} value={q}>
                    {q}
                    </option>
                ))}
                </select>

            </div>

            <div className="bg-[#5f76b5] p-6 text-center rounded-xl">
                ₹ {item.price * item.quantity}
            </div>

            <button
                onClick={() => handleRemove(item._id)}
                className="bg-[#5f76b5] p-6 rounded-xl text-black"
            >
                Remove
            </button>

            </div>
        ))}


        <div className="bg-[#5f76b5] p-6 flex justify-between mt-10">

            <h2 className="text-black font-semibold">
                Grand Total ₹ {grandTotal}
            </h2>

            <button
            onClick={handleDeleteAll}
            className="bg-white border-2 border-green-500 px-8 py-2"
            >
                Delete All
            </button>

        </div>


        <div className="flex justify-center mt-10">
            <button onClick={handleProceedCart} className="bg-white border-2 border-green-500 px-20 py-3">
                Proceed to CheckOut
            </button>
        </div>

        </div>
    );
}


import DashbordSidebar from "../Common/DashbordSidebar";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { API_URL } from "../Common/Http";
import { useEffect } from "react";
import Loader from "../Common/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { token } from "../Common/Admintoken";
import { useNavigate } from "react-router-dom";


const statusColors = {
  Shipped: "bg-green-100 text-yellow-700",
  pending: "bg-yellow-100 text-red-700",
  Delivared: "bg-red-100 text-green-700",
};

const paymentColors = {
  "not paid": "bg-pink-100 text-pink-700",
  "paid": "bg-green-100 text-green-700",
};

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



 const fetchOrders = async () => {
  try {
  
    const response = await fetch(`${API_URL}Allorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token()}`
      }
    });


    const result = await response.json();


    if (response.status === 200 && result.status === '200') {
      setOrders(result.orders || result.oders); // log both in case it's a typo
      toast.success(result.message || 'Orders loaded');
      setLoading(false);
    } else {
      console.error("❌ API responded with an error:", result.message || 'Unknown error');
      toast.error(result.message || 'Failed to load orders');
    }

  } catch (err) {
    console.error("🚨 Fetch failed:", err);
    toast.error("Network error. Please try again.");
  }
};

useEffect(() => {
  fetchOrders();
}, []);





  return (

<div className="min-h-screen bg-gray-50">
      <Navbar />

    <div className="min-h-screen bg-gray-100 p-6 flex gap-6">
      {/* Sidebar */}
      <DashbordSidebar/>
      

      {/* Orders Table */}
      <div className="flex-1">
        {
        loading && <Loader/>
      }
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">All Orders</h3>
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="text-left bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
          
            <tbody>
              {orders.map((order) => (
                <tr
                onClick={() => navigate(`/order/${order._id}`)}
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-blue-600" onClick={() => navigate(`/order/${order._id}`)} >{order._id}</td>
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3">{order.grand_total}</td>
                  <td className="px-4 py-3">{order.created_at}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColors[order.payment_status]}`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

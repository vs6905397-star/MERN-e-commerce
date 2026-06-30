import React, { useEffect, useState } from 'react';
import {useNavigate ,Link } from "react-router-dom";
import { getAllOrders, updateOrder } from '../services/orderApi';



export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState({});

  useEffect(() => {
      const fetchOrders = async () => {
        const data = await getAllOrders();
        setOrders(data);    
      };
      fetchOrders();
    },[]);

    useEffect(() => {
      const obj = {};

      orders.forEach((order) => {
        if(order.delivery) {
          obj[order._id] = order.delivery.split("T")[0];
        } else if (order.createdAt){

          const orderDate = new Date(order.createdAt);
          orderDate.setDate(orderDate.getDate() + 5);

          obj[order._id] = orderDate.toISOString().split("T")[0];
        } else {
          obj[order._id] = "";
        }
      });

      setDeliveryDate(obj);
    },[orders]);

  // update karne ke liye handler
  const handleUpdate = async ( id, status, delivery) => {
    try {
      const updateOrders = await updateOrder( id, {
        status,
        delivery
      });

      setOrders((prevOrders) => 
        prevOrders.map((o) =>
        o._id === id  ? {...o, status:status, delivery:delivery} : o )
      );
      alert("update successfully");

    } catch (error) {
      console.log(error);
    }
  }

  // Status badges ke colors decide karne ke liye helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipping': return 'bg-blue-100 text-blue-800';
      case 'Arrived': return 'bg-purple-100 text-purple-800';
      default: return 'bg-yellow-100 text-yellow-800'; // Processing
    }
  };

  return (
    <div className=" bg-gray-50  flex h-screen  bg-gray-100 font-sans">

      {/* 1. Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4">
        <div>
          <div className="text-white text-2xl font-bold flex items-center gap-2 mb-8 px-2">
            <span className="text-blue-500 text-3xl">G</span> Dashboard
          </div>
          <nav className="space-y-1">
            <Link  to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white transition">Home</Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white transition">Orders</Link>
            <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white transition">Products</Link>
          </nav>
        </div>
      </div>

         {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* 2. Top Header */}
        <header className="bg-white border-b border-gray-200 h-20 pt-3 flex items-center justify-between px-8 z-10">
         <div> 
          <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📋 Order Management Panel</h1>
          <p className="text-sm text-gray-500">Track, update status, and manage delivery dates for all customer orders.</p>
      </div>
            
          </div>
        </header>

      {/* Orders Table Container */}
      <div className="bg-white shadow-md rounded-lg overflow-auto p-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Items Ordered</th>
              <th className="py-3 px-6 text-left">Total Price</th>
              <th className="py-3 px-6 text-center">Order Date</th>
              <th className="py-3 px-6 text-center">Expected/Delivered Date</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr key={order?._id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                
                {/* Order ID */}
                <td className="py-4 px-6 text-left whitespace-nowrap font-medium text-indigo-600">
                  {order?._id ? order?._id.substring(0,8).toUpperCase() : "N/A"}
                </td>

                {/* Customer Details */}
                <td className="py-4 px-6 text-left">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{order?.user?.name}</span>
                    <span className="text-xs text-gray-400">{order?.user?.email}</span>
                  </div>
                </td>

                {/* Items */}
                <td className="py-4 px-6 text-left max-w-xs truncate" >
                  {order?.products?.map((item) =>(
                    <div key={item._id}>
                    <img src={item.product?.image} alt={item.product?.title} className="w-10 h-10 object-cover rounded-lg border" />
                    <p>{item.product?.title}</p>
                    <p>₹{item.product?.price}</p>
                    <p>QTY:{item.quantity}</p>
                    </div>
                  ))}
                </td>

                {/*total price */}
                <td className="py-4 px-6 text-center">
                {order?.totalPrice}
                </td>

                {/* Order Date */}
                <td className="py-4 px-6 text-center">
                {new Date(order?.createdAt).toLocaleDateString()}
                </td>

                {/* Delivery Date Picker */}
                <td className="py-4 px-6 text-center">
                  <input
                    type="date"
                    value={deliveryDate[order._id] || ""}
                    onChange={(e) => {
                      setDeliveryDate({...deliveryDate, [order._id]: e.target.value});
                    }}
                    onBlur={async() => {
                      const finalDate = deliveryDate[order._id];
                      if(finalDate){
                        await handleUpdate(order._id, order.status, finalDate);
                      }
                    }}
                    className="border border-gray-300 rounded p-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6 text-center">
                  <span className={`py-1 px-3 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order?.status}
                  </span>
                </td>

                {/* Action Dropdown */}
                <td className="py-4 px-6 text-center">
                  <select
                    value={order.status}
                    onChange={async (e) => {
                      const nextStatus = e.target.value;
                      let targetDate = deliveryDate[order._id] || (order.delivery ? order.delivery.split("T")[0] : "");
                      if(nextStatus === "Delivered"){
                        const today = new Date().toISOString().split("t")[0];
                        setDeliveryDate({...deliveryDate, [order._id]: today});
                        targetDate = today;
                      }

                     await handleUpdate(order._id, nextStatus, targetDate);
                    }}

                    className="border border-gray-300 rounded p-1.5 text-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Processing">⏳ Processing</option>
                    <option value="Shipping">🚚 Shipping</option>
                    <option value="Arrived">🏢 Arrived</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

import React, { useEffect, useState }  from 'react';
import { deleteOrder, getOrder } from '../services/orderApi';
import {getCurrentUser} from "../services/authApi"

export default function Orders() {

  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrder();
      setOrders(data);
      
    };
    fetchOrders();
  },[]);

  const handleDelete = async (id) => {
      
    if (window.confirm('Kya aap sach me is order ko delete karna chahte hain?')) {
      try {
        await deleteOrder(id);
      
      setOrders((prev) =>
      prev.filter((order) => order._id !== id))
      } catch (error) {
        console.log(error);
        alert("order delete nahi ho saka ");
      }
    }
    };
 
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Order Summary</h1>
        
        {orders?.length === 0 ? (
          <h2>koi order nahi ha</h2>
        ) : (
          orders?.map((order) => (
            <div key={order._id} className='rounded-3xl shadow-xl space-y-6 bg-slate-350 p-2 m-5'>
              {/* Header */}
        <div className="mb-12">
          <p className="mt-2 text-sm text-slate-500">
            Order <span className="font-semibold text-slate-700">{order._id.substring(0,8).toUpperCase()}</span> • Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto gap-2">
          <button onClick={() => handleDelete(order._id)} className="text-gray-400 hover:text-red-500 order-2 sm:order-1 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
        </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          
          {/* Left Side: Order & Shipping Details (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Order Status</p>
                <p className="text-lg font-semibold text-emerald-600 mt-1">{order.status}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>

            {/* Shipping & Delivery */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="text-base font-semibold text-slate-900">Delivery Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Shipping Address</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {order?.address?.name}<br />
                    {order?.address?.addressLine}, {order?.address?.city},<br />
                    {order?.address?.state}, {order?.address?.pincode}, {order?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Delivery</p>
                  <p className="mt-2 text-sm font-medium text-slate-800">{new Date(order?.delivery).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Via BlueDart Express</p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
              <h3 className="text-base font-semibold text-slate-900 mb-4">Payment Method</h3>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  {/* Card Badge */}
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-700 font-bold text-xs tracking-widest">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Cash on Delivery</p>
                    <p className="text-xs text-slate-400">Expires 24*7</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800"></p>
                  <p className="text-xs text-emerald-600 font-medium">Unpaid</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Product & Price Breakdown (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-lg font-semibold tracking-tight">Your Items</h3>
            
            {/* Product List */}
            <div className="divide-y divide-slate-800">
              {/* Item 1 */}
              {order.products.map((item) => (
              <div key={item._id} className="flex py-4 first:pt-0 last:pb-0 items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Image Placeholder */}
                  <div className="h-16 w-16 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden shrink-0">
                    <span className="text-xl"><img
                    src={item.product?.image}
                     alt={item.title} /></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{item.product?.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity} •</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-200">₹{item.product?.price}</p>
              </div>
              ))}
            </div>

            {/* Price Calculator */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>₹{order.totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Shipping</span>
                <span className="text-emerald-400 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Estimated Tax (GST)</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-semibold text-white">
                <span>Total Paid</span>
                <span className="text-xl text-amber-400">₹{order.totalPrice}</span>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="bg-slate-800/50 p-4 rounded-2xl text-center text-xs text-slate-400">
              Need help with your order? <a href="#" className="text-white underline hover:text-slate-200">Contact Support</a>
            </div>

          </div>

        </div>
            </div>

          ))
        )}
        
      </div>
    </div>
  );
}
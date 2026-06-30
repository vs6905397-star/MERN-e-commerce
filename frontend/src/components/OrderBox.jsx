import React from 'react'

function OrderBox({cartItems, handleIncress, handleDrcress, handleDelete, handleClearCart, handlePlaceOrder}) {

  
  return (
    <div>
      <div className="md:min-w-[800px] m-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-2xl">
  <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
    <h3 className="text-lg font-semibold text-gray-800">Cart Items</h3>
    <button onClick={handleClearCart} disabled={cartItems.length === 0} className="text-sm font-medium text-gray-500 hover:text-red-500 transition flex items-center gap-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      Clear All
    </button>
  </div>
   <div className="space-y-6">
    {cartItems.length === 0 ? (
      <h1 className='text-amber-500 text-center text-2xl mt-10'>your cart is empty</h1>
    ) : (

      cartItems.map((item) => (
<div key={item._id} className="flex flex-col  sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="flex gap-4 items-center w-full sm:w-auto">
        <div className="w-20 h-20 bg-blue-100 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
          <img src={item.product?.image} alt="AirFlex Runner" className="object-cover w-full h-full" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{item.product.title}</h4>
          <p className="text-sm text-gray-400 mt-0.5">${item.product.price} each</p>
          <div className="flex items-center border border-gray-200 rounded-lg w-max mt-2 bg-gray-50">
            <button onClick={() => handleDrcress(item)} className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium">-</button>
            <span className="px-2 text-sm font-semibold text-gray-800">{item.quantity}</span>
            <button onClick={() => handleIncress(item)} className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium">+</button>
          </div>
        </div>
      </div>
      
      <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto gap-2">
        <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-500 order-2 sm:order-1 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
        <span className="text-lg font-bold text-gray-800 order-1 sm:order-2">{item.product.price * item.quantity}</span>
      </div>
    </div>
      ))
    )}
 
  </div>
</div>
<button onClick={handlePlaceOrder} className="md:w-full w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2 mb-6">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    Proceed to Checkout
  </button>
    </div>
  )
}

export default OrderBox

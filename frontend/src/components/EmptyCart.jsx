import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center font-sans">
 
  <div className="mb-4 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag text-slate-500">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  </div>

 
  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>

  
  <p className="text-sm text-gray-500 max-w-sm mb-6">
    Looks like you haven't added anything to your cart yet.
  </p>

 
  <button className="bg-[#F2994A] hover:bg-[#e08838] text-white font-medium text-sm py-2.5 px-6 rounded-full transition-colors duration-200 mb-4 shadow-sm">
   <Link to="/">Continue Shopping</Link> 
  </button>

  
  <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500 mt-2">
    <span className="flex items-center gap-1.5">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400"><path d="M14 18H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><volume d="M19 15h2l2 3v2h-4v-5Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
      Free shipping over $50
    </span>
    <span className="flex items-center gap-1.5">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Secure checkout
    </span>
  </div>
</div>
  )
}

export default EmptyCart

import React, { useEffect, useState } from 'react'
import MainLayout from "../layouts/MainLayout"
import OrderBox from "../components/OrderBox"
import OrderSummery from '../components/OrderSummery'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart, deleteCart, getCart, updateCart } from '../services/cartApi'
import { placeOrder } from '../services/orderApi'
import { useAuth } from "../context/AuthContext";

const Cart = () => {

   const navigate = useNavigate();

   const {user} = useAuth();

  const [cartItem, setCartItem] = useState([]);

  const handleIncress = async (item) => {
    const response = await updateCart(item._id, item.quantity + 1,);
    setCartItem((prev) =>
    prev.map( cart =>
      cart._id === response.cartItem._id ?
      response.cartItem : cart
    )
);
  };

   const handleDrcress = async (item) => {
    
    if(item.quantity <= 1){
      return;
    }
    const response = await updateCart(item._id, item.quantity - 1,);
    setCartItem((prev) =>
    prev.map( cart =>
      cart._id === response.cartItem._id ?
      response.cartItem : cart
    )
);
  };

  const handleDelete = async (id) => {
    
    await deleteCart(id);
    
    setCartItem((prev) =>
    prev.filter((item) => item._id !== id)
);
  };

   const handleClearCart = async () => {
    
    const confirmClear = window.confirm("are you sure you want to clear Cart?");

    if(!confirmClear) return;
    
    await clearCart();
    
    setCartItem([]);
  };

  const handlePlaceOrder = async () => {
    
    try {

      if(!user?.address?.addressLine || !user?.address?.city || !user?.address?.state || !user?.address?.pincode || !user?.phone){
      alert("Plese Add all Information About your Delivery Address");

      navigate("/profile");
      return;
    }
    else{
      const response = await placeOrder({
        phone: user?.phone,
        address: user?.address
      });
      
      setCartItem([]);

      navigate("/orders")
    }

    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();

      setCartItem(data);
      
    };
    fetchCart();
  },[]);

  return (
    <MainLayout user={user}>
      <h1 className='font-extrabold text-4xl m-2 p-5'>Shopping Cart</h1>
      <h2 className='font-medium text-xl text-zinc-500 ml-8 '>{cartItem.length} items in your cart</h2>
     
       <OrderBox cartItems = {cartItem}
                 handleIncress={handleIncress}
                 handleDrcress={handleDrcress}
                 handleDelete={handleDelete}
                 handleClearCart={handleClearCart} 
                 handlePlaceOrder={handlePlaceOrder}/> 
    </MainLayout>
  )
}

export default Cart

import React from 'react'
import {addToCart} from "../services/cartApi"

function Product({item}) {

  const handleAddToCart = async () => {
        try {
            const data = await addToCart(item._id, 1);
            
            alert("added to cart");
        } catch (error) {
            console.log(error);
        }
    }

  if(!item){
    return <h1>loading...</h1>
  }
  return (
    <div className="card card-side p-5 rounded-2xl m-5 bg-base-100 shadow-lg max-h-[500px]">
 <div className="carousel rounded-box w-150">
  <div className="carousel-item w-full">
    <img
      src={item?.image}
      className="w-full"
      alt={item.title} />
  </div>
</div>
  <div className="card-body">
    <h2 className="card-title text-4xl font-bold">{item.title}</h2>
    <h2 className="card-title text-3xl font-semibold">{item.price}</h2>
    <p className="card-title text-xl text-zinc-400 font-medium">{item.description}</p>
    <div className="card-actions justify-center gap-5">
      <div onClick={handleAddToCart} className="rounded-xl p-2 font-bold bg-[#FF9900] shadow-xl hover:scale-90 transition-all duration-200 cursor-pointer">Add to Cart</div>
      <div className="rounded-xl p-2 font-bold shadow-xl hover:scale-90 transition-all duration-200 cursor-pointer bg-[#FFD814] text-[#0F1111]">Buy now</div>
    </div>
    <div className="card-actions justify-center gap-5 m-4">
      <p className=" text-sm text-zinc-400 font-medium">❤️ Add to Whishlist</p>
      <p className=" text-sm text-zinc-400 font-medium">Share</p>
    </div>
    
  </div>
  
</div>
  )
}

export default Product

import { Link } from "react-router-dom"

const Card = ({ item }) => {
 
    return (
        <div >

<div key={item._id} className="card bg-base-100 w-96 shadow-md hover:shadow-2xl hover:translate-y-2  transition-all duration-200">
<figure>
    <Link to={`/products/${item._id}`}>
    <img
      src={item.image}
      alt={item.title} className="h-64 w-full object-cover" />
      </Link> 
    
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.title}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{item.description}</p>
    <p className="text-xl font-bold text-black ">{item.price}</p>
    <div className="card-actions justify-end">
      <div className="rounded-xl p-2 font-bold bg-[#FF9900] shadow-xl hover:scale-90 transition-all duration-200 cursor-pointer">Add to Cart</div>
      <div className="rounded-xl p-2 font-bold shadow-xl hover:scale-90 transition-all duration-200 cursor-pointer bg-[#FFD814] text-[#0F1111]">Buy now</div>
    </div>
  </div>
</div>
         
  
</div>
    )
}

export default Card
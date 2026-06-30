import React from 'react'
import { 
  FaShippingFast, 
  FaShieldAlt, 
  FaUndoAlt 
} from 'react-icons/fa';

const Middle = () => {
  return (
    /* - stats-vertical mobile par stack karega, md:stats-horizontal desktop par line me layega.
      - w-full aur max-w-4xl se width responsive ho jayegi.
      - ml-0 mobile par margin hatayega aur md:ml-[250px] desktop par sidebar ke liye jagah chodega.
    */
    <div className="stats stats-vertical md:stats-horizontal shadow w-full max-w-4xl m-4 mx-auto md:ml-[250px] bg-base-100">
      
      {/* Total Likes */}
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaShippingFast className='text-4xl' />
        </div>
        <div className="stat-value text-primary text-2xl sm:text-3xl">Free Shipping</div>
        <div className="stat-desc">on orders over $50</div>
      </div>

      {/* Page Views */}
      <div className="stat">
        <div className="stat-figure text-secondary">
         <FaShieldAlt className='text-4xl'/>
        </div>
        <div className="stat-value text-secondary text-2xl sm:text-3xl">Warranty</div>
        <div className="stat-desc">1 year guarantee</div>
      </div>

      {/* Tasks Done */}
      <div className="stat">
        <div className="stat-figure text-secondary">
          <div >
            <div className="w-12 sm:w-16 ">
             <FaUndoAlt className='text-3xl' />
            </div>
          </div>
        </div>
        <div className="stat-value text-2xl sm:text-3xl">100%</div>
        <div className="stat-title">Easy Return</div>
        <div className="stat-desc text-secondary">30-days return policy</div>
      </div>
      
    </div>
  )
}

export default Middle
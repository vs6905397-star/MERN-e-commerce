import {useNavigate ,Link } from "react-router-dom"
import {logout} from "../services/authApi"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({setSearch, search}) => {

  const navigate = useNavigate();

  const {user} = useAuth();
  const {setUser} = useAuth();


  const [sidebar, setSidebar] = useState(false);

  const handleLogout = async ()=>{
    try {
      await logout();
      setUser(null);
      navigate("/login");
      
    } catch (error) {
      console.log(error);
    }
  };
  
    return (

      <>
      {sidebar && (
        <div className="drawer ">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
  </div>
  <div className="drawer-side ">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu min-h-full w-80 gap-3 p-4 mt-20 bg-zinc-950 text-white">
      {/* Sidebar content here */}
      <li><input type="text" placeholder="Search Products..." value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className=" input input-bordered rounded-full w-64 bg-zinc-900 border-zinc-700 md:w-auto" /></li>
      <li className=" hover:scale-105 hover:bg-zinc-800 rounded-2xl transition-all duration-200"><Link to="/">Home</Link></li>
      {user? (
        <>
        <li className=" hover:scale-105 hover:bg-zinc-800 rounded-2xl transition-all duration-200"><Link to="/cart">Cart</Link></li>
        <li className=" hover:scale-105 hover:bg-zinc-800 rounded-2xl transition-all duration-200"><Link to="/orders">Orders</Link></li>
        </>
      ) : (
        <></>
      )}
       <li>
          <details>
            <summary className="hover:scale-105 transition-all duration-200">Category</summary>
            <ul className="p-2 bg-base-100 w-40 z-1 shadow-xl  bg-zinc-900 text-white">
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Mobile">Mobile</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Gaming">Gaming</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Audio">Audio</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Furniture">Furniture</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/SetUp">SetUp</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Laptop">Laptop</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Shoes">Shoes</Link></button></li>
            </ul>
          </details>
        </li>
      {user?.role === "admin" && (
                <>
                <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/admin/products">Admin Panel</Link></button></li>
                </>
              )}
    </ul>
  </div>
</div>
      )}

        <div className=" navbar md:px-7 py-4 bg-zinc-950 sticky top-0 z-50 text-white border-b border-zinc-800 shadow-sm">

          

   <label onClick={() => {setSidebar(!sidebar)}} htmlFor="my-drawer-1" xmlns="http://www.w3.org/2000/svg"  className="md:hidden btn drawer-button">{sidebar? <FaTimes size={24} /> : <FaBars size={24} />}</label>
          

  <div className="flex-1">
    <a className="btn ml-3 btn-ghost text-2xl font-bold tracking-wider text-green-500">shopsy</a>
  </div>
  <div className="hidden md:flex navbar-center hidden lg:flex gap-3 ml-4">
      <ul className="menu menu-horizontal px-1 gap-3">
        <li><button className="hover:scale-105 transition-all duration-200"><Link to="/">Home</Link></button></li>
        {user ? (
          <>
          <li><button className="hover:scale-105 transition-all duration-200"><Link to="/cart">Cart</Link></button></li>
        <li><button className="hover:scale-105 transition-all  duration-200"><Link to="/orders">Orders</Link></button></li>
        </>
        ):(
          <>
        </>
        )}
       
        <li>
          <details>
            <summary className="hover:scale-105 transition-all duration-200">Category</summary>
            <ul className="p-2 bg-base-100 w-40 z-1 shadow-xl  bg-zinc-900 text-white">
               <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Mobile">Mobile</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Gaming">Gaming</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Audio">Audio</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Furniture">Furniture</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/SetUp">SetUp</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Laptop">Laptop</Link></button></li>
              <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/Shoes">Shoes</Link></button></li>
            </ul>
          </details>
        </li>      
              {user?.role === "admin" && (
                <>
                <li><button className="hover:scale-105 transition-all duration-200 border-b"><Link to="/admin/products">Admin Panel</Link></button></li>
                </>
              )}         
      </ul>
    </div>

  <div className="flex gap-2">
    <input type="text" placeholder="Search Products..." value={search} onChange={(e) => setSearch(e.target.value)}  className="hidden md:flex input input-bordered rounded-full w-64 bg-zinc-900 border-zinc-700 md:w-auto" />
    <div className="dropdown dropdown-end">
     
          {user ? (
            <>
            <Link to="/profile">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
            </Link>
            </>
          ):(
            <>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
             <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-1 mt-3 w-52 p-2 shadow-xl  bg-zinc-900 hover:scale-105 transition-all duration-200 text-white ">
            <li>    
           <Link to="signup" className="justify-between border-b border-zinc-800">Signup</Link>       
        </li>
        <li><a onClick={handleLogout}>Login</a></li>
        </ul>
        </>
          )}
    </div>
  </div>
</div>
</>
    )
}

export default NavBar
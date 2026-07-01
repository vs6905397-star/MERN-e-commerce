import React, { useEffect, useState } from 'react';
import {useNavigate ,Link } from "react-router-dom"
import {getCurrentUser, logout, updateAddress} from "../services/authApi"
import { useAuth } from "../context/AuthContext";

export default function UserProfile() {

  const navigate = useNavigate();

  const {user} = useAuth();
  const {setUser} = useAuth();

  const handleLogout = async ()=>{
    if (window.confirm('Kya aapko sach me logout karna hai?')){
      try {
      await logout();
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
    }
  };

  // Modal ओपन/क्लोज़ करने के लिए State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [phone,setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getCurrentUser();

      setPhone(data.phone || "");

      setName(data.address?.name || "");

      setAddressLine(data.address?.addressLine || "");

      setCity(data.address?.city || "");

      setState(data.address?.state || "");

      setPincode(data.address?.pincode || "");
      
    };
  },[]);

   const handleSaveAddress = async () => {
    try {
      const res = await updateAddress({
        phone,
        name,
        addressLine,
        city,
        state,
        pincode
      });
      const user = await getCurrentUser();
      setUser(user);

      alert("Address Updated Successfully");

    } catch (error) {
      console.log(error);
    }
   };

   
  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account Settings</h1>
            <p className="text-slate-500 mt-1">Manage your profile, addresses, and order history.</p>
          </div>
          {user ? (
            <>
             <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-1 mt-3 w-52 p-2 shadow-xl  bg-zinc-900 hover:scale-105 transition-all duration-200 text-white ">
        <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
            </>
          ):(
             <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-1 mt-3 w-52 p-2 shadow-xl  bg-zinc-900 hover:scale-105 transition-all duration-200 text-white ">
            <li>    
           <Link to="signup" className="justify-between border-b border-zinc-800">Signup</Link>       
        </li>
        <li><a onClick={handleLogout}>Login</a></li>
        </ul>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User Overview Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 text-center sticky top-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Profile" 
                  className="rounded-full w-full h-full object-cover ring-4 ring-indigo-50"
                />
                <button className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition shadow-md">
                  📷
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{name}</h2>
              <p className="text-sm text-slate-500 mb-4">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Verified Account
              </span>
            </div>
          </div>

          {/* Right Column: Profile details & Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Section 1: Personal Info */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                👤 Personal Information
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                  <h1 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  >{user?.name}</h1>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                  <h1 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  >{user?.email}</h1>
                </div>
              </form>
            </div>

            {/* Section 2: Delivery Addresses */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  📍 Shipping Address
                </h3>
              </div>

              {/* Current Address Card */}
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg h-9 w-9 flex items-center justify-center shrink-0">
                    🏠
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">Home Address</h4>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 rounded-md">Default</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {user?.address?.name}, <br />
                      {user?.address.addressLine}<br />
                      {user?.address.city}, <br /> {user?.address.state},<br/>{user?.address.pincode}, <br />{user?.address.phone}
                    </p>
                  </div>
                </div>
                
                {/* Update Address Action Button */}
                <button 
                  onClick={handleToggleModal} 
                  className="w-full sm:w-auto px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-100/50 transition font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  ✏️ Update Address
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modern Modal for Update Address */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Update Address</h3>
              <button onClick={handleToggleModal} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleToggleModal(); }}>
              <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
                  />
                </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={addressLine} 
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">City</label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">State</label>
                  <input 
                    type="text" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pin Code</label>
                <input 
                  type="text" 
                  value={pincode} 
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone no.</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={handleToggleModal} className="px-4 py-2 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-100 transition">Cancel</button>
                <button  onClick={handleSaveAddress} type="submit" className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
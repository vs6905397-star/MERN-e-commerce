import React, { useState } from 'react'
import {useNavigate ,Link} from "react-router-dom"
import { singUp } from "../services/authApi"


const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async(e) => {
    e.preventDefault();

    try {
      await singUp({
        name,
        email,
        password,
      });

      alert("Singup successfully");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("something is incorrect");
    }
  };

  return (
   <div
  className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1974&auto=format&fit=crop')",
  }}
>
  {/* dark overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* form */}
  <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
    
    <h1 className="text-4xl font-bold text-white text-center mb-2">
      Create Account
    </h1>

    <p className="text-gray-300 text-center mb-8">
      Start shopping today 🚀
    </p>

    <form className="space-y-5" onSubmit={handleSignup}>
      
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-gray-300 outline-none border border-white/20"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-gray-300 outline-none border border-white/20"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder:text-gray-300 outline-none border border-white/20"
      />

      <button
      type='submit'
        className="w-full bg-green-500 hover:bg-green-600 transition-all p-3 rounded-xl text-white font-semibold"
      >
        Sign Up
      </button>
    </form>

    <p className="text-center text-gray-300 mt-6">
      Already have an account?
      <span className="text-green-400 cursor-pointer ml-1">
        <Link to="/login">Login</Link>
      </span>
    </p>
  </div>
</div>
  )
}

export default Signup

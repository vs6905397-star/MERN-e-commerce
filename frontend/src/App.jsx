import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { getCurrentUser } from "./services/authApi"
import { useEffect, useState } from "react"
import ProtectedRoute from "./routes/ProtectedRoute"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import MainLayout from "./layouts/MainLayout"
import AdminPanel from "./pages/AdminPanel"
import AdminOrders from "./pages/AdminOrders"



function App() {

const [user, setUser] = useState(null);
const [search, setSearch] = useState("");

useEffect(() => {
    getCurrentUser()
    .then((data) => {
      setUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
},[]);

  return (
 
    <Routes>

      <Route path = "/" element = {<Home setSearch={setSearch} search={search}/>} />

      <Route path = "/:category" element = {<Home setSearch={setSearch} search={search}/>} />

      <Route path = "/cart" element = {
        <ProtectedRoute user = {user}>
          <Cart />
        </ProtectedRoute>
      }/>

      <Route path = "/products/:id" element = {<ProductDetails/>} />

      <Route path = "/signup" element = {<Signup/>} />

      <Route path = "/login" element = {<Login/>} />

      <Route path = "/orders" element = {<Orders />} />

      <Route path = "/profile" element = {<Profile />} />

      <Route path = "/admin/products" element = {<AdminPanel />} />

      <Route path = "/admin/orders" element = {<AdminOrders />} />

    </Routes>

    
  )
}

export default App
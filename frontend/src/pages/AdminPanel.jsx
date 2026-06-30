import React, { useState, useEffect } from 'react';
import {useNavigate ,Link } from "react-router-dom"
import { createProduct, getProducts, updateProduct } from "../services/ProductApi"
import { deleteProduct } from '../services/ProductApi';
import { create } from 'axios';

// Initial Dummy Data (Jo image me dikh raha hai)

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    title: '',
    price: '',
    stock: '',
    category: '',
    description:'',
    image:null
  });

  //fetch products
  useEffect(() => {
      getProducts()
      .then((data) => setProducts(data));
  },[]);

  useEffect(() => {
    if(setSearch){
        setSearch("");
    }
},[setSearch])

  // Delete Functionality
   const handleDelete = async (id) => {
      
    if (window.confirm('Kya aap sach me is product ko delete karna chahte hain?')) {
      try {
        await deleteProduct(id); 

      setProducts((prev) =>
      prev.filter((item) => item._id !== id))
      } catch (error) {
        console.log(error);
        alert("product delete nahi ho saka ");
      }
    }
    };

  // Open Modal for Add
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProduct({ id: null, title:'', price: '', stock: '', category: '', description: "", image:null});
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  // Form Submit (Add or Edit)
  const handleFormSubmit = async(e) => {
    e.preventDefault();

     const data = new FormData();
      data.append("title", currentProduct.title);
      data.append("price", currentProduct.price);
      data.append("description", currentProduct.description);
      data.append("category", currentProduct.category);
      data.append("stock", currentProduct.stock);

      if(currentProduct.image instanceof File){
        data.append("image", currentProduct.image);
      }else{
        console.log("real file nahi ha");
      }

      try{

    if (isEditing) {
      // Update logic
      const response = await updateProduct(currentProduct._id, data);

      setProducts(products.map(p => p.id === currentProduct.id ? response.product : p));
      alert("product updated");
    } else {
      
        // Add new logic
     
      const response = await createProduct(data);

      setProducts([...products, response.product]);
      } 
      setIsModalOpen(false);
    }
    catch (error) {
        console.error("product create faild", error);
      }
  };

  // Filter products based on search
const filterProduct = products.filter((item) => {

    const matchSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
});

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* 1. Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4">
        <div>
          <div className="text-white text-2xl font-bold flex items-center gap-2 mb-8 px-2">
            <span className="text-blue-500 text-3xl">G</span> Dashboard
          </div>
          <nav className="space-y-1">
            <Link  to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white transition">Home</Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white transition">Orders</Link>
            <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white transition">Products</Link>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 2. Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Product Management</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-lg px-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-64"
              value={search} onChange={(e) => setSearch(e.target.value)} 
            />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">B</div>
              <span className="text-sm font-medium text-gray-700">Bhai Admin</span>
            </div>
          </div>
        </header>

        {/* 3. Products Table View */}
        <main className="flex-1 overflow-x-auto overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Products</h2>
              <button
                onClick={openAddModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition"
              >
                + Add New Product
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {filterProduct.map((product) => (
                  <tr key={product?._id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <img src={product?.image} alt={product?.title} className="w-10 h-10 object-cover rounded-lg border" />
                    </td>
                    <td className="p-4 font-medium text-gray-900">{product?.title}</td>
                    <td className="p-4 font-medium">₹{product?.price}</td>
                    <td className="p-4">{product?.stock}</td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium">
                        {product?.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium">
                        {product?.description}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2 mt-1">
                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="Edit Product"
                      >
                        ✏️
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(product?._id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="Delete Product"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {filterProduct.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-gray-400">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* 4. Edit / Add Dynamic Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {isEditing ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  value={currentProduct.title}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: (e.target.value) || "" })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">image</label>
                  <input
                    type="file"
                    accept='image/*'
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    onChange={(e) => {
                      if(e.target.files && e.target.files.length > 0) {
                         setCurrentProduct({ ...currentProduct, image: e.target.files[0] })
                      }
                    }}
                  />
                </div>
              </div>
             
              

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
                >
                  {isEditing ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
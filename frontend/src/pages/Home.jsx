import MainLayout from "../layouts/MainLayout"
import Card from "../components/Card"
import HeroSection from "../components/HeroSection"
import { useEffect, useState } from "react"
import { getProducts } from "../services/ProductApi"
import { getCurrentUser } from "../services/authApi"
import { useParams } from "react-router-dom"



const Home = ({setSearch, search}) => {

    const {category} = useParams();
const [products, setProducts] = useState([]);
const [selectCategory, setSelectCategory] = useState("All");
useEffect(() => {
    getProducts()
    .then((data) => setProducts(data));
},[category]);


useEffect(() => {
    if(setSearch){
        setSearch("");
    }
},[category, setSearch])

const filterProduct = products.filter((item) => {

   const matchCategory = !category || category === "All" || 
   item.category?.toLowerCase() === category.toLowerCase();

    const matchSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
});

    return (
        <MainLayout setSearch={setSearch} search={search}>
            <HeroSection/>
            <h1 className='font-extrabold text-4xl m-2 p-5'>All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-zinc-100 min-h-screen">
                {filterProduct.map((item) => (
                     <Card key={item._id} item={item}/>
                ))}
                {filterProduct.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-gray-400">No products found.</td>
                  </tr>
                )}
            
            </div>
        </MainLayout>
    )
}

export default Home
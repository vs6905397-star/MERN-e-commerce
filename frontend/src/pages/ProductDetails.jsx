import MainLayout from "../layouts/MainLayout"
import Product from "../components/Product"
import Card from "../components/Card"
import Middle from "../components/Middle"
import { getSingleProduct } from "../services/ProductApi"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getSingleProduct(id)
        .then((res) => {
            setProduct(res);
         })
         .catch((err) => console.log(err));
    },[id]);

    return (
        <MainLayout>
            <Product item={product}/>
            <Middle/>
           
        </MainLayout>
    )
}

export default ProductDetails
import Product from "../models/productModel.js"
import cloudinary from "../config/cloudinary.js"
import path from "path"
import fs from "fs"

export const createProduct = async (req, res) => {
    try {

        if(!req.file){
            return res.status(400).json({message:"image not uploaded"});
        }
        const {title, price, description, category, stock} = req.body;

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "products",
        })

        if(fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
        }

        const imagePath = uploadResult.secure_url;

        const product = await Product.create({
            title,
            price: Number(price),
            description,
            category,
            stock: Number(stock),
            image: imagePath
        })

        res.status(200).json({
            message:"product created", product
        })
        
    } catch (error) {
        if(req.file && fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
        }
        console.log("cloudinary upload error:", error);
        res.status(500).json({
            message:error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)
        
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json(product)
        
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json({
            message:"product deleted"
        })
        
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{returnDocument:"after"})

        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json({
            message:"product updated",
            product
        })
        
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const searchProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword

        const products = await Product.find({
            title:{
                $regex: keyword,
                $options:"i"
            }
        })

        res.status(200).json({
            products
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const filterProducts = async (req, res) => {
    try {
        const category = req.query.category

        const products = await Product.find({category})

         res.status(200).json({
            products
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
import express from "express"
import upload from "../middlewares/multer.js"
import authMiddleware from  '../middlewares/authMiddleware.js'
import adminMiddleware from "../middlewares/adminMiddleware.js"
import { createProduct, deleteProduct, filterProducts, getAllProducts, getSingleProduct, searchProducts, updateProduct } from "../controllers/productControllers.js"

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, upload.single("image"),  createProduct)

router.get("/", getAllProducts)

router.get("/search/products", searchProducts)

router.get("/filter/category", filterProducts)

router.get("/:id", getSingleProduct)

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct)

router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateProduct)

export default router
import express from "express"
import {addToCart, clearCart, deleteCart, getCart, updateCart} from "../controllers/cartControllers.js"
import authMiddleware from  '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/add", authMiddleware, addToCart)

router.get("/", authMiddleware, getCart)

router.delete("/delete/:id", authMiddleware, deleteCart)

router.put("/update/:id", authMiddleware, updateCart)

router.delete("/clear", authMiddleware, clearCart)

export default router
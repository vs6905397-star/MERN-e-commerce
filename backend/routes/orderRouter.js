import express from "express"
import authMiddleware from  '../middlewares/authMiddleware.js'
import router from "./cartRoutes.js"
import { placeOrder, deleteOrder, getOrder, updateOrder, getAllOrder } from "../controllers/orderControllers.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"


router.post("/", authMiddleware, placeOrder)

router.get("/userorder", authMiddleware, getOrder)

router.get("/allorder", authMiddleware, adminMiddleware, getAllOrder)

router.put("/:id", authMiddleware, adminMiddleware, updateOrder)

router.delete("/:id", authMiddleware, deleteOrder)

export default router
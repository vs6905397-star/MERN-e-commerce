import express from "express"
import {login, logout, singup, getCurrentUser, updateAddress} from "../controllers/authControllers.js"
import authMiddleware from  '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/signup", singup)

router.post("/login", login)

router.post("/logout", logout)

router.get("/me", authMiddleware, getCurrentUser)

router.put("/address", authMiddleware, updateAddress)

export default router
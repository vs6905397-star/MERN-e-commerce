import express from "express"
import dotenv from "dotenv"

dotenv.config()

import cookieParser from "cookie-parser"
import connectDb from "./config/connectDB.js"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRouter.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import path from "path"


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



connectDb();

app.use("/api", authRoutes)

app.use(cookieParser())

app.use("/api/products", productRoutes)

app.use("/uploads", express.static("uploads"))

app.use("/api/cart", cartRoutes)

app.use("/api/orders", orderRoutes)


app.listen(5000);
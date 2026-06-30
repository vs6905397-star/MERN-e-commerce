import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,             
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing",
    },
    address: {
        name:{
            type: String,
        },
        addressLine: {
             type: String,
        },
        city: {
             type: String,
        },
        state: {
             type: String,
        },
        pincode: {
             type: Number,
        }
    },
    delivery:{
        type: Date,
        default: function(){
            const date = new Date();
            date.setDate(date.getDate() + 5);
            return date;
        }
    },

},{timestamps:true});

const Order = mongoose.model("order", orderSchema);

export default Order
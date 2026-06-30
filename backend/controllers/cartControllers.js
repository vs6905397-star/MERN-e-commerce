import Cart from "../models/cartModel.js"

export const addToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body

        const cartItem = await Cart.create({
            user: req.user.id,
            product: productId,
            quantity
        })

         res.status(200).json({
            message:"added to cart", cartItem
        })

        
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const getCart = async (req, res) => {
  
    try {

        const cart = await Cart.find({
            user:req.user.id
        }).populate("product");
        res.status(200).json(cart)
        
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(
            req.params.id
        )

        if(!cartItem){
            return res.status(404).json({
                message:"cart item not found"
            })
        }
        res.status(200).json({
            message:"item removed from cart"
        })
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const updateCart = async (req, res) => {
    try {

        const {quantity} = req.body

        const cartItem = await Cart.findByIdAndUpdate(
            req.params.id, { quantity },
            { returnDocument: "after"}
        ).populate("product");

        if(!cartItem){
            return res.status(404).json({
                message:"cart item not found"
            })
        }

        res.status(200).json({
            message:"cart updated", cartItem
        })
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

export const clearCart = async(req, res) => {
    try {
        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(200).json({
            message:"cart cleared"
        });

    } catch (error) {
         res.status(500).json({
            message:error.message
        });
    }
}
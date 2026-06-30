import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"

export const placeOrder = async (req, res) => {
    try {
        const { address, phone} = req.body;

        const cartItem = await Cart.find({
            user: req.user.id,
        }).populate("product");

        if(cartItem.length === 0){
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        console.log("populated cart item", JSON.stringify(cartItem[0],null,2));

        const products = cartItem.map((item) => {

            let itemPrice = 0;
            let productId = null;
            if(item.product && typeof item.product === 'object') {
                itemPrice = item.product.price || 0;
                productId = item.product;
            }

            return {

                 product: productId,
                 quantity: item.quantity || 1,
                 price: Number(itemPrice),
            };          
        });

        let calculatedTotalPrice = 0;
        cartItem.forEach((item) => {
            let price = 0;
            if(item.product && typeof item.product === 'object') {
                price = item.product.price || 0;
            } else{
                price = item.price || 0;
            }
            const quantity = item.quantity || 1;
            calculatedTotalPrice += (Number(price) * Number(quantity));
        });


        if(isNaN(calculatedTotalPrice) || calculatedTotalPrice <= 0) {
            console.log("warning: total price is 0 or NaN");
            calculatedTotalPrice = 1;
        }


        const order = await Order.create({
        user: req.user.id,
        products: products,
        totalPrice: calculatedTotalPrice,
        address:{    
        phone: phone || req.user.phone,
        name: address?.name, 
        addressLine: address?.addressLine,
        city: address?.city,
        state: address?.state,
        pincode: address?.pincode,
        }
    });


    await Cart.deleteMany({
        user: req.user.id,
    });

    res.status(201).json({
            message:"order placed successfully", order,
        });   
  
    } catch (error) {
        console.log(error);
         res.status(500).json({
            message:error.message
        })
    }
}

export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({
            user:req.user.id,
        }).populate("products.product")

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
         res.status(500).json({
            message:error.message
        })
    }
}

export const getAllOrder = async (req, res) => {
    try {
     
        const orders = await Order.find({})
        .populate("user", "name email")
        .populate("products.product", "title image price");

        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
         res.status(500).json({
            message:error.message
        })
    }
}


export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(
            req.params.id
        )

        if(!order){
            return res.status(404).json({
                message:"order not found"
            })
        }
        res.status(200).json({
            message:"order deleted"
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
            message:error.message
        })
    }
}

export const updateOrder = async (req, res) => {
    try {

        const { status, delivery } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: status,
                delivery: delivery
            },
            {
                returnDocument: "after"
            }
        );

        if(!order){
            return res.status(404).json({
                message:"order not found"
            });
        }

        res.status(200).json({
            message:"order updated", order
        })
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

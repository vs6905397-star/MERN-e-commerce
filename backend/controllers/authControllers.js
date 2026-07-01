import User from "../models/userModel.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

export const singup = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({
                message:"user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = jwt.sign({id: user._id, role:user.role}, process.env.JWT_SECRET , {expiresIn:"7d"})

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*60*100
        })

        res.status(200).json({
            message:"user created", user
        })
    } 
    catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

export const login = async (req, res) =>  {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({
            message:"user not found"
        })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).json({
            message:"invalid credentials"
            })
        }

        const token = jwt.sign({id: user._id, role:user.role}, process.env.JWT_SECRET , {expiresIn:"7d"})

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7*24*60*60*100
        })

        res.status(200).json({
            message:"login successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token")

    res.status(200).json({
            message:"logout successfully"
        })
 
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await 
        User.findById(req.user.id)
        .select("-password");

        if(!user){
            return res.status(404).json({
                message:"user not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}

export const updateAddress = async (req, res) => {
    try {
        const { phone, name, addressLine, city, state, pincode} = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                phone,
                address: {
                    name,
                    addressLine,
                    city,
                    state,
                    pincode
                }
            },
            {
                returnDocument:"after"
            }
        )

        res.status(200).json({
            message:"address updated",
            user
        })
        
    } catch (error) {
         res.status(500).json({
            message:error.message
        });
    }
}


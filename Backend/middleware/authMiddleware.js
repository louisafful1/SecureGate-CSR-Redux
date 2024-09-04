import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.cookies.token) {
        token =req.cookies.token
    }
    
    if(!token) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(verified.id).select("-password")

        if(!user) {
            res.status(404)
            throw new Error("User not found")
        }

        req.user = user

        next()

    }catch(error) {
        res.status(401)
        throw new Error("Not Authorized")

    }
   
  
})

export default protect
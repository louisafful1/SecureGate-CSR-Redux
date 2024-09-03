import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
}

//Register User
const register = asyncHandler( async (req, res) => {
const {fname, sname, email, phone, password } = req.body

//Validation
if(!fname || !sname || !email || !phone || !password){
    res.status(400)
    throw new Error("Please fill fields")
}

if(password.length < 8){
    res.status(400)
    throw new Error("Password must not be less than 8 Characters")
}
//check if user exists
const userExists = await User.findOne({email});

if(userExists) {
    res.status(400)
    throw new Error("A user already exists with this email")
}

//Create user
const user = await User.create({
    fname,
    sname,
    email,
    phone,
    password

})

//Generate token
const token = generateToken(user._id);

if (user) {
    const {fname, sname, email, phone} = user

    // set a cookie on the browser
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 86400 * 1000),
          // secure: true,
        // samesite: none
    })
    
    res.status(200).json({
        fname,
        sname,
        email,
        phone,
        token

    })
}else{
    res.status(404)
    throw new Error("INVALID USER CREDENTIALS!")
}

})

// Login User


export {
    register
}
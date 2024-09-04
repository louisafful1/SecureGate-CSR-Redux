import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
}

//Register User
const registerUser = asyncHandler( async (req, res) => {
const {fname, sname, email, phone, password, confirmPassword } = req.body

//Validation
if(!fname || !sname || !email || !phone || !password || !confirmPassword){
    res.status(400)
    throw new Error("Please fill fields")
}

if(password.length < 8){
    res.status(400)
    throw new Error("Password must not be less than 8 Characters")
}
if(password !== confirmPassword){
    res.status(400)
    throw new Error("Passwords do not match")
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
const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;

    // Validations
    if(!email || !password) {
        res.status(400)
        throw new Error("Please fill in all required fields")
    }

    const user = await User.findOne({email})

    if (!user){
        res.status(400)
        throw new Error("User does not exist")

    }

    //check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    
   const token = generateToken(user._id)

   if(user && passwordIsCorrect) {
    const newUser = await User.findOne({email}).select("-password")
    res.cookie("token", token, {
        path: "/",
        httpOnly: "",
        expires: new Date(Date.now() + 30 * 86400 * 1000),
        // secure: true,
      // samesite: none
    })
    res.status(200).json(newUser)

   
   }else{
    res.status(400)
    throw new Error("Invalid email or password")
   }


})

// Logout 
const logoutUser = asyncHandler (async (req, res) => {

   res.cookie("token", "", {
    path: "/",
    httpOnly: "true",
    expires: new Date(0)
   })

   res.status(200).json({message: "You have successfully logged out"})

})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password")

    if(user) {

        res.status(200).json(user)

    }else{
        res.status(404);
        throw new Error("User not found")
    }

})

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if(!token){
       return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified) {
        res.json(true)
    }else{
        res.json(false)
    }

})


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(user){
        const {fname, sname, phone, } = user
        user.fname = req.body.fname ||  user.fname
        user.sname = req.body.sname ||  user.sname
        user.phone = req.body.phone ||  user.phone

        const updateUser = await user.save()
        res.status(200).json(updateUser)

    }else{
        res.status(404)
        throw new Error("User not found")
    }

})





export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser    
}
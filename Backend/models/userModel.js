import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = mongoose.Schema(
    {
        fname: {
            type: String,
            required: [true, 'Please enter your first name'],
            trim: true

        },

        sname: {
            type: String,
            required: [true, 'Please enter your second name'],
            trim: true
        },
        
        email: {
            type: String,
            required: [true, 'Please enter your Email'],
            unique: true,
            trim: true,
            match:   [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email",
              ]
        },

        phone: {
            type: String,
            required: [true, 'Please enter a phone number'],
            default: "+233",
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [8, 'Password must not be less than 8 characters']
        }
    }, {timestamps : true}
);

//Encrypt password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
                return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(this.password, salt)
    this.password = hashedpassword

    next()

})
const User = mongoose.model("User", userSchema)

export default User
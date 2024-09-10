import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import router from "./router/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors(
    {
        origin: ["http://localhost:5000", "https://securegate.com"],
        credentials:true
    }
))

//Route
app.use("/api/users",router)

//Error middleware
app.use(errorHandler)

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
})
})
.catch((err) => console.error(err))


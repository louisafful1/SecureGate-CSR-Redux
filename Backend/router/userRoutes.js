import express from "express"
const router = express.Router();
import { getUser, loginStatus, loginUser, logoutUser, registerUser, updateUser} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/getUser", protect, getUser)
router.get("/status", loginStatus)

router.patch("/profile", protect, updateUser)





export default router
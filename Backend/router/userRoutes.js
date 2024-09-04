import express from "express"
const router = express.Router();
import { getUser, loginStatus, loginUser, logoutUser, registerUser, sendingEmail, updateUser} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/getUser", protect, getUser)
router.get("/status", loginStatus)

router.patch("/profile", protect, updateUser)
router.post("/sendEmail", sendingEmail)





export default router
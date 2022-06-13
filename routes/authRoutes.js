import express from "express"
import { register, login, updateUser } from "../controllers/authController.js"
import authenticatedUser from "../middleware/auth.js"
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.patch("/updateUser", authenticatedUser, updateUser)

export default router

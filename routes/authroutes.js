import  express from "express"
import { registerUser } from "../controllers/register.js"
import { loginUser } from "../controllers/login.js"
import { logout } from "../controllers/logout.js"
import { checkAuthentication } from "../middlewares/checkAuthentication.js"

const router = express.Router()

router.post("/register", registerUser )
router.post("/login", loginUser)
router.post("/logout", logout)




export default router
import  express from "express"
import { signUpUser } from "../controllers/signup.js"
import {  signInUser } from "../controllers/signin.js"
import {  signOutUser } from "../controllers/signout.js"
import { checkAuthentication } from "../middlewares/checkAuthentication.js"
import { refreshToken } from "../controllers/refreshToken.js"
import { checkRefreshTokenValidity } from "../middlewares/checkRefreshTokenValidity.js"

const router = express.Router()

router.post("/signup", signUpUser )
router.post("/signin", signInUser)
router.post("/signout", signOutUser)
router.post("/refresh", checkRefreshTokenValidity, refreshToken)




export default router
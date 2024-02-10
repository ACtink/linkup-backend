import  express from "express"
import { signUpUser } from "../controllers/signup.js"
import {  signInUser } from "../controllers/signin.js"
import {  signOutUser } from "../controllers/signout.js"
import { checkAuthentication } from "../middlewares/checkAuthentication.js"

const router = express.Router()

router.post("/signup", signUpUser )
router.post("/signin", signInUser)
router.post("/signout", signOutUser)




export default router
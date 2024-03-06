
import express from "express"
import authRoutes from "./authroutes.js"
import postRoutes from "./postroutes.js"
import userRoutes from "./userroutes.js"



const router = express.Router()


router.use("/auth",authRoutes)

router.use("/posts", postRoutes)

router.use("/user" , userRoutes)




export default router;
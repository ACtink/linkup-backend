
import  express from "express"

import { checkAuthentication } from "../middlewares/checkAuthentication.js"
import { allPosts } from "../controllers/allPosts.js"
import { createPost } from "../controllers/createPost.js"
import { userPosts } from "../controllers/userPosts.js"
import { deletePost } from "../controllers/deletePost.js"

const router = express.Router()


router.get("/",allPosts)
router.get("/myposts", checkAuthentication ,userPosts)
router.delete("/:id",deletePost)
router.post("/createpost" ,checkAuthentication, createPost)




export default router
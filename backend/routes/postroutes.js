
import  express from "express"

import { checkAuthentication } from "../middlewares/checkAuthentication.js"
import { allPosts } from "../controllers/allPosts.js"
import { createPost } from "../controllers/createPost.js"
import { userPosts } from "../controllers/userPosts.js"
import { deletePost } from "../controllers/deletePost.js"
import { getMulterObject } from "../utils/multerconfig.js"
import { createComment } from "../controllers/createComment.js"
import { deleteLike } from "../controllers/deleteLike.js"
import { createLike } from "../controllers/createLike.js"
import { getLikesCount } from "../controllers/getLikesCount.js"
import { getPostsToCheckOut } from "../controllers/getPostsToCheckOut.js"
import { getLikesOfThePost } from "../controllers/getLikesOfThePost.js"
import { getCommentsOfThePost } from "../controllers/getCommentsOfThePost.js"

const router = express.Router()





const upload =  getMulterObject()


router.get("/posts-to-check-out", getPostsToCheckOut);

router.get("/:postId/likes-list", getLikesOfThePost);

router.get("/:postId/comments-list", getCommentsOfThePost);


router.get("/", checkAuthentication ,allPosts);

router.get("/:postId/likesCount", getLikesCount)

router.get("/:username", checkAuthentication ,userPosts)
router.delete("/:id",deletePost)
router.post("/createpost" ,checkAuthentication,  upload.single("file"), createPost)

router.post("/:postId/comment" ,checkAuthentication, createComment)

router.post("/:postId/like" ,checkAuthentication, createLike)

router.delete("/:postId/like" ,checkAuthentication, deleteLike)







export default router
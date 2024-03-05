


import Post from "../models/post.js";

export const fetchLikesCount = async (postId)=>{



     try {
       const post = await Post.findById(postId);

       if (post) {
         return  post.likes
       }
     } catch (err) {
       console.log("error fetching likes count")
     }
}
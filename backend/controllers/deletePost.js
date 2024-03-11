import Post from "../models/post.js";







export const deletePost = async (req, res) => {
    console.log("request came for deleting the post");

    const postId = req.params.id


    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {

            res.status(204).json({error:"Post not found"})
          
        }
        else{


            res.status(200).json({success:"post deleted successfully"})
        }
      
      } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({error:"error while deleting post"})
      }

}
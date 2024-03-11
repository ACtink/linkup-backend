








import Like from "../models/like.js";
import Post from "../models/post.js";


export const deleteLike = async (req, res) => {

  const postId = req.params.postId;

//   const likeValue = req.body.liked;
   let likesCount;



    try {

  const post = await Post.findById(postId);

  if(post){


      const like = Like.findOne({ postId : post._id , author: req.userId})


if(like){  

    const deletedLike = await Like.findOneAndDelete(like._id)



}



   const updatedPost = await Post.findByIdAndUpdate(
        postId, 
        { 
            $pull: { likesArray: { author: req.userId } }, // Remove the like where author is userId
            $inc: { likes: -1 },
        },
        { new: true }, 
        
      );

                    likesCount = updatedPost.likes;



    return res
      .status(200)
      .json({
        message: "like deleted successfully",
        likesCount: updatedPost.likes,
      });


  }




    }
    catch(err){

              res.status(500).json({ message: "internal server error" });



    }




};

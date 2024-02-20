
import Comment from "../models/comment.js";
import Post from "../models/post.js";


export const createComment = async (req, res) => {
  console.log("request came for new comment");

  const postId = req.params.postId;

  const commentContent = req.body.comment;

    try {

  const post = await Post.findById(postId);

     


  if(post){


    const newCommentObject = {
        content: commentContent,
        author: req.userId,
      };

    const newComment = await Comment.create(newCommentObject);

   const updatedPost = await Post.findByIdAndUpdate(
        postId, 
        { 
          $push: { comments: newComment }, 
          $inc: { commentCount: 1 }, 
        },
        { new: true }, 
        
      );



    console.log(updatedPost)

    return  res.status(200).json({ message: "comment created successfully" });


  }




    }
    catch(err){

              res.status(500).json({ message: "internal server error" });



    }




};

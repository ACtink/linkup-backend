













import Post from "../models/post.js";


export const getLikesCount = async (req, res) => {
  // console.log("request came for likes Count");

  const postId = req.params.postId;

// connectToWebSocketClients()
//   const likeValue = req.body.liked;

    try {

  const post = await Post.findById(postId);

  if(post){


    return  res.status(200).json({ totalLikes: post.likes });


  }




    }
    catch(err){

              res.status(500).json({ message: "internal server error" });



    }




};

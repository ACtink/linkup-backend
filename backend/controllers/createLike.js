



import Like from "../models/like.js";
import Post from "../models/post.js";
import { connectToWebSocketClients } from "../utils/webSocketConnection.js";


export const createLike = async (req, res) => {
  // console.log("request came for new Like");

  const postId = req.params.postId;

//   const likeValue = req.body.liked;

    try {

  const post = await Post.findById(postId);

  if(post){


        // Check if the author ID is already present in the likesArray for the given post ID
        const alreadyLiked = post.likesArray.some(like => like.author.equals(req.userId));
      
        if (!alreadyLiked) {


            const newLikeObject = {
                liked:  true,
                author: req.userId,
                postId : post._id
              };
        
            const newLike = await Like.create(newLikeObject);



          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $addToSet: { likesArray: newLike },                // Add author ID to likesArray if it doesn't exist
              $inc: { likes: 1 }, // Increment likes count
            },
            { new: true }
          );
      

          // console.log(updatedPost)

          // updatedPost now contains the updated document with the author ID added to likesArray
        }
      }


      connectToWebSocketClients()



    return  res.status(200).json({ message: "like created successfully" });




    }
    catch(err){

              res.status(500).json({ message: "internal server error" });



    }




};

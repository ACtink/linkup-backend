



import Post from "../models/post.js";


export const getLikesOfThePost = async (req, res) => {
  // console.log("request came for likes Count");

  const postId = req.params.postId;

  // connectToWebSocketClients()
  //   const likeValue = req.body.liked;

  try {
    const post = await Post.findById(postId).populate({
      path: "likesArray",
      populate: {
        path: "author",
        model: "User",
        select:
          "-password -email -followers -following -followersCount -followingCount",
      },
    });


    if (post) {
        
        res.status(200).json(post.likesArray);
    }

    else{
        res.status(404).json({error:"No Post with this user id exists"})
    }


  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

// import Post from "../models/post"

import Post from "../models/post.js";

export const createPost = async (req, res) => {
  console.log("request came for new post");

//   console.log(req.body);
//   console.log(req.userId)
  const newPostObject = { 
    postbody: req.body.postbody,
    author:req.userId,
    likes:0


};

try{

   const newPost = await Post.create(newPostObject)

   if(newPost){
    res.status(200).json(newPost)


   }

}catch(err){
    res.status(500).json({message:"internal server error"})

}

   
};

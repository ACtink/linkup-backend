
import Post from "../models/post.js"


export const userPosts = async (req, res, next) => {

    console.log("inside allposts")

    console.log(req.userId)

    try{
    const myposts = await Post.find({ author: req.userId }).sort({ timestamp: -1 })

   

    if(myposts){
      res.status(200).json(myposts)

    }
    else{
      res.status(204).json({message:"No Posts Found"})
    }

    }catch(err){

        console.log(err)

      res.status(500).json({error:"something went wrong on the server"})


    }


}
    

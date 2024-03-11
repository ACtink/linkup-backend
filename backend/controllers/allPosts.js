    
 import Post from "../models/post.js";   
    
    
  
    
    
    export const allPosts = async (req, res, next) => {

       const page = parseInt(req.query.page) || 1; // Current page number, default to 1
       const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;


      try{
      // const allPosts = await Post.find({}).limit(10).sort({ timestamp: -1 })

      //  const posts = await Post.find()
      //    .skip(skip)
      //    .limit(limit)
      //    .sort({ timestamp: -1 })
      //    .populate("author", "-password -email")
      //    .exec();


  const posts = await Post.find({})
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "-password -email")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
        select:
          "-password -email -followers -following -followersCount -followingCount",
      },
    }).populate({
      path: "likesArray",
      populate: {
        path: "author",
        model: "User",
        select:
          "-password -email -followers -following -followersCount -followingCount",
      },
    })


      if(posts){
        res.status(200).json(posts)

      }
      else{
        res.status(204).json({message:"No Posts Found"})
      }

      }catch(err){

        res.status(500).json({error:"something went wrong on the server"})


      }
      

     
    };



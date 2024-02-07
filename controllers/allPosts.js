    
 import Post from "../models/post.js";   
    
    
    
    
    
    
    export const allPosts = async (req, res, next) => {



      try{
      const allPosts = await Post.find({})

      if(allPosts){
        res.status(200).json(allPosts)

      }
      else{
        res.status(204).json({message:"No Posts Found"})
      }

      }catch(err){

        res.status(500).json({error:"something went wrong on the server"})


      }
      

     
    };



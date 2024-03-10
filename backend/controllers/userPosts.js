
import Post from "../models/post.js"
import User from "../models/user.js";


export const userPosts = async (req, res, next) => {

  const username = req.params.username;

    console.log("inside allposts")

    console.log(username)


    try{


        const user = await User.findOne({ username })

        console.log("this is found user", user);

        if (!user) {
          return res
            .status(404)
            .json({ message: "No user exists with this username" });
        }



          

    // const posts = await Post.find({ username: username }).sort({ timestamp: -1 })
const posts = await Post.find({ username: username })
  .sort({ timestamp: -1 })
  .populate({
    path: "comments",
    populate: {
      path: "author",
      model: "User",
      select: "-password -email -followers -following -followersCount -followingCount", // Assuming your user model is named 'User'
    },
  })


   

    if(posts){
      res.status(200).json(posts)

    }
    else{
      res.status(204).json({message:"No Posts Found"})
    }

    }catch(err){

        console.log(err)

      res.status(500).json({error:"something went wrong on the server"})


    }


}
    

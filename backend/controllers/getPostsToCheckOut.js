import Post from "../models/post.js";

export const getPostsToCheckOut = async (req, res) => {
  try {
    // const user = await User.findOne({ username });
    console.log("request aayi hai for getPostsToCheckOut");

    const limit = parseInt(req.query.limit) || 3;

    const posts = await Post.find({})
      .sort("-_id")
      .select(
        "-likesArray -comments -commentCount"
        
      )
      .limit(limit);
    // const user = await User.findOne({
    //   username: { $regex: new RegExp(`^${username}$`, "i") },
    // })
    //   .select("-password")
    //   .populate(
    //     "following",
    //     "-password -email -following -followers -followersCount -followingCount  -__v  -_id"
    //   )
    //   .populate(
    //     "followers",
    //     "-password -email -following -followers -followersCount -followingCount  -__v  -_id"
    //   );

    if (!posts) {
      return res.status(404).json({ message: "No posts available" });
    }

    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

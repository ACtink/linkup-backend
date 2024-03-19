import Post from "../models/post.js";

export const getPost = async (req, res) => {
  console.log(" new request came for getting the post");

  const postId = req.params.postId;

  try {
    const foundPost = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
        select:
          "-password -email -followers -following -followersCount -followingCount",
      },
    });
    if (!foundPost) {
      res.status(204).json({ error: "Post not found" });
    } else {
      res.status(200).json(foundPost);
    }
  } catch (error) {
    console.error("Error finding post:", error.message);
    res.status(500).json({ error: "error while finding post" });
  }
};

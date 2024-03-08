import Like from "../models/like.js";
import Post from "../models/post.js";
import User from "../models/user.js";

export const setFollow = async (req, res) => {
  console.log("inside setFollow");
  const username = req.params.username;
  const followerId = req.userId; // Assuming req.userId is the ID of the follower

  try {
    const userToFollow = await User.findOne({ username });
        const userWhoIsFollowing = await User.findById({ _id :followerId });


    if (!userToFollow) {
      return res
        .status(404)
        .json({ message: "No user exists with this username" });
    }

      if (!userWhoIsFollowing) {
        return res
          .status(404)
          .json({ message: "No user exists with this username" });
      }

    // Check if the follower ID already exists in the followers array
    if (userToFollow.followers.includes(followerId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }


    const updatedUserWhoWantedToFollow =  await User.findOneAndUpdate(
      { _id: followerId }, // Filter to match the user document by username
      {
        $addToSet: { following: userToFollow._id }, // Add follower ID to followers array if it doesn't exist
        $inc: { followingCount: 1 }, // Increment followers count
      },
      { new: true } // Return the modified document after update
    ).select("-password");

    // Add follower ID to followers array and increment followers count
    const updatedUser = await User.findOneAndUpdate(
      { username: username }, // Filter to match the user document by username
      {
        $addToSet: { followers: followerId }, // Add follower ID to followers array if it doesn't exist
        $inc: { followersCount: 1 }, // Increment followers count
      },
      { new: true } // Return the modified document after update
    ).select("-password"); // Exclude the password field from the returned document

    console.log(updatedUser);

    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

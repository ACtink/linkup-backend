import Like from "../models/like.js";
import Post from "../models/post.js";
import User from "../models/user.js";

export const setUnFollow = async (req, res) => {
  console.log("inside setUnFollow");
  const username = req.params.username;
  const unfollowerId = req.userId; // Assuming req.userId is the ID of the follower

  try {
    const userToUnFollow = await User.findOne({ username });
    const userWhoIsUnFollowing = await User.findById({ _id: unfollowerId });

    if (!userToUnFollow) {
      return res
        .status(404)
        .json({ message: "No user exists with this username" });
    }

    if (!userWhoIsUnFollowing) {
      return res
        .status(404)
        .json({ message: "No user exists with this username" });
    }

    // Check if the follower ID already exists in the followers array
    if (!userToUnFollow.followers.includes(unfollowerId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    const updatedUserWhoWantedToUnFollow = await User.findOneAndUpdate(
      { _id: unfollowerId }, // Filter to match the user document by username
      {
        $pull: { following: userToUnFollow._id }, // Remove userToFollow ID from following array
        $inc: { followingCount: -1 }, // Decrement following count
      },
      { new: true } // Return the modified document after update
    ).select("-password");


    // Add follower ID to followers array and increment followers count
    const updatedUser = await User.findOneAndUpdate(
      { username: username }, // Filter to match the user document by username
      {
        $pull: { followers: unfollowerId }, // Add follower ID to followers array if it doesn't exist
        $inc: { followersCount: -1 }, // Increment followers count
      },
      { new: true } // Return the modified document after update
    ).select("-password"); // Exclude the password field from the returned document

    console.log(updatedUser);

    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

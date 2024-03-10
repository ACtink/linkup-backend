import User from "../models/user.js";

export const getUsersToFollow = async (req, res) => {

  try {
    // const user = await User.findOne({ username });
console.log("request aayi hai for userstofollow")

       const limit = parseInt(req.query.limit) || 3;


 const users = await User.find({})
   .sort("-_id")
   .select(
     "-password -email -following -followers -followersCount -followingCount  -__v"
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

    if (!users) {
      return res
        .status(404)
        .json({ message: "No users available" });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

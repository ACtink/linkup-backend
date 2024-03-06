import User from "../models/user.js";

export const getUserProfile = async (req, res) => {
  const username = req.params.username;







  

  try {
    // const user = await User.findOne({ username });
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });


    if (!user) {
      return res
        .status(404)
        .json({ message: "No user exists with this username" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

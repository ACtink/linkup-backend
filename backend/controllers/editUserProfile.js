import User from "../models/user.js";
import { connectToS3, uploadToS3 } from "../utils/s3Service.js";
import { v4 as uuidv4 } from "uuid";


export const editUserProfile = async (req, res) => {
  const username = req.params.username;

  // console.log(req.body.username)
  // console.log(req.file)
  // console.log(req.body)


  try {
    const user = await User.findOne({ username });

    console.log("this is found user" , user)

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user exists with this username" });
    }



  const file = req.file;

    const client = connectToS3();


    console.log("s3 client" , client)

   const fileLocationInS3 = `UsersProfilePics/${uuidv4()}-${file.originalname}`

    const response = await uploadToS3(client, fileLocationInS3 , file.buffer);

    console.log(response)

    if (response) {
      const urlString = `https://twitter-project-post-bucket.s3.ap-south-1.amazonaws.com/${fileLocationInS3}`

      
           const updates = { username:req.body.username , profilePic: urlString };

           console.log(urlString)

    //   const updatedUser = await User.updateOne(
    //   { username: username }, // Filter to match the user document by username
    //   { $set: updates } // Update operations to apply
    // );

    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: updates },
      { new: true } // Return the updated document
    );


      console.log("updated user " , updatedUser)

      if (updatedUser) {
        res.status(200).json(updatedUser);
      }
    }
  }catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
  }





























    // const updatedUser = await User.







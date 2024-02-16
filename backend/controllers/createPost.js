// import Post from "../models/post"

import Post from "../models/post.js";
import { connectToS3, uploadToS3 } from "../utils/s3Service.js";
import { v4 as uuidv4 } from 'uuid';


export const createPost = async (req, res) => {
  console.log("request came for new post");

  const file = req.file;
  try {
    const client = connectToS3();

   const fileLocationInS3 = `UserPictures/${uuidv4()}-${file.originalname}`

    const response = await uploadToS3(client, fileLocationInS3 , file.buffer);

    console.log(response)

    if (response) {
      const urlString = `https://twitter-project-post-bucket.s3.ap-south-1.amazonaws.com/${fileLocationInS3}`

      const newPostObject = {
        title: req.body.title,
        author: req.userId,
        username:req.username,
        likes: 0,
        photoUrl: urlString,
      };

      const newPost = await Post.create(newPostObject);

      console.log(newPost)

      if (newPost) {
        res.status(200).json({message:"Post created Successfully"});
      }
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

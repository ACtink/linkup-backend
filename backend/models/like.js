import mongoose from "mongoose";




export const likeSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },


    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the User model
        required: true,
      },



    liked: {
      type: Boolean,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });


  const Like = mongoose.model("Like", likeSchema);

export default Like;

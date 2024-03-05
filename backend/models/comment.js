import mongoose from "mongoose";




export const commentSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username:{
      type:String,
      
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });


  const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

import mongoose from "mongoose";
import {commentSchema} from "./comment.js"
// const User = require('./user')
import User from './user.js';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model 
    required: true,
  },
  likes :{
    type : Number,
  },
  photoUrl :{
    type : String,
  },
  comments: [commentSchema],

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;

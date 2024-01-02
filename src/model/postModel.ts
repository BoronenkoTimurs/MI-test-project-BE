import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  // images: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const PostModel = mongoose.model("Post", PostSchema);

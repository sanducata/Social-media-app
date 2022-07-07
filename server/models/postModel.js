import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: [String], required: true, default: [] },
    description: { type: String },
    selectedFile: { type: String, required: true },
    likes: { type: [String], default: [] },
    comments: [
      {
        commentId: { type: String },
        text: { type: String },
        userId: { type: String },
        createdAt: { type: String },
      },
    ],
    isPostSavedToCollection: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

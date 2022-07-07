import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7 },
    profilePicture: { type: String },
    occupation: { type: String },
    description: { type: String, maxlength: 500 },

    website: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    dribbble: { type: String },

    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },

    collections: [
      {
        title: { type: String },
        posts: { type: [String] },
      },
    ],
    postsLiked: { type: Array, default: [] },

    notifications: [
      {
        message: { type: String },
        userId: { type: String },
        createdAt: { type: String },
        postId: { type: String },
      },
    ],
    newNotifications: [
      {
        message: { type: String },
        userId: { type: String },
        createdAt: { type: String },
        postId: { type: String },
      },
    ],

    isPro: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

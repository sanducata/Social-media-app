import express from "express";
import fs from "fs";

import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

// Create a post
router.post("/", auth, async (req, res) => {
  const newPost = new Post({ ...req.body, userId: req.user });
  const splitTags = newPost.tags[0].split(" ");

  newPost.tags = splitTags;

  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Edit post
router.put("/editPost/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, tags } = req.body;

    const updatedPost = {
      title: title,
      description: description,
      tags: tags,
    };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Delete post
router.delete("/deletePost/:id/:selectedFile", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const selectedFile = req.params.selectedFile;

    await Post.findByIdAndDelete(postId);

    fs.unlink(`../server/images/${selectedFile}`, (error) => {
      if (error) console.log(error);
    });

    res.status(200).json({ message: "The post has been deleted." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get all posts
router.get("/get/allPosts", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all user's posts
router.get("/profilePosts/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get followings' posts
router.get("/following/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const currentUser = await User.findById(id);

    const followingPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    let posts = [];
    followingPosts.forEach((followerPosts) => {
      followerPosts.forEach((post) => {
        posts.push(post);
      });
    });

    res.json({ status: 200, posts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get liked posts
router.get("/likedPosts/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const currentUser = await User.findById(id);
    const posts = await Post.find();

    let likedPosts = [];

    for (const post of posts) {
      if (currentUser.postsLiked.includes(post._id.toString()))
        likedPosts.push(await Post.findById(post._id.toString()));
    }

    if (likedPosts === [])
      res.status(200).json({ message: "You did not like any posts yet." });

    res.status(200).json(likedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a post
router.put("/like/:id", auth, async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  const createdAt = req.body.createdAt;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    const userToGetNotified = await User.findById(post.userId);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      await user.updateOne({ $push: { postsLiked: postId } });

      const newNotification = {
        message: " liked your post",
        userId: userId,
        createdAt: createdAt,
        postId: postId,
      };

      await userToGetNotified.updateOne({
        $push: {
          newNotifications: newNotification,
        },
      });

      const updatedUser = await User.findById(post.userId);

      res.status(200).json({ updatedUser, message: "like" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      await user.updateOne({ $pull: { postsLiked: postId } });

      res.status(200).json({ message: "You disliked this post." });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Comment on a post
router.put("/comment/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const { text, userId, createdAt } = req.body;
    const commentId = mongoose.Types.ObjectId();

    const post = await Post.findById(postId);
    const userToGetNotified = await User.findById(post.userId);
    const user = await User.findById(userId);

    await post.updateOne({
      $push: {
        comments: {
          commentId: commentId,
          text: text,
          userId: userId,
          createdAt: createdAt,
        },
      },
    });

    const newNotification = {
      message: " commented on your post: " + text,
      userId: user._id,
      createdAt: createdAt,
      postId: postId,
    };

    await userToGetNotified.updateOne({
      $push: {
        newNotifications: newNotification,
      },
    });

    const updatedPost = await Post.findById(postId);
    const updatedUser = await User.findById(post.userId);

    res.status(200).json({ updatedPost, updatedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete comment
router.delete("/deleteComment", auth, async (req, res) => {
  try {
    const postId = req.query.postId;
    const commentId = req.query.commentId;

    const post = await Post.findById(postId);

    const filteredComments = post.comments.filter((comment) => {
      return comment.commentId !== commentId;
    });

    await post.updateOne({ comments: filteredComments });

    const updatedPost = await Post.findById(postId);

    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Search posts
router.get("/search/posts", async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;

    const searchQueryIgnoreCase = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [
        { title: { $regex: searchQueryIgnoreCase } },
        { tags: { $regex: searchQueryIgnoreCase } },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add post to collection
router.put("/addPostToCollection/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const collectionTitle = req.body.collectionTitle;
    const postId = req.body.post;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    const findCollection = user.collections.find(
      (collection) => collection.title === collectionTitle
    );

    if (findCollection.posts.includes(postId))
      return res
        .status(400)
        .json({ message: "The post was already saved in this collection." });

    const collectionIndex = user.collections.indexOf(findCollection);

    user.collections[collectionIndex].posts.push(postId);
    await user.save();

    const updatedUser = await User.findById(userId);

    await post.updateOne({
      $push: {
        isPostSavedToCollection: collectionTitle,
      },
    });

    const updatedPost = await Post.findById(postId);

    res.status(200).json({ updatedUser, updatedPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Revome post from collection
router.put("/removePostToCollection/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const collectionTitle = req.body.collectionTitle;
    const postId = req.body.post;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    const findCollection = user.collections.find(
      (collection) => collection.title === collectionTitle
    );

    const collectionIndex = user.collections.indexOf(findCollection);

    user.collections[collectionIndex].posts.pull(postId);
    await user.save();

    const updatedUser = await User.findById(userId);

    await post.updateOne({
      $pull: {
        isPostSavedToCollection: collectionTitle,
      },
    });

    const updatedPost = await Post.findById(postId);

    res.status(200).json({ updatedUser, updatedPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get posts from a collection
router.get("/collection/getPosts", auth, async (req, res) => {
  try {
    const userId = req.query.userId;
    const collectionTitle = req.query.collectionTitle;

    const user = await User.findById(userId);

    const getCollectionPosts = user.collections.filter(
      (collection) => collection.title === collectionTitle
    );

    const posts = await Post.find({
      _id: {
        $in: getCollectionPosts[0].posts,
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

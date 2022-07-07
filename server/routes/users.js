import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Conversation from "../models/conversationModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get user
router.get("/", async (req, res) => {
  const username = req.query.username;
  const id = req.query.userId;

  try {
    const user = username
      ? await User.findOne({ username })
      : await User.findById(id);

    const { password, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get current user
router.get("/getUser/currentUser", auth, async (req, res) => {
  try {
    const token = req.cookies.token;

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(verified.user);

    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile info
router.put("/editProfile/:id", auth, async (req, res) => {
  if (req.params.id === req.user) {
    try {
      const id = req.params.id;
      const {
        name,
        email,
        profilePicture,
        username,
        occupation,
        description,
        oldPicture,
        isProfilePictureDifferent,
      } = req.body;

      const updatedUser = {
        name,
        email,
        profilePicture,
        username,
        occupation,
        description,
        _id: id,
      };

      await User.findByIdAndUpdate(id, updatedUser, { new: true });

      isProfilePictureDifferent
        ? fs.unlink(`../server/images/${oldPicture}`, (error) => {
            if (error) console.log(error);
          })
        : null;

      res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only update your account!" });
  }
});

// Change password
router.put("/changePassword/:id", auth, async (req, res) => {
  if (req.params.id === req.user) {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);
    const updatedUser = {
      ...user._doc,
    };

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (isOldPasswordCorrect) {
      try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(newPassword, salt);

        updatedUser.password = hashPassword;

        await User.findByIdAndUpdate(id, updatedUser, { new: true });

        res.json(updatedUser);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    } else {
      return res.status(400).json({ message: "Incorrect old password!" });
    }
  }
});

// Update profile links
router.put("/editProfileLinks/:id", auth, async (req, res) => {
  if (req.params.id === req.user) {
    try {
      const id = req.params.id;
      const { website, facebook, twitter, instagram, dribbble } = req.body;

      const updatedUser = {
        website: website,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        dribbble: dribbble,
      };

      await User.findByIdAndUpdate(id, updatedUser, { new: true });

      res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only update your account!" });
  }
});

// Delete user
router.delete("/deleteAccount/:id", auth, async (req, res) => {
  if (req.params.id === req.user) {
    try {
      const id = req.params.id;
      await User.findByIdAndDelete(id);

      res.status(200).json({ message: "Your account has been deleted!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only delete your account!" });
  }
});

// Follow user
router.put("/follow/:id", auth, async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const id = req.params.id;
      const currentUserId = req.body.currentUser._id;
      const createdAt = req.body.createdAt;

      const user = await User.findById(id);
      const currentUser = await User.findById(currentUserId);

      if (!user.followers.includes(currentUserId)) {
        await user.updateOne({ $push: { followers: currentUserId } });
        await currentUser.updateOne({ $push: { following: id } });

        const newNotification = {
          message: " started following you",
          userId: currentUser._id,
          createdAt: createdAt,
        };

        await user.updateOne({
          $push: {
            newNotifications: newNotification,
          },
        });

        const updatedUser = await User.findById(id);

        res.status(200).json(updatedUser);
      } else {
        res.status(403).json({ message: "You already follow this user!" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "You can't follow yourself!" });
  }
});

// Unfollow user
router.put("/unfollow/:id", auth, async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const id = req.params.id;
      const currentUserId = req.body._id;

      const user = await User.findById(id);
      const currentUser = await User.findById(currentUserId);

      if (user.followers.includes(currentUserId)) {
        await user.updateOne({ $pull: { followers: currentUserId } });
        await currentUser.updateOne({ $pull: { following: id } });

        res.status(200).json(`${user.name} has been unfollowed.`);
      } else {
        res.status(403).json({ message: "You don't follow this user." });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "You can't unfollow yourself." });
  }
});

// Set user notifications
router.put("/setNotifications/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    for (const newNotification of user.newNotifications) {
      await user.updateOne({
        $push: {
          notifications: newNotification,
        },
        $pull: {
          newNotifications: newNotification,
        },
      });
    }

    const updatedUser = await User.findById(userId);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Search users
router.get("/searchUsers", async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;

    const searchQueryIgnoreCase = new RegExp(searchQuery, "i");

    const allUsers = await User.find({
      name: { $regex: searchQueryIgnoreCase },
    });

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create collection
router.put("/createCollection/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const collectionName = req.body.newCollection.collectionName;
    const postId = req.body.post;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (
      user.collections.some((collection) => collection.title === collectionName)
    )
      return res
        .status(400)
        .json({ message: "A collection with the same name already exists." });

    await user.updateOne({
      $push: { collections: { title: collectionName, posts: postId } },
    });

    const updatedUser = await User.findById(userId);

    await post.updateOne({
      $push: {
        isPostSavedToCollection: collectionName,
      },
    });

    const updatedPost = await Post.findById(postId);

    res.status(200).json({ updatedUser, updatedPost });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get all user's collections
router.get("/getCollections/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    res.status(200).json(user.collections);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Send message
router.put("/sendMessage/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.body.currentUser._id;
    const users = [userId, currentUserId];
    const createdAt = req.body.createdAt;
    const message = req.body.message;
    let existingConv = null;

    const conversations = await Conversation.find({
      members: { $in: currentUserId },
    });

    for (const conversation of conversations) {
      for (const member of conversation.members)
        if (member === userId) {
          existingConv = conversation;
        }
    }

    if (existingConv !== null) {
      await existingConv.updateOne({
        $push: {
          newMessages: {
            message: message,
            sender: currentUserId,
            createdAt: createdAt,
          },
        },
      });

      const updatedConversation = existingConv;

      res.status(200).json(updatedConversation);
    } else {
      const newConversation = new Conversation({
        members: users,
        newMessages: {
          message: message,
          sender: currentUserId,
          createdAt: createdAt,
        },
      });

      const savedConversation = await newConversation.save();

      res.status(200).json(savedConversation);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get current user's conversations
router.get("/getConversations", auth, async (req, res) => {
  try {
    const currentUserId = req.user;

    const conversations = await Conversation.find({ members: currentUserId });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get one conversation
router.get("/getOneConversation/:id", auth, async (req, res) => {
  try {
    const conversationId = req.params.id;

    const conversation = await Conversation.findById(conversationId);

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Set user messages
router.put("/setMessages/:id", auth, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const currentUserId = req.user;

    const conversation = await Conversation.findById(conversationId);

    for (const newMessage of conversation.newMessages) {
      await conversation.updateOne({
        $push: {
          messages: newMessage,
        },
        $pull: {
          newMessages: newMessage,
        },
      });
    }

    const conversations = await Conversation.find({ members: currentUserId });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;

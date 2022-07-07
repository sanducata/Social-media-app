import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      password,
      profilePicture,
      occupation,
      description,
    } = req.body;

    if (!username || !name || !email || !password || !occupation)
      return res
        .status(400)
        .json({ message: "Complete all the required fields." });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "An account with given email already exists." });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      name: name,
      email: email,
      password: hashPassword,
      profilePicture: profilePicture,
      occupation: occupation,
      description: description,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET_KEY);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Complete all the required fields." });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ message: "No user with given email." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Wrong password." });

    const token = jwt.sign(
      { user: existingUser._id },
      process.env.JWT_SECRET_KEY
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET_KEY);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
});

export default router;

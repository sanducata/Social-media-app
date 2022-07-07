import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import bodyParser from "body-parser";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use("/images", express.static("images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully.");
  } catch (error) {
    console.log(error);
  }
});

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION_URL, (error) => {
  if (error) return console.log(error.message);
  console.log("Connected to MongoDB");
});

// set up routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: { type: [String] },
    messages: [
      {
        message: { type: String },
        sender: { type: String },
        createdAt: { type: String },
      },
    ],
    newMessages: [
      {
        message: { type: String },
        sender: { type: String },
        createdAt: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

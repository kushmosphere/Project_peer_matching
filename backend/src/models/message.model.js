import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    encryptedBody: String,
    media: [
      {
        type: { type: String, enum: ["image", "video", "file"] },
        url: String,
      },
    ],
    voiceNoteUrl: String,
    seenBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        seenAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);


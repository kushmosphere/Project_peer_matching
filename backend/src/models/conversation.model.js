import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    type: { type: String, enum: ["private", "group"], required: true },
    participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    title: String,
    encryption: {
      enabled: { type: Boolean, default: true },
      keyVersion: { type: Number, default: 1 },
    },
    lastMessageAt: Date,
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);


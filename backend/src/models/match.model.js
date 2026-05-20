import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mode: { type: String, enum: ["friends", "study", "dating"], required: true },
    action: { type: String, enum: ["like", "pass"], required: true },
  },
  { timestamps: true }
);

const matchSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    mode: { type: String, enum: ["friends", "study", "dating"], required: true },
    score: Number,
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

export const Swipe = mongoose.model("Swipe", swipeSchema);
export const Match = mongoose.model("Match", matchSchema);


import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    type: {
      type: String,
      enum: ["club", "event", "hackathon", "placement", "lost_found", "notes"],
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    coverUrl: String,
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    adminIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Community = mongoose.model("Community", communitySchema);


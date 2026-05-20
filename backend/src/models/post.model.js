import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true, index: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    media: [
      {
        type: { type: String, enum: ["image", "video"], required: true },
        url: { type: String, required: true },
        thumbnailUrl: String,
        publicId: String,
      },
    ],
    caption: { type: String, maxlength: 2200 },
    hashtags: [String],
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    moderation: {
      status: { type: String, enum: ["approved", "flagged", "hidden"], default: "approved" },
      score: Number,
      labels: [String],
    },
    visibility: { type: String, enum: ["college", "community"], default: "college" },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);


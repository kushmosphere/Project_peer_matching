import express from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { Post } from "../models/post.model.js";
import { moderateText } from "../services/moderation.service.js";

const router = express.Router();

router.use(requireAuth);

router.get("/feed", async (req, res) => {
  const posts = await Post.find({ collegeId: req.user.collegeId, "moderation.status": "approved" })
    .sort({ createdAt: -1 })
    .limit(30);

  res.json({ posts });
});

router.post("/posts", async (req, res) => {
  const moderation = await moderateText(req.body.caption || "");
  const post = await Post.create({
    collegeId: req.user.collegeId,
    authorId: req.user.sub,
    media: req.body.media || [],
    caption: req.body.caption,
    hashtags: req.body.hashtags || [],
    moderation,
  });

  res.status(201).json({ post });
});

router.post("/posts/:id/like", async (req, res) => {
  await Post.updateOne({ _id: req.params.id, collegeId: req.user.collegeId }, { $inc: { likeCount: 1 } });
  res.json({ ok: true });
});

router.get("/trending", async (req, res) => {
  const posts = await Post.find({ collegeId: req.user.collegeId }).sort({ likeCount: -1, commentCount: -1 }).limit(10);
  res.json({ posts });
});

export default router;


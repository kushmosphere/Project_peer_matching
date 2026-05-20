import express from "express";
import { requireAdmin } from "../middleware/require-admin.js";
import { requireAuth } from "../middleware/require-auth.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/verifications", async (req, res) => {
  const users = await User.find({
    collegeId: req.user.collegeId,
    "verification.status": { $in: ["pending_admin", "pending_email", "pending_phone"] },
  }).sort({ createdAt: -1 });

  res.json({ users });
});

router.patch("/users/:id/verify", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, collegeId: req.user.collegeId },
    { verification: { status: "verified", verifiedAt: new Date(), method: "admin" } },
    { new: true }
  );

  res.json({ user });
});

router.patch("/users/:id/ban", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, collegeId: req.user.collegeId },
    { "verification.status": "banned" },
    { new: true }
  );

  res.json({ user });
});

router.get("/reports", async (req, res) => {
  const posts = await Post.find({ collegeId: req.user.collegeId, "moderation.status": "flagged" }).sort({ createdAt: -1 });
  res.json({ posts });
});

export default router;


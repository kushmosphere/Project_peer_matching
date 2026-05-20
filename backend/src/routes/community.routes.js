import express from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { Community } from "../models/community.model.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const communities = await Community.find({ collegeId: req.user.collegeId }).sort({ createdAt: -1 });
  res.json({ communities });
});

router.post("/", async (req, res) => {
  const community = await Community.create({
    collegeId: req.user.collegeId,
    type: req.body.type,
    name: req.body.name,
    description: req.body.description,
    coverUrl: req.body.coverUrl,
    memberIds: [req.user.sub],
    adminIds: [req.user.sub],
  });

  res.status(201).json({ community });
});

router.post("/:id/join", async (req, res) => {
  await Community.updateOne({ _id: req.params.id, collegeId: req.user.collegeId }, { $addToSet: { memberIds: req.user.sub } });
  res.json({ ok: true });
});

export default router;


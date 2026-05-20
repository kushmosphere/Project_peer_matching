import express from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { Match, Swipe } from "../models/match.model.js";
import { User } from "../models/user.model.js";
import { scoreStudentMatch } from "../services/matching.service.js";

const router = express.Router();

router.use(requireAuth);

router.get("/deck", async (req, res) => {
  const currentUser = await User.findById(req.user.sub);
  const candidates = await User.find({
    collegeId: req.user.collegeId,
    _id: { $ne: req.user.sub },
    "verification.status": "verified",
  }).limit(25);

  const deck = candidates
    .map((candidate) => ({
      user: candidate,
      score: scoreStudentMatch(currentUser, candidate, req.query.mode),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  res.json({ deck });
});

router.post("/swipes", async (req, res) => {
  const swipe = await Swipe.create({
    collegeId: req.user.collegeId,
    fromUserId: req.user.sub,
    toUserId: req.body.toUserId,
    mode: req.body.mode,
    action: req.body.action,
  });

  let match = null;

  if (req.body.action === "like") {
    const reciprocal = await Swipe.findOne({
      collegeId: req.user.collegeId,
      fromUserId: req.body.toUserId,
      toUserId: req.user.sub,
      mode: req.body.mode,
      action: "like",
    });

    if (reciprocal) {
      match = await Match.create({
        collegeId: req.user.collegeId,
        users: [req.user.sub, req.body.toUserId],
        mode: req.body.mode,
        score: 100,
      });
    }
  }

  res.status(201).json({ swipe, match });
});

router.get("/matches", async (req, res) => {
  const matches = await Match.find({ collegeId: req.user.collegeId, users: req.user.sub }).sort({ createdAt: -1 });
  res.json({ matches });
});

export default router;


import express from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const user = await User.findById(req.user.sub).select("-phoneHash");
  res.json({ user });
});

router.patch("/", async (req, res) => {
  const allowed = ["bio", "interests", "clubs", "profilePictureUrl"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const user = await User.findByIdAndUpdate(req.user.sub, updates, { new: true }).select("-phoneHash");

  res.json({ user });
});

router.patch("/privacy", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.sub,
    {
      privacy: {
        showUsn: Boolean(req.body.showUsn),
        datingEnabled: Boolean(req.body.datingEnabled),
        antiScreenshotChat: Boolean(req.body.antiScreenshotChat),
      },
    },
    { new: true }
  ).select("-phoneHash");

  res.json({ user });
});

export default router;


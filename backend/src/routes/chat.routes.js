import express from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const conversations = await Conversation.find({ collegeId: req.user.collegeId, participantIds: req.user.sub }).sort({
    lastMessageAt: -1,
  });

  res.json({ conversations });
});

router.post("/", async (req, res) => {
  const conversation = await Conversation.create({
    collegeId: req.user.collegeId,
    type: req.body.type,
    participantIds: [...new Set([req.user.sub, ...(req.body.participantIds || [])])],
    title: req.body.title,
  });

  res.status(201).json({ conversation });
});

router.get("/:id/messages", async (req, res) => {
  const conversation = await Conversation.findOne({
    _id: req.params.id,
    collegeId: req.user.collegeId,
    participantIds: req.user.sub,
  });

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found." });
  }

  const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ messages: messages.reverse() });
});

router.post("/:id/messages", async (req, res) => {
  const conversation = await Conversation.findOne({
    _id: req.params.id,
    collegeId: req.user.collegeId,
    participantIds: req.user.sub,
  });

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found." });
  }

  const message = await Message.create({
    conversationId: conversation._id,
    senderId: req.user.sub,
    encryptedBody: req.body.encryptedBody,
    media: req.body.media,
    voiceNoteUrl: req.body.voiceNoteUrl,
  });

  conversation.lastMessageAt = new Date();
  await conversation.save();

  res.status(201).json({ message });
});

export default router;


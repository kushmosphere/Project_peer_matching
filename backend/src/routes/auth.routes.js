import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { College } from "../models/college.model.js";
import { StudentRecord } from "../models/student-record.model.js";
import { User } from "../models/user.model.js";
import { getFirebaseAdmin } from "../services/firebase.js";
import { getEmailDomain, isPublicEmail } from "../utils/email.js";

const router = express.Router();

const precheckSchema = z.object({
  email: z.string().email(),
  usn: z.string().min(5),
});

router.post("/precheck", async (req, res) => {
  const body = precheckSchema.parse(req.body);
  const email = body.email.toLowerCase().trim();
  const usn = body.usn.toUpperCase().trim();

  if (isPublicEmail(email)) {
    return res.status(400).json({ message: "Use your official college email address." });
  }

  const college = await College.findOne({ allowedEmailDomains: getEmailDomain(email) });
  if (!college) {
    return res.status(404).json({ message: "College domain is not supported yet." });
  }

  const record = await StudentRecord.findOne({ collegeId: college._id, usn, status: "active" });
  if (!record) {
    return res.status(404).json({ message: "USN was not found in the college database." });
  }

  res.json({
    college: { id: college._id, name: college.name, shortName: college.shortName },
    student: {
      fullName: record.fullName,
      department: record.department,
      semester: record.semester,
      section: record.section,
    },
  });
});

router.post("/firebase-session", async (req, res) => {
  const { idToken, email, usn } = req.body;
  const firebase = getFirebaseAdmin();
  const decoded = await firebase.auth().verifyIdToken(idToken);
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedUsn = usn.toUpperCase().trim();

  const college = await College.findOne({ allowedEmailDomains: getEmailDomain(normalizedEmail) });
  const record = await StudentRecord.findOne({ collegeId: college?._id, usn: normalizedUsn, status: "active" });

  if (!college || !record) {
    return res.status(403).json({ message: "Student verification failed." });
  }

  const user = await User.findOneAndUpdate(
    { firebaseUid: decoded.uid },
    {
      collegeId: college._id,
      studentRecordId: record._id,
      firebaseUid: decoded.uid,
      fullName: record.fullName,
      email: normalizedEmail,
      usn: record.usn,
      department: record.department,
      semester: record.semester,
      section: record.section,
      verification: {
        status: "verified",
        verifiedAt: new Date(),
        method: "email_usn_phone",
      },
    },
    { new: true, upsert: true }
  );

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      collegeId: user.collegeId.toString(),
      role: user.role,
      verificationStatus: user.verification.status,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
});

export default router;


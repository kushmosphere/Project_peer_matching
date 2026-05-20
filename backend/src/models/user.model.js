import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    studentRecordId: { type: mongoose.Schema.Types.ObjectId, ref: "StudentRecord", required: true },
    firebaseUid: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneHash: String,
    usn: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    section: String,
    profilePictureUrl: String,
    bio: { type: String, maxlength: 180 },
    interests: [String],
    clubs: [String],
    privacy: {
      showUsn: { type: Boolean, default: false },
      datingEnabled: { type: Boolean, default: false },
      antiScreenshotChat: { type: Boolean, default: true },
    },
    verification: {
      status: {
        type: String,
        enum: ["pending_email", "pending_phone", "pending_admin", "verified", "rejected", "banned"],
        default: "pending_phone",
      },
      verifiedAt: Date,
      method: String,
    },
    role: { type: String, enum: ["student", "college_admin", "super_admin"], default: "student" },
  },
  { timestamps: true }
);

userSchema.index({ collegeId: 1, usn: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";

const studentRecordSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    usn: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    section: String,
    officialEmail: { type: String, required: true },
    phoneHash: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

studentRecordSchema.index({ collegeId: 1, usn: 1 }, { unique: true });

export const StudentRecord = mongoose.model("StudentRecord", studentRecordSchema);


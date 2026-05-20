import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    allowedEmailDomains: [{ type: String, required: true }],
    location: String,
    verificationMode: { type: String, default: "database_match" },
  },
  { timestamps: true }
);

export const College = mongoose.model("College", collegeSchema);


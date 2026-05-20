import express from "express";
import multer from "multer";
import { demoComplaints } from "../data/demo-complaints.js";
import { analyzeComplaints } from "../services/complaint-analysis.service.js";
import { parseComplaintsCsv } from "../services/csv-parser.service.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/demo/complaints", (_req, res) => {
  res.json({ complaints: demoComplaints });
});

router.get("/demo/analysis", (_req, res) => {
  res.json(analyzeComplaints(demoComplaints));
});

router.post("/complaints/analyze", (req, res) => {
  const complaints = Array.isArray(req.body) ? req.body : req.body.complaints;

  if (!Array.isArray(complaints)) {
    return res.status(400).json({
      message: "Expected an array of complaints or an object with a complaints array.",
    });
  }

  return res.json(analyzeComplaints(complaints));
});

router.post("/complaints/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Upload a CSV file using form field name 'file'." });
  }

  const csvText = req.file.buffer.toString("utf8");
  const complaints = parseComplaintsCsv(csvText);

  return res.json({
    uploadedRows: complaints.length,
    ...analyzeComplaints(complaints),
  });
});

export default router;

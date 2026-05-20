const defectTaxonomy = [
  {
    key: "battery_overheating",
    label: "Battery overheating / swelling",
    keywords: ["battery", "charging", "charge", "hot", "heat", "overheat", "swelling", "expanded", "burning", "fire", "shutdown"],
    safetyWeight: 35,
  },
  {
    key: "electrical_burning",
    label: "Electrical burning smell / short risk",
    keywords: ["burn", "smoke", "spark", "short", "smell", "melt", "fire", "plastic"],
    safetyWeight: 40,
  },
  {
    key: "noise_vibration",
    label: "Noise / vibration",
    keywords: ["noise", "rattle", "rattling", "vibrate", "vibration", "loud", "compressor"],
    safetyWeight: 12,
  },
  {
    key: "display_failure",
    label: "Display or screen failure",
    keywords: ["screen", "display", "flicker", "flickering", "dead pixel", "black screen", "touch"],
    safetyWeight: 8,
  },
  {
    key: "leakage",
    label: "Leakage",
    keywords: ["leak", "leaking", "water", "fluid", "drip", "seal"],
    safetyWeight: 18,
  },
  {
    key: "cosmetic_or_fit",
    label: "Cosmetic or fit issue",
    keywords: ["scratch", "color", "paint", "dent", "finish", "loose", "gap"],
    safetyWeight: 4,
  },
];

const severityScore = {
  low: 5,
  medium: 15,
  high: 28,
  critical: 40,
};

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

function detectDefect(text) {
  const normalized = normalizeText(text);
  const matches = defectTaxonomy
    .map((defect) => ({
      ...defect,
      hits: defect.keywords.filter((keyword) => normalized.includes(keyword)),
    }))
    .filter((defect) => defect.hits.length > 0)
    .sort((a, b) => b.hits.length - a.hits.length || b.safetyWeight - a.safetyWeight);

  return matches[0] || {
    key: "other",
    label: "Other product complaint",
    keywords: [],
    hits: [],
    safetyWeight: 6,
  };
}

function daysBetween(start, end) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.ceil(ms / 86400000));
}

function calculateSpike(complaints) {
  if (complaints.length < 3) {
    return { recentCount: complaints.length, previousCount: 0, growthPercent: 0, signal: "insufficient_data" };
  }

  const timestamps = complaints.map((complaint) => new Date(complaint.date).getTime()).filter(Number.isFinite);
  const maxDate = new Date(Math.max(...timestamps));
  const recentWindowStart = new Date(maxDate);
  recentWindowStart.setDate(maxDate.getDate() - 7);
  const previousWindowStart = new Date(maxDate);
  previousWindowStart.setDate(maxDate.getDate() - 14);

  const recentCount = complaints.filter((complaint) => new Date(complaint.date) >= recentWindowStart).length;
  const previousCount = complaints.filter((complaint) => {
    const date = new Date(complaint.date);
    return date >= previousWindowStart && date < recentWindowStart;
  }).length;

  const growthPercent = previousCount === 0 ? recentCount * 100 : Math.round(((recentCount - previousCount) / previousCount) * 100);

  return {
    recentCount,
    previousCount,
    growthPercent,
    signal: growthPercent >= 100 && recentCount >= 3 ? "spike_detected" : "normal",
  };
}

function mostCommon(values) {
  const counts = new Map();
  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";
}

function buildSummary(cluster, spike) {
  const issue = cluster.defectLabel.toLowerCase();
  const product = cluster.productId;
  const batch = cluster.batchId;
  const severity = cluster.riskScore >= 75 ? "high" : cluster.riskScore >= 45 ? "moderate" : "low";

  return `A ${severity}-risk cluster points to ${issue} for product ${product}, concentrated around batch ${batch}. ${cluster.complaintCount} related complaints were found, with ${spike.recentCount} in the latest 7-day window. Recommended action: escalate to quality engineering, inspect affected batch records, and sample returned units for component-level validation.`;
}

function scoreCluster(complaints, defect, spike) {
  const volumeScore = Math.min(25, complaints.length * 4);
  const avgSeverity =
    complaints.reduce((sum, complaint) => sum + (severityScore[normalizeText(complaint.severity)] || severityScore.medium), 0) /
    complaints.length;
  const spikeScore = Math.min(25, Math.max(0, spike.growthPercent / 8));
  const batchConcentrationScore = new Set(complaints.map((complaint) => complaint.batchId)).size === 1 ? 10 : 4;

  return Math.round(Math.min(100, volumeScore + avgSeverity + spikeScore + batchConcentrationScore + defect.safetyWeight * 0.4));
}

export function analyzeComplaints(inputComplaints) {
  const complaints = inputComplaints
    .map((complaint, index) => ({
      id: complaint.id || `C-${index + 1}`,
      date: complaint.date || new Date().toISOString().slice(0, 10),
      productId: complaint.productId || complaint.product_id || "unknown-product",
      batchId: complaint.batchId || complaint.batch_id || "unknown-batch",
      source: complaint.source || "unknown",
      severity: normalizeText(complaint.severity || "medium"),
      text: complaint.text || complaint.complaint_text || complaint.return_reason || complaint.notes || "",
    }))
    .filter((complaint) => complaint.text.trim().length > 0);

  const grouped = new Map();

  for (const complaint of complaints) {
    const defect = detectDefect(complaint.text);
    const groupKey = `${complaint.productId}::${complaint.batchId}::${defect.key}`;
    const existing = grouped.get(groupKey) || { defect, complaints: [] };
    existing.complaints.push({ ...complaint, defectKey: defect.key, defectLabel: defect.label, keywords: defect.hits });
    grouped.set(groupKey, existing);
  }

  const clusters = [...grouped.values()]
    .map(({ defect, complaints: clusterComplaints }) => {
      const sortedComplaints = clusterComplaints.sort((a, b) => new Date(a.date) - new Date(b.date));
      const spike = calculateSpike(sortedComplaints);
      const riskScore = scoreCluster(sortedComplaints, defect, spike);
      const cluster = {
        id: `${defect.key}-${mostCommon(sortedComplaints.map((complaint) => complaint.productId))}-${mostCommon(
          sortedComplaints.map((complaint) => complaint.batchId)
        )}`,
        defectKey: defect.key,
        defectLabel: defect.label,
        productId: mostCommon(sortedComplaints.map((complaint) => complaint.productId)),
        batchId: mostCommon(sortedComplaints.map((complaint) => complaint.batchId)),
        complaintCount: sortedComplaints.length,
        dateRange: {
          from: sortedComplaints[0]?.date,
          to: sortedComplaints.at(-1)?.date,
          days: daysBetween(sortedComplaints[0]?.date, sortedComplaints.at(-1)?.date),
        },
        riskScore,
        riskLevel: riskScore >= 75 ? "high" : riskScore >= 45 ? "medium" : "low",
        spike,
        sampleComplaints: sortedComplaints.slice(-3),
      };

      return {
        ...cluster,
        summary: buildSummary(cluster, spike),
      };
    })
    .sort((a, b) => b.riskScore - a.riskScore);

  return {
    analyzedAt: new Date().toISOString(),
    totalComplaints: complaints.length,
    clusters,
    topRisks: clusters.slice(0, 5),
  };
}

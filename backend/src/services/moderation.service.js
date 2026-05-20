const blockedTerms = ["abuse", "hate", "threat"];

export async function moderateText(text) {
  const normalized = text.toLowerCase();
  const labels = blockedTerms.filter((term) => normalized.includes(term));

  return {
    status: labels.length > 0 ? "flagged" : "approved",
    score: labels.length > 0 ? 0.92 : 0.02,
    labels,
  };
}


function splitCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

export function parseComplaintsCsv(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = splitCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line, index) => {
    const values = splitCsvLine(line);
    const row = Object.fromEntries(headers.map((header, headerIndex) => [header, values[headerIndex] || ""]));

    return {
      id: row.id || row.complaint_id || `CSV-${index + 1}`,
      date: row.date || row.created_at || new Date().toISOString().slice(0, 10),
      productId: row.productId || row.product_id || row.model || "unknown-product",
      batchId: row.batchId || row.batch_id || row.batch || "unknown-batch",
      source: row.source || "csv_upload",
      severity: row.severity || "medium",
      text: row.text || row.complaint_text || row.return_reason || row.notes || "",
    };
  });
}

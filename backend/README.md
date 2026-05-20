# RecallRadar Backend

Express API for an AI-style early-warning system that detects product defect clusters, complaint spikes, affected batches, and recall-risk scores.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API starts on `http://localhost:8080`.

MongoDB is optional for this MVP. If `MONGODB_URI` is empty, the server still runs and analyzes uploaded or posted complaint data in memory.

## API Endpoints

### Health

```http
GET /health
```

### Demo analysis

```http
GET /api/demo/analysis
```

### Analyze JSON complaints

```http
POST /api/complaints/analyze
Content-Type: application/json
```

```json
{
  "complaints": [
    {
      "date": "2026-05-12",
      "productId": "XR-21",
      "batchId": "BATCH-MAR-26",
      "source": "support_ticket",
      "severity": "critical",
      "text": "Battery swelling and overheating while charging."
    }
  ]
}
```

### Analyze CSV upload

```http
POST /api/complaints/upload
Content-Type: multipart/form-data
```

Use form field name `file`.

Supported CSV columns:

```text
id,date,product_id,batch_id,source,severity,complaint_text
```

Alternative text columns also work: `text`, `return_reason`, or `notes`.

## What The MVP Returns

- `clusters`: grouped defect signals by product, batch, and defect type
- `riskScore`: 0-100 recall-risk score
- `riskLevel`: low, medium, or high
- `spike`: latest 7-day complaint growth signal
- `summary`: root-cause style investigation summary
- `sampleComplaints`: recent examples from the cluster

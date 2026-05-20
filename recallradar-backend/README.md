# RecallRadar Backend

Python + FastAPI backend for detecting early product defect signals from customer complaints.

## Run It

```bash
cd recallradar-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

## Test Endpoints

- `GET /health`
- `GET /sample`
- `GET /demo-analysis`
- `POST /analyze`
- `POST /analyze-batch`

## Example JSON For `/analyze`

```json
{
  "product_id": "XR-21",
  "batch_id": "BATCH-MAR-26",
  "complaint_text": "Battery is swelling and phone gets hot while charging.",
  "severity": "critical",
  "date": "2026-05-20",
  "source": "support_ticket"
}
```

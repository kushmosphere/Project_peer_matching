from pydantic import BaseModel, Field


class Complaint(BaseModel):
    product_id: str = Field(..., examples=["XR-21"])
    batch_id: str = Field(..., examples=["BATCH-MAR-26"])
    complaint_text: str = Field(..., examples=["Battery gets hot while charging and shuts down."])
    severity: str = Field(..., examples=["high"])
    date: str = Field(..., examples=["2026-05-20"])
    source: str = Field(default="unknown", examples=["support_ticket"])


class AnalysisResult(BaseModel):
    product_id: str
    batch_id: str
    defect_type: str
    risk_score: int
    risk_level: str
    summary: str

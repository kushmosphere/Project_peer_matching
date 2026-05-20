from fastapi import FastAPI
from typing import List

from analyzer import analyze_complaint, group_by_defect
from models import Complaint
from sample_data import sample_complaints

app = FastAPI(
    title="RecallRadar API",
    description="AI early-warning backend for product defect detection.",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "message": "Welcome to RecallRadar API",
        "docs": "Open /docs to test the backend",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "RecallRadar Backend",
    }


@app.get("/sample")
def get_sample_data():
    return {
        "complaints": sample_complaints,
    }


@app.get("/demo-analysis")
def demo_analysis():
    complaints = [Complaint(**item) for item in sample_complaints]
    results = [analyze_complaint(complaint) for complaint in complaints]

    return {
        "total_complaints": len(results),
        "results": results,
        "clusters": group_by_defect(results),
    }


@app.post("/analyze")
def analyze_single_complaint(complaint: Complaint):
    return analyze_complaint(complaint)


@app.post("/analyze-batch")
def analyze_batch_complaints(complaints: List[Complaint]):
    results = [analyze_complaint(complaint) for complaint in complaints]

    return {
        "total_complaints": len(results),
        "results": results,
        "clusters": group_by_defect(results),
    }

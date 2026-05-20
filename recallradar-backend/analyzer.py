from collections import defaultdict


DEFECT_KEYWORDS = {
    "Battery overheating": ["battery", "charging", "overheat", "hot", "swelling", "shutdown"],
    "Electrical safety issue": ["smoke", "burn", "spark", "fire", "smell", "shock"],
    "Noise or vibration issue": ["noise", "rattle", "vibration", "loud"],
    "Display issue": ["screen", "display", "flicker", "touch"],
    "Leakage issue": ["leak", "water", "drip"],
}

SEVERITY_POINTS = {
    "low": 10,
    "medium": 25,
    "high": 40,
    "critical": 55,
}

SAFETY_KEYWORDS = ["fire", "burn", "smoke", "spark", "overheat", "swelling", "shock"]


def detect_defect_type(text: str) -> str:
    normalized_text = text.lower()

    best_match = "General product defect"
    best_score = 0

    for defect_type, keywords in DEFECT_KEYWORDS.items():
        score = sum(1 for keyword in keywords if keyword in normalized_text)
        if score > best_score:
            best_score = score
            best_match = defect_type

    return best_match


def calculate_risk_score(complaint) -> int:
    score = 20
    severity = complaint.severity.lower()
    text = complaint.complaint_text.lower()

    score += SEVERITY_POINTS.get(severity, 25)

    for keyword in SAFETY_KEYWORDS:
        if keyword in text:
            score += 8

    return min(score, 100)


def get_risk_level(score: int) -> str:
    if score >= 75:
        return "High"
    if score >= 45:
        return "Medium"
    return "Low"


def analyze_complaint(complaint):
    defect_type = detect_defect_type(complaint.complaint_text)
    risk_score = calculate_risk_score(complaint)
    risk_level = get_risk_level(risk_score)

    summary = (
        f"The complaint suggests {defect_type.lower()} in product "
        f"{complaint.product_id}, batch {complaint.batch_id}. "
        f"The recall-risk level is {risk_level} with a score of {risk_score}/100."
    )

    return {
        "product_id": complaint.product_id,
        "batch_id": complaint.batch_id,
        "defect_type": defect_type,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "summary": summary,
    }


def group_by_defect(analysis_results):
    groups = defaultdict(list)

    for result in analysis_results:
        key = (result["product_id"], result["batch_id"], result["defect_type"])
        groups[key].append(result)

    clusters = []
    for (product_id, batch_id, defect_type), items in groups.items():
        average_score = round(sum(item["risk_score"] for item in items) / len(items))
        clusters.append(
            {
                "product_id": product_id,
                "batch_id": batch_id,
                "defect_type": defect_type,
                "complaint_count": len(items),
                "average_risk_score": average_score,
                "risk_level": get_risk_level(average_score),
            }
        )

    return sorted(clusters, key=lambda cluster: cluster["average_risk_score"], reverse=True)

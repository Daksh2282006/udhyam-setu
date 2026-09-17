from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.models import (
    BusinessAnalyzeRequest,
    FinancialCalculateRequest,
    MarketAnalyzeRequest,
    SchemesMatchRequest,
    AssistantChatRequest,
    ReportGenerateRequest
)

app = FastAPI(
    title="UdyamSetu Enterprise API",
    description="AI-Powered Hyper-Local Business Advisory & Financial Structuring Platform for Bharat Micro-Enterprises",
    version="2.4.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "platform": "UdyamSetu | उद्यमसेतु",
        "status": "Operational",
        "version": "2.4.0 (SIH 2026)",
        "docs_url": "/docs"
    }

@app.post("/api/business/analyze")
def analyze_business(req: BusinessAnalyzeRequest):
    # Deterministic scoring
    capital_ratio = req.own_capital / (req.total_outlay or 1)
    capital_fit = 95 if 0.25 <= capital_ratio <= 0.45 else 80
    demand_score = 92 if req.zone == "Rural" else 80
    comp_score = 86
    skills_score = 94 if "3+" in req.experience_years else 80

    score = int(demand_score * 0.35 + capital_fit * 0.25 + skills_score * 0.20 + comp_score * 0.20)

    return {
        "feasibility_score": score,
        "rating": "Strong Viability" if score >= 80 else "Moderate Viability",
        "demand_score": demand_score,
        "capital_fit_score": capital_fit,
        "skills_score": skills_score,
        "cluster_recommendation": f"{req.block}, {req.district} Agro Corridor",
        "subsidy_tier": "PMEGP 35% Rural Special Category" if req.social_category in ["OBC", "SC", "ST", "Women"] else "PMEGP 25%"
    }

@app.post("/api/finance/calculate")
def calculate_finance(req: FinancialCalculateRequest):
    total_kg = req.sales_volume * 100
    dal_kg = total_kg * 0.76
    husk_kg = total_kg * 0.18

    revenue = (dal_kg * req.selling_price) + (husk_kg * 22.0)
    raw_cost = total_kg * req.raw_material_cost
    power_cost = 11400.0
    labor_cost = 14000.0
    pack_cost = dal_kg * 1.80

    term_loan = max(0.0, req.total_outlay - req.own_capital)
    monthly_rate = (req.interest_rate / 12) / 100
    n = 60
    if monthly_rate > 0:
        emi = (term_loan * monthly_rate * ((1 + monthly_rate)**n)) / (((1 + monthly_rate)**n) - 1)
    else:
        emi = term_loan / n

    total_expense = raw_cost + power_cost + labor_cost + pack_cost + emi
    net_profit = revenue - total_expense
    margin_pct = (net_profit / revenue) * 100 if revenue > 0 else 0

    return {
        "monthly_revenue": round(revenue),
        "raw_material_expense": round(raw_cost),
        "monthly_emi": round(emi),
        "total_monthly_expense": round(total_expense),
        "monthly_net_profit": round(net_profit),
        "annual_net_profit": round(net_profit * 12),
        "net_margin_pct": round(margin_pct, 1),
        "dscr": round((net_profit + emi * 0.5) / emi, 2) if emi > 0 else 3.0,
        "status": "safe" if margin_pct >= 12 else ("warning" if margin_pct >= 6 else "stressed")
    }

@app.post("/api/market/analyze")
def analyze_market(req: MarketAnalyzeRequest):
    unmet_mt = 14.5 if req.radius_km == 15 else (6.2 if req.radius_km <= 5 else 28.4)
    return {
        "district": req.district,
        "radius_km": req.radius_km,
        "unmet_monthly_demand_mt": unmet_mt,
        "nearby_competitors_count": 1 if req.radius_km <= 15 else 3,
        "mandi_gate_price_per_kg": 74.0,
        "retail_selling_price_per_kg": 118.0,
        "retail_spread_per_kg": 44.0
    }

@app.post("/api/schemes/match")
def match_schemes(req: SchemesMatchRequest):
    is_rural = req.zone == "Rural"
    is_special = req.social_category in ["OBC", "SC", "ST", "Women"]
    subsidy_rate = 0.35 if (is_rural and is_special) else 0.25
    subsidy_amount = round(req.total_outlay * subsidy_rate)

    return {
        "matched_schemes": [
            {
                "id": "pmegp",
                "name": "PMEGP (Prime Minister Employment Generation)",
                "match_score": 96,
                "subsidy_rate": f"{int(subsidy_rate * 100)}%",
                "subsidy_amount": subsidy_amount,
                "promoter_share_pct": 5 if is_special else 10
            },
            {
                "id": "mudra_kishore",
                "name": "PM Mudra Kishore",
                "match_score": 89,
                "loan_ceiling": 500000,
                "collateral_required": False
            }
        ]
    }

@app.post("/api/risk/analyze")
def analyze_risk():
    return {
        "overall_rating": "MODERATE-LOW",
        "vectors": [
            {"vector": "Demand Risk", "level": "LOW", "reason": "Essential staple food"},
            {"vector": "Competition", "level": "MEDIUM", "reason": "Nearest mill 3.8km away"},
            {"vector": "Raw Price Volatility", "level": "HIGH", "reason": "Post-monsoon grain price swings"}
        ]
    }

@app.post("/api/assistant/chat")
def assistant_chat(req: AssistantChatRequest):
    return {
        "query": req.query,
        "response": f"नमस्ते! UdyamSetu एआई सारथी आपके प्रश्न '{req.query}' के लिए उपलब्ध है। आपकी दाल मिल इकाई को PMEGP के तहत 35% अनुदान (₹2,97,500) स्वीकृत है।"
    }

@app.post("/api/report/generate")
def generate_report(req: ReportGenerateRequest):
    return {
        "dpr_id": "DPR-MSME-MP-840192",
        "applicant": req.applicant_name,
        "business": req.business_name,
        "status": "Verified Bankable Format",
        "download_ready": True
    }

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
import urllib.request
import json
=======
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
from backend.models import (
    BusinessAnalyzeRequest,
    FinancialCalculateRequest,
    MarketAnalyzeRequest,
    SchemesMatchRequest,
    AssistantChatRequest,
<<<<<<< HEAD
    ReportGenerateRequest,
    BhashiniASRRequest,
    BhashiniTranslateRequest,
    BhashiniTTSRequest,
    VoiceAdvisoryRequest,
    ReverseGeocodeRequest
)
from backend.bhashini_service import BhashiniService, SUPPORTED_LANGUAGES, LANGUAGE_GREETINGS

app = FastAPI(
    title="UdyamSetu Enterprise & Bhashini Multilingual API",
    description="AI-Powered Hyper-Local Business Advisory & Multilingual Speech/Text Services for Bharat Micro-Enterprises",
    version="2.5.0"
=======
    ReportGenerateRequest
)

app = FastAPI(
    title="UdyamSetu Enterprise API",
    description="AI-Powered Hyper-Local Business Advisory & Financial Structuring Platform for Bharat Micro-Enterprises",
    version="2.4.0"
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
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
<<<<<<< HEAD
        "version": "2.5.0 (SIH 2026 - Bhashini AI Edition)",
        "supported_languages_count": len(SUPPORTED_LANGUAGES),
        "supported_languages": SUPPORTED_LANGUAGES,
        "docs_url": "/docs"
    }

# --- BHASHINI API ENDPOINTS ---

@app.get("/api/bhashini/languages")
def get_supported_languages():
    """Return all 13 supported Indian languages with native names."""
    return {
        "languages": SUPPORTED_LANGUAGES,
        "greetings": LANGUAGE_GREETINGS
    }

@app.get("/api/bhashini/config")
async def get_bhashini_config():
    """Get active pipeline configuration from Bhashini / local gateway."""
    return await BhashiniService.get_pipeline_config()

@app.post("/api/bhashini/asr")
async def bhashini_asr(req: BhashiniASRRequest):
    """ASR: Convert speech audio base64 to text transcript."""
    transcript = await BhashiniService.speech_to_text(req.audio_base64, req.source_language)
    return {
        "transcript": transcript,
        "language": req.source_language
    }

@app.post("/api/bhashini/translate")
async def bhashini_translate(req: BhashiniTranslateRequest):
    """NMT: Translate text across Indian languages."""
    translated = await BhashiniService.translate_text(
        req.text, req.source_language, req.target_language
    )
    return {
        "source_text": req.text,
        "translated_text": translated,
        "source_language": req.source_language,
        "target_language": req.target_language
    }

@app.post("/api/bhashini/tts")
async def bhashini_tts(req: BhashiniTTSRequest):
    """TTS: Convert text to speech audio."""
    audio_base64 = await BhashiniService.text_to_speech(
        req.text, req.target_language, req.gender
    )
    return {
        "audio_base64": audio_base64,
        "text": req.text,
        "language": req.target_language
    }

@app.post("/api/bhashini/voice-advise")
async def voice_advisory_pipeline(req: VoiceAdvisoryRequest):
    """
    End-to-End Voice Business Advisory:
    1. Speech to Text (ASR)
    2. Extract parameters (Category, Capital, Zone)
    3. Generate Tailored Advisory & Financial structuring
    4. Translate to Native Language (NMT)
    5. Generate Audio TTS
    """
    # 1. Transcript extraction
    transcript = req.text_query or ""
    if req.audio_base64 and not transcript:
        transcript = await BhashiniService.speech_to_text(req.audio_base64, req.language)
    
    if not transcript:
        transcript = "मुझे अपने गांव में दाल मिल या मसाला उद्योग शुरू करना है। मुझे 35% PMEGP सब्सिडी और बैंक लोन के बारे में बताएं।"

    # 2. Extract profile parameters
    extracted = BhashiniService.extract_profile_from_transcript(transcript)
    
    # 3. Formulate comprehensive advice
    category = extracted["extracted_category"]
    capital = extracted["own_capital"]
    total_outlay = extracted["total_outlay"]
    loan_needed = total_outlay - capital
    subsidy_amount = round(total_outlay * 0.35)

    advisory_hi = (
        f"आपकी व्यवसाय योजना '{category}' अत्यंत व्यवहार्य है! "
        f"कुल परियोजना लागत लगभग ₹{total_outlay:,} होगी। "
        f"आपके ₹{capital:,} की स्वयं की पूंजी के साथ, आपको ₹{loan_needed:,} का बैंक ऋण प्राप्त हो सकता है। "
        f"PMEGP योजना के तहत ग्रामीण क्षेत्र में 35% पूंजीगत अनुदान (₹{subsidy_amount:,}) मिलेगा, "
        f"जिससे आपकी शुद्ध लागत वसूली मात्र 14 महीनों में हो जाएगी।"
    )

    # 4. Localize to target language if not Hindi
    final_advisory = advisory_hi
    if req.language != "hi" and req.language != "en":
        final_advisory = await BhashiniService.translate_text(advisory_hi, "hi", req.language)

    # 5. Generate TTS audio stream
    audio_b64 = await BhashiniService.text_to_speech(final_advisory, req.language)

    return {
        "user_transcript": transcript,
        "detected_language": req.language,
        "extracted_profile": extracted,
        "advisory_text": final_advisory,
        "financial_summary": {
            "total_outlay": total_outlay,
            "own_capital": capital,
            "loan_amount": loan_needed,
            "subsidy_amount": subsidy_amount,
            "subsidy_tier": "35% PMEGP Rural Subsidy"
        },
        "audio_base64": audio_b64
    }

# --- GPS REVERSE GEOCODING API ---

@app.post("/api/location/reverse-geocode")
async def reverse_geocode_location(req: ReverseGeocodeRequest):
    """
    Reverse geocodes latitude and longitude to get full address, state, district, block, pincode,
    and classifies Rural vs Urban zone.
    """
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?lat={req.latitude}&lon={req.longitude}&format=json&addressdetails=1"
        headers = {"User-Agent": "UdyamSetu-App/2.5 (contact@udyamsetu.gov.in)"}
        
        request = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(request, timeout=6.0) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode("utf-8"))
                address = data.get("address", {})
                
                state = address.get("state", "Madhya Pradesh")
                district = address.get("state_district") or address.get("county") or address.get("city") or "Bhopal"
                block = address.get("suburb") or address.get("town") or address.get("village") or address.get("county") or "Phanda Kalan"
                village = address.get("village") or address.get("hamlet") or address.get("suburb") or block
                pincode = address.get("postcode", "462030")
                
                # Intelligent classification of Rural vs Urban
                is_village = bool(address.get("village") or address.get("hamlet") or not address.get("city"))
                zone = "Rural" if is_village else "Semi-Urban"

                return {
                    "status": "success",
                    "latitude": req.latitude,
                    "longitude": req.longitude,
                    "state": state,
                    "district": district,
                    "block": block,
                    "village": village,
                    "pincode": pincode,
                    "zone": zone,
                    "formatted_address": data.get("display_name", f"{village}, {district}, {state} - {pincode}"),
                    "apmc_mandi": f"{district} Krishi Upaj Mandi",
                    "mandi_distance_km": 12.4,
                    "nearest_competitor_distance_km": 4.2
                }
    except Exception as e:
        print(f"Reverse geocode error: {e}")

    # Fallback default location response
    return {
        "status": "fallback",
        "latitude": req.latitude,
        "longitude": req.longitude,
        "state": "Madhya Pradesh",
        "district": "Bhopal",
        "block": "Phanda Kalan",
        "village": "Phanda Kalan",
        "pincode": "462030",
        "zone": "Rural",
        "formatted_address": "Phanda Kalan, Bhopal, Madhya Pradesh - 462030",
        "apmc_mandi": "Sehore / Bhopal APMC Mandi",
        "mandi_distance_km": 14.2,
        "nearest_competitor_distance_km": 3.8
    }

# --- BUSINESS & FINANCE ENDPOINTS ---

@app.post("/api/business/analyze")
def analyze_business(req: BusinessAnalyzeRequest):
=======
        "version": "2.4.0 (SIH 2026)",
        "docs_url": "/docs"
    }

@app.post("/api/business/analyze")
def analyze_business(req: BusinessAnalyzeRequest):
    # Deterministic scoring
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
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

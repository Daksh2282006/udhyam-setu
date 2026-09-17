from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class BusinessAnalyzeRequest(BaseModel):
    category_id: str = "dal_mill"
    state: str = "Madhya Pradesh"
    district: str = "Bhopal"
    block: str = "Phanda Kalan"
    zone: str = "Rural"
    total_outlay: float = 850000.0
    own_capital: float = 350000.0
    experience_years: str = "3+ Years in Agro Trading"
    social_category: str = "OBC"

class FinancialCalculateRequest(BaseModel):
    sales_volume: float = 100.0         # Quintals
    raw_material_cost: float = 74.0     # ₹/kg
    selling_price: float = 118.0        # ₹/kg
    interest_rate: float = 8.5          # %
    total_outlay: float = 850000.0
    own_capital: float = 350000.0

class MarketAnalyzeRequest(BaseModel):
    district: str = "Bhopal"
    radius_km: int = 15

class SchemesMatchRequest(BaseModel):
    category_sector: str = "Agro Food Processing"
    zone: str = "Rural"
    social_category: str = "OBC"
    total_outlay: float = 850000.0

class AssistantChatRequest(BaseModel):
    query: str
    language: str = "hi"
    context: Optional[Dict[str, Any]] = None

class ReportGenerateRequest(BaseModel):
    applicant_name: str = "Rameshwar Patel"
    business_name: str = "Shree Ganesh Agro Dal Processing"
    district: str = "Bhopal"
    state: str = "Madhya Pradesh"
    category: str = "Dal Mill & Agro Processing"
    total_outlay: float = 850000.0

# UdyamSetu (उद्यमसेतु) 🌾🚀

> **AI-Powered Hyper-Local Business Advisory and Financial Structuring Platform for Rural and Semi-Urban Micro-Entrepreneurs in Bharat.**

---

## 📌 Executive Summary

**UdyamSetu** bridges the critical credit and advisory gap for micro-enterprises across tier-2, tier-3, and rural India. By combining hyper-local economic intelligence, explainable AI feasibility scoring, bank-grade Detailed Project Report (DPR) generation, and multi-lingual voice navigation, UdyamSetu empowers grassroots entrepreneurs to transform viable ideas into funded, resilient enterprises.

---

## ✨ Core Features & Modules

1. **5-Step Assisted Onboarding Wizard (`/analyze`)**
   - Micro-enterprise category selection (Agri-Processing, Handloom & Handicrafts, Rural Retail, Bio-Fertilizer, Food Processing, etc.).
   - Geo-location pin (State, District, Block/Tehsil, Pincode).
   - Capital allocation & promoter equity slider.
   - Skill self-assessment & business ambitions.
   - **Voice Auto-Fill** via Web Speech Recognition API with vernacular audio prompts.

2. **AI Processing Pipeline Simulation (`/analyze/processing`)**
   - Real-time animated telemetry for APMC market feeds, credit-scoring algorithms, and government scheme eligibility engines.

3. **Enterprise Feasibility Dashboard (`/dashboard`)**
   - **82/100 Composite Feasibility Gauge** with dynamic risk status.
   - Core KPI metrics: 1-Year Projected Revenue, Working Capital, Net Margin, Debt Service Coverage Ratio (DSCR).
   - **Explainable AI (XAI) Drawer**: Transparent breakdown of factors driving the score.
   - Hyper-local cluster map and 5-vector risk radar.

4. **Hyper-Local Market Intelligence Radar (`/dashboard/market`)**
   - Dynamic 5km to 25km radius selector.
   - Competitor mapping with exact distances and market density analysis.
   - Live APMC Mandi arrivals and raw material price index.

5. **Financial Structuring & Amortization (`/dashboard/finance`)**
   - Project cost breakdown (CapEx vs. OpEx) & Means of Finance.
   - Complete multi-year term loan repayment schedule with EMI calculation.

6. **Interactive "What-If" Sensitivity Simulator (`/dashboard/simulator`)**
   - Dynamic sliders for raw material inflation, promoter contribution, and demand variations.
   - Instant live recalculation of Net Profit Margin, DSCR, and Break-Even timeline.

7. **Government Schemes & Subsidies Matcher (`/dashboard/schemes`)**
   - Tailored eligibility matching for **PMEGP**, **PM Mudra Yojana**, and **PMFME (ODOP)**.
   - One-click application checklist and bank compliance requirements modal.

8. **90-Day Execution Blueprint & DPR Export (`/dashboard/blueprint`)**
   - Phase-by-phase actionable roadmap with interactive progress checkmarks.
   - Integrated bilingual audio briefing player.
   - **Client-Side Bank-Ready DPR PDF Generator** using `jspdf`.

9. **Voice Assistant — Ask Saarthi (`/dashboard/assistant` & Global Floating Widget)**
   - Conversational AI guide with speech-to-text input and natural text-to-speech output in multiple Indian languages.

10. **Administrative Impact Telemetry (`/admin`)**
    - High-level ecosystem monitoring, district adoption analytics, and loan disbursement indicators.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Document Generation**: jsPDF
- **Bundler & Tooling**: Vite 5

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic v2

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn
- Python 3.10+ (optional, for backend API)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/Daksh2282006/udhyam-setu.git
cd udhyam-setu

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build & Serve

```bash
# Build the optimized production bundle
npm run build

# Serve using the lightweight production runner
python serve_app.py
```
Open your browser and navigate to `http://localhost:3000`.

### Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Interactive API documentation available at `http://localhost:8000/docs`.

---

## 📁 Repository Structure

```
udyamsetu/
├── backend/
│   ├── main.py               # FastAPI application with REST endpoints
│   ├── models.py             # Pydantic schemas for feasibility & DPR
│   └── requirements.txt      # Python dependencies
├── src/
│   ├── components/           # Navbar, Footer, VoiceWidget, AI Drawer
│   ├── views/                # Full view pages (Landing, Onboarding, Dashboard, etc.)
│   ├── App.tsx               # App router & global context providers
│   ├── main.tsx              # React DOM root entry point
│   └── index.css             # Tailwind styling and custom animations
├── public/                   # Static assets & icons
├── serve_app.py              # Multi-threaded Python static server with SPA fallback
├── package.json              # Project dependencies & npm scripts
├── tailwind.config.js        # Sovereign Trust color tokens & typography
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── README.md
```

---

## 📄 License
This project is licensed under the MIT License.

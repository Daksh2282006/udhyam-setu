# UdyamSetu (उद्यमसेतु) — Complete Platform Implementation Summary

> **AI-Powered Hyper-Local Business Advisory and Financial Structuring Platform for Rural and Semi-Urban Micro-Entrepreneurs in Bharat**  
> *Smart India Hackathon (SIH) 2026 • Aligned with Ministry of MSME & Lead Bank Credit Appraisal Standards*

---

## 📌 1. Project Overview

**UdyamSetu (उद्यमसेतु)** bridges the critical credit and advisory divide for tier-2, tier-3, and rural Indian micro-entrepreneurs. It transforms raw, informal business ideas into bank-ready, viable enterprises through hyper-local market telemetry, explainable AI feasibility scoring, interactive What-If sensitivity analysis, automated government subsidy matching (PMEGP, Mudra, PMFME), and multilingual voice assistance.

---

## 🛠 2. Tech Stack & Architecture

### Frontend
- **Framework**: React 18 with TypeScript (`strict: true`)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Design System**: Sovereign Trust Palette (`#0A2540` Navy, `#006C4A` Growth Emerald, `#D97706` Saffron Amber)
- **Typography**: Plus Jakarta Sans (Headlines, KPIs) & Inter (Body, Tabular Numeric Data)
- **Icons**: Material Symbols Outlined & Lucide React
- **Client-Side PDF Engine**: jsPDF
- **Voice Technology**: Native Browser Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Bundler & Tooling**: Vite 5
- **Routing**: React Router v6

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Validation**: Pydantic v2 schemas
- **ASGI Server**: Uvicorn
- **Architecture**: Modular REST endpoints matching frontend business services

### Deployment & CI/CD
- **Cloud Platform**: Vercel (Configured with `vercel.json` SPA rewrites)
- **Local Runner**: Multi-threaded Python server (`serve_app.py`) on port 3000 with SPA fallback
- **Version Control**: GitHub (`https://github.com/Daksh2282006/udhyam-setu.git`)

---

## 🚀 3. Complete Routes & Implemented Features

### 1. Landing Page (`/`)
- **Hero Section**: Dual-language value proposition, quick-start action buttons.
- **Enterprise Impact Metrics**: Live counters (Micro-units assisted, Bank credit unlocked, Subsidy leverage).
- **6-Stage Framework**: Step-by-step visual roadmap from Idea Discovery to Bank Disbursement.
- **7 Grassroots Challenges**: Deep dive into rural entrepreneur hurdles (Middlemen exploitation, collateral deficiency, delayed subsidies, language barrier) with UdyamSetu solutions.

### 2. 5-Step Guided Onboarding Wizard (`/analyze`)
- **Step 1 (Category)**: 8 pre-configured rural enterprise sectors (Mini Dal Mill, Modern Dairy, Oil Expeller, Rural Kirana Supermart, Custom Hiring Center, Bio-Fertilizer, Solar Dehydration, Garment Stitching) with investment ranges and ROI benchmarks.
- **Step 2 (Location)**: Multi-tier geography selector (State, District, Block/Tehsil) with real APMC Mandi linkage (e.g. Bhopal, Sehore, Betul).
- **Step 3 (Capital)**: Interactive slider for own equity vs bank debt requirements with live promoter contribution % calculations.
- **Step 4 (Skills & Background)**: Education level, prior domain experience, and Social Category (OBC, SC, ST, Women-Owned, General) which dynamically drives subsidy tier eligibility.
- **Step 5 (Strategic Objectives)**: Selection of targets (PMEGP subsidy, machinery acquisition, retail tie-ups).
- **Voice Auto-Fill**: 1-click speech simulation auto-filling realistic entrepreneur profiles.

### 3. Animated AI Processing Pipeline (`/analyze/processing`)
- 5-stage animated processing sequence visualizing real-time data ingestion:
  1. Business profile synthesis
  2. APMC market signals & mandi arrivals
  3. Financial assumptions & DSCR structuring
  4. Central/State scheme convergence
  5. Detailed Project Report (DPR) generation
- Automatically routes the user directly to the **Executive Business Feasibility Report (`/report`)**.

### 4. Executive Business Feasibility Report (`/report`, `/feasibility-report`)
*Matching the pristine 2-page bank appraisal format (Agneyaa reference model):*
- **Page 1: Viability & Financial Profile**:
  - **Header**: Document ID, timestamp, category badge, verified location pin.
  - **Verdict Card**: Dynamic score (**6.5** or **8.2**), `CONDITIONAL GO` / `HIGH VIABILITY - GO`, and 4-vector breakdown (Market Potential, Financial Viability, Location Advantage, Scheme Eligibility).
  - **Business Profile Table**: Full Name, Business Idea, Category, Location, Own Capital, Social Category, Land Ownership, Target Customers.
  - **Financial Summary**: 6 KPI boxes (Project Cost, Your Capital, Net Loan Required, Monthly EMI, Subsidy Amount, Working Capital) + Scheme banner (NABARD / PMEGP).
  - **Market Analysis**: Bullet points verified via India Post API, local demand, competition differentiation, and projected revenues.
  - **Page 1 Footer**: URL and page number (`1/2`).
- **Page 2: Risk Matrix, Documents & Action Plan**:
  - **Risk Matrix**: 3-column table (`RISK`, `LEVEL` with color badge, `MITIGATION`) customized for Dairy or Agro-Processing.
  - **Documents Needed**: 12-item interactive checklist with live verification counter (*"X of 12 verified"*).
  - **7-Step Action Plan**: Numbered step-by-step roadmap from shop agreement to compliance tracking.
  - **Footer Legend**: Colored dots for API Data (India Post, OSM, Agmarknet), User Data, and AI Estimates with bank disclaimer and page numbering (`2/2`).
- **Interactive Top Toolbar**:
  - **Preset Switcher**: Toggle with 1 click between **🐄 Komal (Dairy - Betul)** and **🌾 Rameshwar (Dal Mill - Bhopal)**.
  - **Print / Save as PDF**: Clean `@media print` layout formatting into exact 2 pages with zero UI clutter.
  - **Export Bank DPR**: Triggers official Detailed Project Report PDF generation.
  - **Deep-Dive Dashboard**: Jumps straight into interactive simulation and radar tools.

### 5. Main AI Business Dashboard (`/dashboard`)
- **82/100 Composite Feasibility Gauge**: Interactive score visualization with risk indicator.
- **4 Core KPI Cards**: Monthly Projected Revenue, Net Profit Margin, DSCR Coverage Ratio, and Break-Even Months.
- **Explainable AI (XAI) Drawer**: Transparent breakdown of score drivers (Local Sourcing Advantage, Capital Fit, Low Power Tariffs, Retail Access).
- **Cluster Map & Competitor Proximity**: Visualizing distances to nearest competing units.

### 6. Hyper-Local Market Radar (`/dashboard/market`)
- **Dynamic Radius Selector**: 5km, 10km, 15km, 25km.
- **Live Competitor Mapping**: Distance tracking and unmet monthly demand calculations in Metric Tonnes (MT).
- **APMC Mandi Price Telemetry**: Raw grain mandi purchase price vs processed retail spread.

### 7. Financial Structuring & Debt Amortization (`/dashboard/finance`)
- **Detailed Project Cost Breakdown**: CapEx (Machinery, Shed, Electrification) vs OpEx.
- **Means of Finance**: Promoter Equity vs Bank Term Loan vs Working Capital Limit.
- **Full 5-Year Amortization Schedule**: Monthly EMI, principal/interest split, and reducing loan balance.

### 8. What-If Sensitivity Simulator (`/dashboard/simulator`)
- **Real-Time Interactive Sliders**:
  - Monthly Sales Volume (-40% to +50%)
  - Raw Material Procurement Cost (₹/kg)
  - Finished Product Selling Price (₹/kg)
  - Bank Loan Interest Rate (%)
- **Instant Reactive Recalculation**: Live profit margin, DSCR coverage, break-even period, and cash surplus sparkline.

### 9. Government Schemes & Subsidies Matcher (`/dashboard/schemes`)
- Tailored matching algorithms for:
  - **PMEGP**: Up to 35% non-refundable capital grant for rural/special category units.
  - **PM Mudra Yojana (Kishore/Tarun)**: Collateral-free loans up to ₹10 Lakhs.
  - **PMFME (ODOP)**: One District One Product 35% credit-linked subsidy.
- Interactive bank application checklist modal with eligibility criteria and direct portal links.

### 10. 5-Vector Risk Analysis (`/dashboard/risk`)
- Multi-dimensional evaluation across **Demand Risk**, **Competition Density**, **Raw Price Volatility**, **Liquidity Risk**, and **Regulatory Compliance**.
- Adaptively shifts risk severity when parameters change in the simulator.

### 11. Conversational Voice Assistant — Ask Saarthi (`/dashboard/assistant` & Floating Widget)
- **Web Speech API**: Hands-free Hindi/English speech-to-text input.
- **SpeechSynthesis**: Natural voice output reading out financial guidance.
- **Context-Aware Engine**: Binds directly to the active user profile and financial state to provide instant, domain-accurate answers.

### 12. 90-Day Execution Playbook (`/dashboard/blueprint`)
- 4 time-boxed execution phases (Statutory & Identity, Financing & Approvals, Machinery & Setup, Pilot Launch).
- Interactive milestone checkmarks with live percentage completion bar.
- Integrated bilingual audio briefing player.
- Bank-ready DPR PDF download via `jspdf`.

### 13. SIH Impact Telemetry / Admin View (`/admin`)
- Aggregate metrics: 42,840+ micro-plans modeled, ₹84.2 Cr credit facilitated, district coverage heatmap, and sector distribution charts.

### 14. Settings & Accessibility (`/settings`)
- Multilingual switcher (English, Hindi, Bengali, Tamil).
- Demo mode toggle and profile reset controls.

---

## ⚙️ 4. Environment & Zero-Configuration Architecture

- The platform is designed to run **100% out-of-the-box with ZERO mandatory `.env` secrets**.
- Browser-native Web Speech APIs eliminate external paid API dependencies and latency.
- A standard `.env.example` file is provided in the repository for optional cloud integrations:
  - `VITE_API_BASE_URL` (FastAPI backend endpoint)
  - `VITE_GEMINI_API_KEY` (Optional Google Gemini AI fallback)
  - `VITE_BHASHINI_API_KEY` & `VITE_BHASHINI_USER_ID` (Govt. of India vernacular speech engine)

---

## 🌐 5. Deployment Information

- **Vercel Production Config**: `vercel.json` with clean SPA rewrites.
- **Root Directory**: `./` (Root directory containing `package.json` and `vite.config.ts`).
- **Framework Preset**: `Vite`.
- **Build Command**: `npm run build` (Builds clean `dist/` bundle in ~14s).
- **Output Directory**: `dist`.
- **GitHub Repository**: `https://github.com/Daksh2282006/udhyam-setu.git`.

---

*Generated for UdyamSetu Team • Smart India Hackathon 2026*

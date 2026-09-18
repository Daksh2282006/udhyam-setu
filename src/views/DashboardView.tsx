<<<<<<< HEAD
import React, { useState, useRef } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BusinessAnalysisService } from '../services/businessAnalysisService';

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { profile, metrics, t } = useApp();
  const [showXai, setShowXai] = useState(false);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const analysis = BusinessAnalysisService.analyzeEnterprise(profile);

  const handleExportPdf = async () => {
    if (!reportRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = reportRef.current;
      const filename = `UdyamSetu_BusinessReport_${profile.businessName.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('en-IN').replace(/\//g, '-')}.pdf`;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename,
        image: { type: 'jpeg' as const, quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const,
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

=======
  const { profile, metrics } = useApp();
  const [showXai, setShowXai] = useState(false);
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const analysis = BusinessAnalysisService.analyzeEnterprise(profile);

>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Entrepreneur Context Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-headline-md font-headline-md font-bold text-primary">
<<<<<<< HEAD
              नमस्ते, {profile.name} 👋
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-bilingual-indicator font-bilingual-indicator bg-secondary-container/40 text-secondary border border-secondary/20 font-bold">
              {t('strongViability')}
=======
              Good morning, {profile.name} 👋
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-bilingual-indicator font-bilingual-indicator bg-secondary-container/40 text-secondary border border-secondary/20">
              Verified Business Model
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary">location_on</span>
            <span>
<<<<<<< HEAD
              {profile.businessName} • {profile.location.block}, {profile.location.district} ({profile.location.state}) - PIN: {profile.location.pincode || '462030'}
=======
              Enterprise: <strong>{profile.businessName}</strong> • {profile.location.block}, {profile.location.district} Cluster ({profile.location.state})
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </span>
          </p>
        </div>

<<<<<<< HEAD
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowXai(!showXai)}
            className="px-3.5 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-primary font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
            <span>{t('whyAmISeeingThis')}</span>
          </button>

          {/* Export PDF / Feasibility Report Button */}
          <button
            onClick={() => navigate('/report')}
            className="px-3.5 py-2 rounded-lg bg-primary text-white font-label-md text-label-md flex items-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
            title="View & Export 2-Page Bank-Grade Feasibility Report"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>{t('exportPdf')} / Feasibility Report</span>
=======
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/report')}
            className="px-3.5 py-2 rounded-lg bg-emerald-700 text-white font-label-md text-label-md flex items-center gap-1.5 hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>Feasibility Report / रिपोर्ट</span>
          </button>

          <button
            onClick={() => setShowXai(!showXai)}
            className="px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">info</span>
            <span>XAI Factors</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </button>

          <button
            onClick={() => navigate('/dashboard/simulator')}
<<<<<<< HEAD
            className="px-4 py-2 rounded-lg bg-secondary text-white font-label-md text-label-md flex items-center gap-1.5 elevation-2 hover:bg-secondary/90 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>{t('simulator')}</span>
=======
            className="px-3.5 py-2 rounded-lg bg-secondary text-white font-label-md text-label-md flex items-center gap-1.5 elevation-2 hover:bg-secondary/90 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Run Simulator</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* ---- PDF-captured Business Report Section ---- */}
      <div ref={reportRef} className="space-y-8">

=======
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
      {/* AI Feasibility Score & Core KPIs Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary AI Feasibility Score Gauge (5 Columns) */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
<<<<<<< HEAD
                {t('feasibilityIndex')}
=======
                AI FEASIBILITY INDEX (व्यवहार्यता सूचकांक)
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-bilingual-indicator font-bilingual-indicator bg-secondary-container text-on-secondary-container font-bold">
                {analysis.label}
              </span>
            </div>

            {/* Circular Gauge Visual */}
            <div className="mt-6 flex items-center gap-6">
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-surface-container-high"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  {/* Progress circle */}
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${analysis.score}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.8"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary leading-none">
                    {analysis.score}
                  </span>
                  <span className="text-[11px] font-semibold text-on-surface-variant">/ 100</span>
                </div>
              </div>

              <div className="space-y-2 text-body-sm font-body-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="text-on-surface">
                    Local Demand: <strong className="text-primary">Very High ({analysis.demandScore}%)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="text-on-surface">
                    Competition: <strong className="text-primary">{profile.location.nearestCompetitorDistanceKm}km clear</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                  <span className="text-on-surface">
                    Capital Payback: <strong className="text-primary">{metrics.breakEvenMonths} Months</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="text-on-surface">
                    Subsidy Readiness: <strong className="text-secondary">PMEGP 35%</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/20 bg-surface-container-low/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-primary">AI Recommendation:</strong> Proceed with 20 Quintal/day processing line. {profile.location.block} grain depot eliminates ₹4.20/kg logistics freight.
            </p>
          </div>
        </div>

        {/* 4 Financial & Operational Metric Cards (7 Columns) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow border-t-4 border-t-primary flex flex-col justify-between">
            <div className="flex items-center justify-between">
<<<<<<< HEAD
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">{t('totalOutlay')}</span>
=======
              <span className="font-label-md text-label-md text-on-surface-variant">Total Project Outlay</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
            </div>
            <div className="my-3">
              <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary">
                ₹{profile.finance.totalOutlay.toLocaleString('en-IN')}
              </div>
              <div className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant">
<<<<<<< HEAD
                Fixed Assets + Working Capital
=======
                कुल परियोजना लागत (Fixed + Working)
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              </div>
            </div>
            <div className="text-body-sm text-on-surface-variant flex items-center gap-1">
              <span>Machinery: ₹4.8L • Working Capital: ₹3.7L</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow border-t-4 border-t-secondary flex flex-col justify-between">
            <div className="flex items-center justify-between">
<<<<<<< HEAD
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">{t('monthlyProfit')}</span>
=======
              <span className="font-label-md text-label-md text-on-surface-variant">Monthly Net Profit (Est.)</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
            </div>
            <div className="my-3">
              <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary">
                ₹{metrics.monthlyNetProfit.toLocaleString('en-IN')}
              </div>
              <div className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold">
<<<<<<< HEAD
                Net Margin: {metrics.netMarginPct}%
              </div>
            </div>
            <div className="text-body-sm text-on-surface-variant">
              <span>Annual: ₹{metrics.annualNetProfit.toLocaleString('en-IN')}</span>
=======
                अनुमानित मासिक शुद्ध लाभ
              </div>
            </div>
            <div className="text-body-sm text-on-surface-variant">
              <span>Net Margin: <strong>{metrics.netMarginPct}%</strong> on sales</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow border-t-4 border-t-primary flex flex-col justify-between">
            <div className="flex items-center justify-between">
<<<<<<< HEAD
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">{t('breakEven')}</span>
=======
              <span className="font-label-md text-label-md text-on-surface-variant">Break-Even Period</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              <span className="material-symbols-outlined text-primary text-[20px]">hourglass_bottom</span>
            </div>
            <div className="my-3">
              <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary">
                {metrics.breakEvenMonths} Months
              </div>
              <div className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant">
<<<<<<< HEAD
                Capital Amortization
=======
                लागत वसूली समय सीमा
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              </div>
            </div>
            <div className="text-body-sm text-on-surface-variant">
              <span>{metrics.breakEvenQuintals} Quintals processed to break-even</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow border-t-4 border-t-secondary flex flex-col justify-between">
            <div className="flex items-center justify-between">
<<<<<<< HEAD
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">{t('subsidyBenefit')}</span>
=======
              <span className="font-label-md text-label-md text-on-surface-variant">PMEGP Subsidy Benefit</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              <span className="material-symbols-outlined text-secondary text-[20px]">stars</span>
            </div>
            <div className="my-3">
              <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary">
                ₹{metrics.promoterSubsidyGrant.toLocaleString('en-IN')}
              </div>
              <div className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold">
<<<<<<< HEAD
                Govt. Capital Grant
              </div>
            </div>
            <div className="text-body-sm text-on-surface-variant">
              <span>Non-refundable Govt. grant in bank escrow</span>
=======
                35% ग्रामीण अनुदान सहायता
              </div>
            </div>
            <div className="text-body-sm text-on-surface-variant">
              <span>Non-refundable Govt. grant locked in escrow</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </div>
          </div>
        </div>
      </div>

      {/* Explainable AI (XAI) Expandable Drawer */}
      {showXai && (
        <div className="bg-surface-container-low p-6 rounded-2xl border border-secondary/30 card-shadow space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">analytics</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Why Am I Seeing This Score? (पारदर्शी एआई विश्लेषण)
              </h3>
            </div>
            <span className="text-bilingual-indicator font-bilingual-indicator bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
              Confidence: 94.2%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-body-sm">
            {analysis.xaiFactors.map((factor, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-primary">{factor.name}</span>
                  <span className="text-[11px] font-bold text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded">
                    {factor.weight}% wt
                  </span>
                </div>
                <p className="text-on-surface-variant text-[12px] leading-relaxed mt-1">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hyper-Local Cluster Map & Geospatial Telemetry */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Hyper-Local Market Telemetry (15 KM Radius)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sehore - Bhopal Highway Cluster Pulse Telemetry • {profile.location.block}
            </p>
          </div>

          <div className="flex items-center gap-3 text-bilingual-indicator font-bilingual-indicator">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Your Unit
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span> Competitor
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span> APMC Mandi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container"></span> Kirana Hub
            </span>
          </div>
        </div>

        {/* Interactive Map Component with Pinpoints */}
        <div className="relative w-full h-80 bg-slate-100 rounded-xl overflow-hidden border border-outline-variant/40">
          {/* Stylized Map Grid Canvas */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-70"></div>

          {/* Highway Vector Representation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 50 240 Q 300 180 700 120 T 1200 40"
              fill="none"
              stroke="#CBD5E1"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              d="M 50 240 Q 300 180 700 120 T 1200 40"
              fill="none"
              stroke="#94A3B8"
              strokeDasharray="6,6"
              strokeWidth="2"
            />
            <text fill="#64748B" fontFamily="Inter" fontSize="11" fontWeight="600" x="320" y="160">
              SH-18 State Highway Corridor (Bhopal-Sehore)
            </text>
          </svg>

          {/* Marker 1: Proposed Unit */}
          <div
            onClick={() => setActivePinId(activePinId === 'unit' ? null : 'unit')}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
          >
            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center elevation-2 ring-4 ring-secondary/20 animate-pulse">
              <span className="material-symbols-outlined text-[20px]">store</span>
            </div>
            <div className="absolute top-11 -left-16 bg-white px-2.5 py-1 rounded-md shadow-md border border-outline-variant/30 text-center whitespace-nowrap z-20">
              <div className="font-bold text-primary text-[12px]">Proposed Unit ({profile.location.block})</div>
              <div className="text-[10px] text-secondary font-semibold">Zero Comp in 3.5km</div>
            </div>
          </div>

          {/* Marker 2: Competitor Unit */}
          <div
            onClick={() => setActivePinId(activePinId === 'comp' ? null : 'comp')}
            className="absolute top-1/4 right-1/4 group cursor-pointer z-10"
          >
            <div className="w-8 h-8 rounded-full bg-error text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[16px]">factory</span>
            </div>
            <div className="absolute top-9 -left-14 bg-white px-2 py-0.5 rounded shadow text-center whitespace-nowrap text-[11px] text-on-surface z-10">
              Patidar Dal Mill (3.8km away)
            </div>
          </div>

          {/* Marker 3: APMC Mandi Hub */}
          <div
            onClick={() => setActivePinId(activePinId === 'mandi' ? null : 'mandi')}
            className="absolute bottom-6 left-12 group cursor-pointer z-10"
          >
            <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[18px]">agriculture</span>
            </div>
            <div className="absolute -top-8 left-0 bg-white px-2 py-0.5 rounded shadow text-[11px] font-semibold text-primary whitespace-nowrap">
              Sehore Mandi Depot (Procurement ₹74/kg)
            </div>
          </div>

          {/* Marker 4: Kirana Wholesale Cluster */}
          <div
            onClick={() => setActivePinId(activePinId === 'retail' ? null : 'retail')}
            className="absolute top-12 left-1/2 group cursor-pointer z-10"
          >
            <div className="w-7 h-7 rounded-full bg-on-tertiary-container text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[14px]">local_convenience_store</span>
            </div>
            <div className="absolute top-8 -left-10 bg-white px-2 py-0.5 rounded shadow text-[10px] text-on-surface whitespace-nowrap">
              42 Kirana Retail Hub (Bairagarh Belt)
            </div>
          </div>

          {/* Map Metric HUD Floating Overlay */}
          <div className="absolute bottom-3 right-3 glassmorphic p-3.5 rounded-xl border border-white/60 shadow-lg text-body-sm space-y-1 z-20">
            <div className="flex items-center justify-between gap-4">
              <span className="text-on-surface-variant font-medium">Unmet Monthly Demand:</span>
              <strong className="text-primary font-numeric-data">14.5 Metric Tonnes</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-on-surface-variant font-medium">Wholesale Sourcing Price:</span>
              <strong className="text-secondary font-numeric-data">₹74.00 / kg</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-on-surface-variant font-medium">Retail Realization:</span>
              <strong className="text-primary font-numeric-data">₹118.00 / kg</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Radar & Concrete Mitigation Recommendations */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Business Risk Matrix & Hedging Strategies
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              5-Vector Risk Profiling for Rural Food Processing
            </p>
          </div>
          <span className="text-bilingual-indicator font-bilingual-indicator bg-secondary-container/40 text-secondary font-bold px-3 py-1 rounded-full">
            Overall Risk: MODERATE-LOW
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-primary font-semibold">Demand Risk</span>
              <span className="text-[11px] font-bold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded">
                LOW
              </span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant text-[12px]">
              Pulses are an essential staple; demand is non-cyclical with steady 7% local consumption growth.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-primary font-semibold">Competition</span>
              <span className="text-[11px] font-bold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded">
                MEDIUM
              </span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant text-[12px]">
              Nearest mill is 3.8 km away. Differentiate via clean 1kg packaging and free delivery to local kiranas.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-error/30 bg-error-container/20">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-error font-semibold">Raw Grain Price</span>
              <span className="text-[11px] font-bold text-error bg-error-container px-2 py-0.5 rounded">
                HIGH
              </span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant text-[12px]">
              Chana prices fluctuate 20% post-monsoon. <em>Action:</em> Enter forward contracts with 3 local FPOs.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-primary font-semibold">Liquidity Risk</span>
              <span className="text-[11px] font-bold text-on-tertiary-container bg-tertiary-fixed/50 px-2 py-0.5 rounded">
                MEDIUM
              </span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant text-[12px]">
              Retailers demand 15-day credit. Maintain ₹2.5L cash credit facility sanctioned under Mudra Kishore.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-primary font-semibold">Compliance / FSSAI</span>
              <span className="text-[11px] font-bold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded">
                LOW
              </span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant text-[12px]">
              Simple State Registration (Form A) sufficient for &lt; ₹12L turnover. Udyam registration completed in 1 day.
            </p>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {/* End PDF-captured section */}
      </div>
=======
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
    </div>
  );
};

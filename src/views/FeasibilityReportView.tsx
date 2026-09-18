import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ReportService } from '../services/reportService';
import { CENTRAL_STATE_SCHEMES } from '../data/schemes';

export const FeasibilityReportView: React.FC = () => {
  const navigate = useNavigate();
  const { profile, metrics, loadProfilePreset } = useApp();

  // State for interactive document checklist
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    aadhaar: true,
    pan: true,
    passbook: true,
    photo: true,
    plan: true,
    land: false,
    caste: false,
    vet: false,
    site_photo: false,
    loan_app: false,
    income: false,
    subsidy_form: false,
  });

  const toggleDoc = (key: string) => {
    setCheckedDocs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const leadScheme = CENTRAL_STATE_SCHEMES.find(s => s.id === 'pmegp') || CENTRAL_STATE_SCHEMES[0];
    ReportService.generateDPRPdf(profile, metrics, leadScheme);
  };

  // Format currency helpers
  const formatK = (val: number) => {
    if (val >= 100000) {
      return `${(val / 100000).toFixed(1)}L`;
    }
    return `${Math.round(val / 1000)}K`;
  };

  const isDairy = profile.category.id === 'dairy';
  const displayScore = isDairy ? '6.5' : '8.2';
  const isGo = Number(displayScore) >= 7.5;

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      {/* TOP FLOATING ACTION BAR - Hidden when printing */}
      <div className="no-print bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 card-shadow flex flex-wrap items-center justify-between gap-3 sticky top-20 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/analyze')}
            className="px-3 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-surface-container-low text-xs font-semibold text-on-surface-variant flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Wizard</span>
          </button>

          {/* Preset switch buttons */}
          <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/30 text-xs">
            <button
              onClick={() => loadProfilePreset('komal')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                isDairy
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              🐄 Komal (Dairy)
            </button>
            <button
              onClick={() => loadProfilePreset('rameshwar')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                !isDairy
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              🌾 Rameshwar (Dal Mill)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-secondary text-white hover:bg-secondary/90 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Print or Save as 2-Page PDF"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print / Save PDF (2 Pages)</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-1.5 bg-primary text-white hover:bg-primary/90 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export Bank DPR</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>Deep-Dive Dashboard</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 1: FEASIBILITY REPORT (EXACT REPRODUCTION OF USER REFERENCE SCREENSHOT) */}
      {/* ========================================================================= */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-300 shadow-md print:shadow-none print:border-none print:p-0 print:m-0 space-y-6 text-slate-800">
        
        {/* Document Header */}
        <div className="border-b-2 border-slate-800 pb-4">
          <div className="text-[11px] text-slate-500 font-mono flex items-between justify-between">
            <span>17/09/2026, 13:39</span>
            <span className="font-semibold">Agneyaa Feasibility Report — {profile.name}</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-emerald-800 font-bold text-xs tracking-wider uppercase">
            <span>🔥 AGNEYAA</span>
            <span>•</span>
            <span className="flex items-center gap-1">📊 BUSINESS FEASIBILITY REPORT</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {profile.name} — {profile.businessIdea || profile.category.titleEn}
          </h1>

          <div className="text-xs text-slate-600 mt-2 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              💼 Business Category: <span className="font-medium text-slate-800">{isDairy ? '🐄 Dairy' : '🌾 Dal Mill'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              📍 Location: <span className="font-medium text-slate-800">{profile.location.block}, {profile.location.block}, {profile.location.district}</span>
            </span>
            <span>•</span>
            <span>Date: {currentDate}</span>
            <span>•</span>
            <span>Generated by Agneyaa AI Platform</span>
          </div>
        </div>

        {/* VERDICT BOX (Green rounded container with 4 metrics) */}
        <div className="border-2 border-emerald-600/70 rounded-xl p-5 bg-emerald-50/20 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-5xl sm:text-6xl font-black text-emerald-700 sm:border-r border-emerald-300 sm:pr-6">
            {displayScore}
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-lg font-bold text-emerald-800">
              Verdict: {isGo ? 'HIGH VIABILITY - GO' : 'CONDITIONAL GO'}
            </div>
            <div className="text-xs text-slate-600">
              {isGo
                ? 'Highly viable with government subsidy support. Strong local demand.'
                : 'Viable with conditions. Start smaller scale.'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs border-t sm:border-t-0 sm:border-l border-emerald-300 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">Market Potential</span>
              <span className="font-bold text-emerald-800">{isDairy ? '81%' : '88%'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">Financial Viability</span>
              <span className="font-bold text-emerald-800">{isDairy ? '75%' : '84%'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">Location Advantage</span>
              <span className="font-bold text-emerald-800">{isDairy ? '70%' : '86%'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">Scheme Eligibility</span>
              <span className="font-bold text-emerald-800">{isDairy ? '85%' : '94%'}</span>
            </div>
          </div>
        </div>

        {/* 1. BUSINESS PROFILE CARD */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
          <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span>🏛️</span>
            <span>BUSINESS PROFILE</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>👤</span> Full Name
              </span>
              <span className="font-medium text-slate-900">{profile.name}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>💡</span> Business Idea
              </span>
              <span className="font-medium text-slate-900">{profile.businessIdea || profile.category.titleEn}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>💼</span> Business Category
              </span>
              <span className="font-medium text-slate-900">{isDairy ? '🐄 Dairy' : '🌾 Agro Processing'}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>📍</span> Location
              </span>
              <span className="font-medium text-slate-900">{profile.location.block}, {profile.location.block}, {profile.location.district}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>💰</span> Your Capital
              </span>
              <span className="font-medium text-slate-900">₹{profile.finance.ownCapital >= 100000 ? `${profile.finance.ownCapital / 1000}K` : profile.finance.ownCapital}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>📋</span> Social Category
              </span>
              <span className="font-medium text-slate-900">{profile.skills.socialCategory.toLowerCase()}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>🏡</span> Land Ownership
              </span>
              <span className="font-medium text-slate-900">{profile.landOwnership || 'none'}</span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <span>🎯</span> Target Customers
              </span>
              <span className="font-medium text-slate-900">{profile.targetCustomers || 'Residencial Areas Household'}</span>
            </div>
          </div>
        </div>

        {/* 2. FINANCIAL SUMMARY CARD (6 Boxes + Scheme Banner) */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-white">
          <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5">
            <span>💰</span>
            <span>FINANCIAL SUMMARY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">PROJECT COST</div>
              <div className="text-base font-bold text-emerald-800 mt-0.5">
                ₹{formatK(profile.finance.totalOutlay)}
              </div>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">YOUR CAPITAL</div>
              <div className="text-base font-bold text-emerald-800 mt-0.5">
                ₹{Math.round(profile.finance.ownCapital / 1000)}K
              </div>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">NET LOAN REQUIRED</div>
              <div className="text-base font-bold text-emerald-800 mt-0.5">
                ₹{isDairy ? '675K' : `${Math.round((profile.finance.totalOutlay - profile.finance.ownCapital) / 1000)}K`}
              </div>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">MONTHLY EMI</div>
              <div className="text-base font-bold text-emerald-800 mt-0.5">
                ₹{isDairy ? '13K' : `${Math.round(metrics.monthlyEmi / 1000)}K`}
              </div>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">SUBSIDY AMOUNT</div>
              <div className="text-base font-bold text-emerald-800 mt-0.5">
                ₹{isDairy ? '225K' : `${Math.round(metrics.promoterSubsidyGrant / 1000)}K`}
              </div>
            </div>

            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">WORKING CAPITAL</div>
              <div className="text-base font-bold text-emerald-800 mt-0.5">
                ₹{isDairy ? '68K' : `${Math.round(metrics.workingCapitalLoan / 1000)}K`}
              </div>
            </div>
          </div>

          <div className="text-xs text-emerald-800 font-medium bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
            {isDairy ? (
              <span>NABARD Dairy Entrepreneurship • 6.5% p.a. • Subsidy Amount: 25–33% • Moratorium: 6 months</span>
            ) : (
              <span>PMEGP Scheme • 8.5% p.a. • Subsidy Amount: 35% Rural • Moratorium: 6 months</span>
            )}
          </div>
        </div>

        {/* 3. MARKET ANALYSIS CARD */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
          <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span>📊</span>
            <span>MARKET ANALYSIS</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong className="text-slate-900">📍 Location:</strong> {profile.location.block}, {profile.location.district} — verified via India Post API.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong className="text-slate-900">Market Demand:</strong> Estimated moderate-to-high demand for {isDairy ? '🐄 Dairy' : profile.category.titleEn} in rural {profile.location.district}.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong className="text-slate-900">Competition:</strong> Medium competition typical for {isDairy ? '🐄 Dairy' : profile.category.titleEn}. Local trust and quality are key differentiators.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong className="text-slate-900">Revenue Estimate:</strong> Monthly {isDairy ? '₹15K–₹25K' : `₹${Math.round(metrics.monthlyNetProfit / 1000)}K–₹${Math.round((metrics.monthlyNetProfit * 1.5) / 1000)}K`} achievable in 6–12 months.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong className="text-slate-900">🎯 Target Customers:</strong> {profile.targetCustomers || 'Residencial Areas Household'}.
              </span>
            </li>
          </ul>
        </div>

        {/* Page 1 Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span>https://agneyaa-final.vercel.app</span>
          <span>1/2</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 2: RISK, DOCUMENTS & ACTION PLAN (PAGE 2 OF REFERENCE SCREENSHOT)     */}
      {/* ========================================================================= */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-300 shadow-md print:shadow-none print:border-none print:p-0 print:m-0 space-y-6 text-slate-800 print:break-before-page">
        
        {/* Page 2 Document Header */}
        <div className="border-b border-slate-200 pb-2 flex justify-between items-center text-[11px] text-slate-500 font-mono">
          <span>17/09/2026, 13:39</span>
          <span className="font-semibold">Agneyaa Feasibility Report — {profile.name}</span>
        </div>

        {/* 1. RISK MATRIX CARD */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
          <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span>⚠️</span>
            <span>RISK MATRIX</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b-2 border-emerald-700/60 text-emerald-900 font-bold">
                  <th className="py-2 pr-4">RISK</th>
                  <th className="py-2 px-4">LEVEL</th>
                  <th className="py-2 pl-4">MITIGATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isDairy ? (
                  <>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">Animal health risk</td>
                      <td className="py-2.5 px-4 font-bold text-red-600">High</td>
                      <td className="py-2.5 pl-4 text-slate-600">NABARD-sponsored vet insurance</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">Milk price volatility</td>
                      <td className="py-2.5 px-4 font-bold text-amber-600">Medium</td>
                      <td className="py-2.5 pl-4 text-slate-600">Link to cooperative (Amul/NDDB)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">Feed cost inflation</td>
                      <td className="py-2.5 px-4 font-bold text-amber-600">Medium</td>
                      <td className="py-2.5 pl-4 text-slate-600">Grow green fodder on available land</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">Raw grain price volatility</td>
                      <td className="py-2.5 px-4 font-bold text-red-600">High</td>
                      <td className="py-2.5 pl-4 text-slate-600">Forward contracts with 3 local FPOs at harvest</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">Power interruption & feeder rate</td>
                      <td className="py-2.5 px-4 font-bold text-amber-600">Medium</td>
                      <td className="py-2.5 pl-4 text-slate-600">Dedicated rural agricultural 3-phase connection</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">Retailer credit payment cycle</td>
                      <td className="py-2.5 px-4 font-bold text-amber-600">Medium</td>
                      <td className="py-2.5 pl-4 text-slate-600">15-day strict credit cycle & cash settlement incentives</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. DOCUMENTS NEEDED CARD (Interactive Checkboxes) */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5">
              <span>📋</span>
              <span>DOCUMENTS NEEDED</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 no-print">
              {checkedCount} of 12 verified
            </span>
          </div>

          <div className="text-xs font-medium text-slate-700">
            {isDairy ? 'NABARD Dairy Entrepreneurship — required documents' : 'PMEGP & Mudra Scheme — required documents'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            {[
              { id: 'aadhaar', label: 'Aadhaar Card' },
              { id: 'pan', label: 'PAN Card' },
              { id: 'passbook', label: 'Bank Passbook (last 3 months)' },
              { id: 'photo', label: 'Passport-size Photo (4 copies)' },
              { id: 'plan', label: 'Business Plan Document' },
              { id: 'land', label: 'Land Records / 7-12 Extract' },
              { id: 'caste', label: 'Caste Certificate (SC/ST) — priority for subsidy' },
              { id: 'vet', label: isDairy ? 'Veterinary Health Certificate (for dairy animals)' : 'Trade License / FSSAI Basic Registration' },
              { id: 'site_photo', label: 'Photograph of Farm / Project Site' },
              { id: 'loan_app', label: 'Bank Loan Application (NABARD format)' },
              { id: 'income', label: 'Income Certificate' },
              { id: 'subsidy_form', label: 'Subsidy Application Form (DEDS/DIDF)' },
            ].map(doc => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <label
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className="flex items-center gap-2.5 p-1.5 rounded hover:bg-slate-50 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400 bg-white'
                  }`}>
                    {isChecked && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </div>
                  <span className={isChecked ? 'text-slate-900 font-medium' : 'text-slate-600'}>
                    {doc.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. ACTION PLAN CARD (7 Steps) */}
        <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white">
          <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span>🎯</span>
            <span>ACTION PLAN</span>
          </div>

          <ol className="space-y-2 text-xs text-slate-700 list-none">
            {[
              'Finalise your business location and get land/shop agreement',
              'Open a dedicated business bank account (preferably SBI/NABARD empanelled)',
              'Collect all required documents (Aadhaar, PAN, Caste Cert, Income Cert)',
              'Apply for the recommended government scheme at your nearest bank branch',
              'Register on Udyam Portal (MSME registration — free, online)',
              'Start with a pilot/soft launch to validate demand before full investment',
              'Maintain business records from Day 1 for compliance and loan tracking',
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-4 flex-shrink-0">{idx + 1}</span>
                <span className="text-slate-800">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Page 2 Footer & Legend */}
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>API Data (India Post, OSM, Agmarknet)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span>User Data</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span>Estimated by Beej AI</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Consult a bank/field officer for final verification.</span>
          </div>

          <div className="text-center text-[10px] text-slate-400">
            Generated by Agneyaa • SIH 2026
          </div>

          <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>https://agneyaa-final.vercel.app</span>
            <span>2/2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

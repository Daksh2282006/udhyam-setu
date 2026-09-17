import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const { resetToDemoBaseline } = useApp();

  const handleStartAnalysis = () => {
    navigate('/analyze');
  };

  const handleExploreCaseStudy = () => {
    resetToDemoBaseline();
    navigate('/dashboard');
  };

  return (
    <section className="space-y-12 animate-in fade-in duration-300">
      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-[#031d38] text-on-primary p-6 md:p-12 card-shadow">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="font-headline-xl text-headline-xl sm:text-display-lg text-white font-extrabold tracking-tight leading-tight">
            Turn Your Business Idea Into a Smarter Business Plan.
            <span className="block text-primary-fixed mt-1 font-headline-md text-headline-md font-semibold">
              अपने व्यापारिक विचार को बनाएं लाभदायी व सुरक्षित उद्यम।
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-surface-variant/90 max-w-2xl leading-relaxed">
            Overcoming capital blindspots, scheme confusion, and market risks with hyper-local cluster demand telemetry, verified PMEGP/Mudra integration, and regional multilingual voice advisories.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleStartAnalysis}
              className="px-6 py-3.5 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md rounded-lg flex items-center gap-2 elevation-2 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>Start Business Structuring / योजना बनाएं</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={handleExploreCaseStudy}
              className="px-5 py-3.5 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 border border-white/20 text-white font-label-md text-label-md rounded-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Explore Live Bhopal Dal Mill Case Study</span>
            </button>
          </div>
        </div>

        {/* Real-world Impact Badges */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="font-display-lg-mobile text-display-lg-mobile text-secondary-fixed font-bold">
              ₹14.8 Cr+
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Govt. Subsidies Mapped</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              सरकारी अनुदान सहायता
            </div>
          </div>

          <div>
            <div className="font-display-lg-mobile text-display-lg-mobile text-white font-bold">
              18,400+
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Rural Units Modeled</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              सत्यापित ग्रामीण उद्यम
            </div>
          </div>

          <div>
            <div className="font-display-lg-mobile text-display-lg-mobile text-secondary-fixed font-bold">
              94.2%
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Viability Score Precision</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              सटीक वित्तीय पूर्वानुमान
            </div>
          </div>

          <div>
            <div className="font-display-lg-mobile text-display-lg-mobile text-white font-bold">
              100%
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Vernacular Audio Ready</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              क्षेत्रीय बोलियों में उपलब्ध
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Bharat Business Workflow Pipeline */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              How UdyamSetu Powers Grassroots Enterprise
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              From conversational voice input to bankable Detailed Project Report (DPR)
            </p>
          </div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase tracking-wider bg-secondary-container/30 px-3 py-1 rounded-md">
            6-Stage Framework
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              STEP 01
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">record_voice_over</span>
              <span>Simple Input</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Type or speak business intent in rural dialect or native tongue.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              STEP 02
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">radar</span>
              <span>Demand Engine</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              APMC Mandi data and consumer kirana gap analysis in 15km cluster.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              STEP 03
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">account_tree</span>
              <span>Cluster Mapping</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Pinpoint competitor radius, raw material depots, and logistics friction.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              STEP 04
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">tune</span>
              <span>What-If Stress</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Test price fluctuations, diesel hikes, and seasonal harvest drops.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              STEP 05
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">description</span>
              <span>DPR & Roadmap</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Bank-ready Detailed Project Report formatted for PMEGP approval.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              STEP 06
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span>AI Saarthi</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Continuous voice advisory to navigate licenses, subsidies, and GST.
            </p>
          </div>
        </div>
      </div>

      {/* Bharat Micro-Enterprise Problem Landscape (7 Critical Blindspots Solved) */}
      <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/30">
        <div className="mb-6">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">
            7 Challenges Rural Entrepreneurs Face (And How UdyamSetu Resolves Them)
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Bridging the critical structural divide between grassroots ambition and bankable viability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span className="font-label-md text-label-md">1. Working Capital Blindspots</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Micro-entrepreneurs exhaust capital on heavy machinery with zero runway left for peak harvest grain stockpiling.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span className="font-label-md text-label-md">2. Scheme Discovery Fatigue</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Complex 40-page central & state scheme portals leave rural youths vulnerable to middlemen commission agents.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">location_off</span>
              <span className="font-label-md text-label-md">3. Hyper-Local Demand Blindness</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Setting up flour/dal mills in clusters with existing surplus capacity leads to cutthroat margins and default within 18 months.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">request_quote</span>
              <span className="font-label-md text-label-md">4. High-Interest Informal Debt</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Borrowing at 36-48% annual interest from local moneylenders when they qualify for 8.5% Mudra or 35% PMEGP subsidies.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span className="font-label-md text-label-md">5. Vernacular Technical Barrier</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Financial jargon (DSCR, IRR, Break-even, Depreciation) in English prevents rural business owners from negotiating with banks.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span className="font-label-md text-label-md">6. Lack of Packaging & FSSAI Standards</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Selling loose pulses at ₹74/kg wholesale rather than branded 1kg packets at ₹118/kg to regional grocery stores.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-secondary/30 md:col-span-2 lg:col-span-3 bg-secondary-container/10">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="font-headline-sm text-headline-sm">7. The UdyamSetu Solution (उद्यमसेतु का संपूर्ण समाधान)</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface">
              Automates financial structuring, bank-ready DPR generation, and provides actionable daily milestone playbooks in Devanagari alongside real-time What-If sensitivity stress-testing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

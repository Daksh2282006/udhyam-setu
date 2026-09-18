import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext';

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const { resetToDemoBaseline, t } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      navigate('/analyze');
    } else {
      openAuthModal('signup');
    }
=======

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const { resetToDemoBaseline } = useApp();

  const handleStartAnalysis = () => {
    navigate('/analyze');
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
  };

  const handleExploreCaseStudy = () => {
    resetToDemoBaseline();
    navigate('/dashboard');
  };

  return (
    <section className="space-y-12 animate-in fade-in duration-300">
      {/* Hero Banner Card */}
<<<<<<< HEAD
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061e38] via-[#041a30] to-[#021324] text-white p-6 md:p-12 card-shadow border border-[#0d345c]">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="space-y-2">
            <h1 className="font-headline-xl text-headline-xl sm:text-[34px] text-white font-extrabold tracking-tight leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-[#64b5f6] text-[18px] sm:text-[20px] font-semibold">
              {t('heroSubtitle')}
            </p>
          </div>

          <p className="font-body-lg text-body-lg text-slate-300 max-w-2xl leading-relaxed text-[14px] sm:text-[15px]">
            {t('heroDesc')}
=======
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
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleStartAnalysis}
<<<<<<< HEAD
              className="px-6 py-3.5 bg-[#00695c] hover:bg-[#00796b] text-white font-bold text-label-md rounded-xl flex items-center gap-2 elevation-2 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>{t('startAnalysis')}</span>
=======
              className="px-6 py-3.5 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md rounded-lg flex items-center gap-2 elevation-2 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>Start Business Structuring / योजना बनाएं</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={handleExploreCaseStudy}
<<<<<<< HEAD
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-label-md rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>{t('exploreCaseStudy')}</span>
=======
              className="px-5 py-3.5 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 border border-white/20 text-white font-label-md text-label-md rounded-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Explore Live Bhopal Dal Mill Case Study</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </button>
          </div>
        </div>

        {/* Real-world Impact Badges */}
<<<<<<< HEAD
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-[24px] sm:text-[28px] text-[#4db6ac] font-bold">
              ₹14.8 Cr+
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('subsidiesMapped')}
=======
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="font-display-lg-mobile text-display-lg-mobile text-secondary-fixed font-bold">
              ₹14.8 Cr+
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Govt. Subsidies Mapped</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              सरकारी अनुदान सहायता
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <div className="text-[24px] sm:text-[28px] text-white font-bold">
              18,400+
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('ruralUnits')}
=======
            <div className="font-display-lg-mobile text-display-lg-mobile text-white font-bold">
              18,400+
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Rural Units Modeled</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              सत्यापित ग्रामीण उद्यम
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <div className="text-[24px] sm:text-[28px] text-[#4db6ac] font-bold">
              94.2%
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('viabilityPrecision')}
=======
            <div className="font-display-lg-mobile text-display-lg-mobile text-secondary-fixed font-bold">
              94.2%
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Viability Score Precision</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              सटीक वित्तीय पूर्वानुमान
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <div className="text-[24px] sm:text-[28px] text-white font-bold">
              100%
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('vernacularAudio')}
=======
            <div className="font-display-lg-mobile text-display-lg-mobile text-white font-bold">
              100%
            </div>
            <div className="font-body-sm text-body-sm text-surface-variant">Vernacular Audio Ready</div>
            <div className="text-bilingual-indicator font-bilingual-indicator text-surface-variant/70">
              क्षेत्रीय बोलियों में उपलब्ध
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Bharat Business Workflow Pipeline */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
<<<<<<< HEAD
              {t('frameworkHeading')}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('frameworkSubheading')}
            </p>
          </div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase tracking-wider bg-secondary-container/30 px-3 py-1 rounded-md">
            {t('stageFramework')}
=======
              How UdyamSetu Powers Grassroots Enterprise
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              From conversational voice input to bankable Detailed Project Report (DPR)
            </p>
          </div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase tracking-wider bg-secondary-container/30 px-3 py-1 rounded-md">
            6-Stage Framework
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
<<<<<<< HEAD
              {t('step01')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">record_voice_over</span>
              <span>{t('step01Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step01Desc')}
=======
              STEP 01
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">record_voice_over</span>
              <span>Simple Input</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Type or speak business intent in rural dialect or native tongue.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
<<<<<<< HEAD
              {t('step02')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">radar</span>
              <span>{t('step02Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step02Desc')}
=======
              STEP 02
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">radar</span>
              <span>Demand Engine</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              APMC Mandi data and consumer kirana gap analysis in 15km cluster.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
<<<<<<< HEAD
              {t('step03')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">account_tree</span>
              <span>{t('step03Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step03Desc')}
=======
              STEP 03
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">account_tree</span>
              <span>Cluster Mapping</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Pinpoint competitor radius, raw material depots, and logistics friction.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
<<<<<<< HEAD
              {t('step04')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">tune</span>
              <span>{t('step04Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step04Desc')}
=======
              STEP 04
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">tune</span>
              <span>What-If Stress</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Test price fluctuations, diesel hikes, and seasonal harvest drops.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
<<<<<<< HEAD
              {t('step05')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">description</span>
              <span>{t('step05Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step05Desc')}
=======
              STEP 05
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">description</span>
              <span>DPR & Roadmap</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Bank-ready Detailed Project Report formatted for PMEGP approval.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
<<<<<<< HEAD
              {t('step06')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span>{t('step06Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step06Desc')}
=======
              STEP 06
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span>AI Saarthi</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              Continuous voice advisory to navigate licenses, subsidies, and GST.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>
        </div>
      </div>

      {/* Bharat Micro-Enterprise Problem Landscape (7 Critical Blindspots Solved) */}
      <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/30">
        <div className="mb-6">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">
<<<<<<< HEAD
            {t('challengesHeading')}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {t('challengesSubheading')}
=======
            7 Challenges Rural Entrepreneurs Face (And How UdyamSetu Resolves Them)
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Bridging the critical structural divide between grassroots ambition and bankable viability.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">warning</span>
<<<<<<< HEAD
              <span className="font-label-md text-label-md">{t('ch1Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch1Desc')}
=======
              <span className="font-label-md text-label-md">1. Working Capital Blindspots</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Micro-entrepreneurs exhaust capital on heavy machinery with zero runway left for peak harvest grain stockpiling.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
<<<<<<< HEAD
              <span className="font-label-md text-label-md">{t('ch2Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch2Desc')}
=======
              <span className="font-label-md text-label-md">2. Scheme Discovery Fatigue</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Complex 40-page central & state scheme portals leave rural youths vulnerable to middlemen commission agents.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">location_off</span>
<<<<<<< HEAD
              <span className="font-label-md text-label-md">{t('ch3Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch3Desc')}
=======
              <span className="font-label-md text-label-md">3. Hyper-Local Demand Blindness</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Setting up flour/dal mills in clusters with existing surplus capacity leads to cutthroat margins and default within 18 months.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">request_quote</span>
<<<<<<< HEAD
              <span className="font-label-md text-label-md">{t('ch4Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch4Desc')}
=======
              <span className="font-label-md text-label-md">4. High-Interest Informal Debt</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Borrowing at 36-48% annual interest from local moneylenders when they qualify for 8.5% Mudra or 35% PMEGP subsidies.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">translate</span>
<<<<<<< HEAD
              <span className="font-label-md text-label-md">{t('ch5Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch5Desc')}
=======
              <span className="font-label-md text-label-md">5. Vernacular Technical Barrier</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Financial jargon (DSCR, IRR, Break-even, Depreciation) in English prevents rural business owners from negotiating with banks.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
<<<<<<< HEAD
              <span className="font-label-md text-label-md">{t('ch6Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch6Desc')}
=======
              <span className="font-label-md text-label-md">6. Lack of Packaging & FSSAI Standards</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Selling loose pulses at ₹74/kg wholesale rather than branded 1kg packets at ₹118/kg to regional grocery stores.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-secondary/30 md:col-span-2 lg:col-span-3 bg-secondary-container/10">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
<<<<<<< HEAD
              <span className="font-headline-sm text-headline-sm">{t('solTitle')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface">
              {t('solDesc')}
=======
              <span className="font-headline-sm text-headline-sm">7. The UdyamSetu Solution (उद्यमसेतु का संपूर्ण समाधान)</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface">
              Automates financial structuring, bank-ready DPR generation, and provides actionable daily milestone playbooks in Devanagari alongside real-time What-If sensitivity stress-testing.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

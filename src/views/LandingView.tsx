import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
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
  };

  const handleExploreCaseStudy = () => {
    resetToDemoBaseline();
    navigate('/dashboard');
  };

  return (
    <section className="space-y-12 animate-in fade-in duration-300">
      {/* Hero Banner Card */}
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
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleStartAnalysis}
              className="px-6 py-3.5 bg-[#00695c] hover:bg-[#00796b] text-white font-bold text-label-md rounded-xl flex items-center gap-2 elevation-2 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>{t('startAnalysis')}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={handleExploreCaseStudy}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-label-md rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>{t('exploreCaseStudy')}</span>
            </button>
          </div>
        </div>

        {/* Real-world Impact Badges */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-[24px] sm:text-[28px] text-[#4db6ac] font-bold">
              ₹14.8 Cr+
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('subsidiesMapped')}
            </div>
          </div>

          <div>
            <div className="text-[24px] sm:text-[28px] text-white font-bold">
              18,400+
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('ruralUnits')}
            </div>
          </div>

          <div>
            <div className="text-[24px] sm:text-[28px] text-[#4db6ac] font-bold">
              94.2%
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('viabilityPrecision')}
            </div>
          </div>

          <div>
            <div className="text-[24px] sm:text-[28px] text-white font-bold">
              100%
            </div>
            <div className="text-[13px] text-slate-200 font-semibold mt-0.5">
              {t('vernacularAudio')}
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Bharat Business Workflow Pipeline */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              {t('frameworkHeading')}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('frameworkSubheading')}
            </p>
          </div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase tracking-wider bg-secondary-container/30 px-3 py-1 rounded-md">
            {t('stageFramework')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              {t('step01')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">record_voice_over</span>
              <span>{t('step01Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step01Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              {t('step02')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">radar</span>
              <span>{t('step02Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step02Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              {t('step03')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">account_tree</span>
              <span>{t('step03Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step03Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              {t('step04')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">tune</span>
              <span>{t('step04Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step04Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              {t('step05')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">description</span>
              <span>{t('step05Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step05Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 card-shadow relative hover:shadow-md transition-shadow">
            <span className="text-[10px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              {t('step06')}
            </span>
            <div className="mt-3 flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span>{t('step06Title')}</span>
            </div>
            <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
              {t('step06Desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Bharat Micro-Enterprise Problem Landscape (7 Critical Blindspots Solved) */}
      <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/30">
        <div className="mb-6">
          <h3 className="font-headline-md text-headline-md text-primary font-bold">
            {t('challengesHeading')}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {t('challengesSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span className="font-label-md text-label-md">{t('ch1Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch1Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span className="font-label-md text-label-md">{t('ch2Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch2Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">location_off</span>
              <span className="font-label-md text-label-md">{t('ch3Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch3Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">request_quote</span>
              <span className="font-label-md text-label-md">{t('ch4Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch4Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span className="font-label-md text-label-md">{t('ch5Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch5Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 text-error font-semibold">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span className="font-label-md text-label-md">{t('ch6Title')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              {t('ch6Desc')}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-secondary/30 md:col-span-2 lg:col-span-3 bg-secondary-container/10">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="font-headline-sm text-headline-sm">{t('solTitle')}</span>
            </div>
            <p className="mt-2 text-body-sm text-on-surface">
              {t('solDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

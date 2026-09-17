import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BusinessAnalysisService } from '../services/businessAnalysisService';

export const RecommendationView: React.FC = () => {
  const navigate = useNavigate();
  const { profile, metrics } = useApp();

  const analysis = BusinessAnalysisService.analyzeEnterprise(profile);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            एआई व्यवसाय परामर्श • Autonomous Recommendation Engine
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Optimal Enterprise Recommendation
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Calibrated against mandi telemetry, available equity, and verified government subsidies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/dashboard/simulator')}
            className="px-4 py-2 bg-secondary text-white font-label-md rounded-lg flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Test in Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Recommendation Hero */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border-2 border-secondary/40 card-shadow space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-secondary text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
          Top Cluster Match • {analysis.score}/100 Viability
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container/40 text-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[32px]">{profile.category.icon}</span>
          </div>
          <div>
            <h3 className="font-headline-xl text-headline-xl text-primary font-bold">
              {profile.category.titleEn}
            </h3>
            <div className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold text-[14px]">
              {profile.category.titleHi}
            </div>
            <p className="text-body-md text-on-surface-variant max-w-2xl mt-2">
              {profile.category.descEn}
            </p>
          </div>
        </div>

        {/* Why this recommendation */}
        <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-3">
          <h4 className="font-headline-sm text-[16px] text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">verified</span>
            <span>Why Am I Seeing This Recommendation? (XAI Factors)</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm text-[13px]">
            {analysis.reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 flex-shrink-0">
                  check_circle
                </span>
                <span className="text-on-surface">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
            <div className="text-xs text-on-surface-variant font-medium">Monthly Net Profit</div>
            <div className="font-numeric-data text-xl font-bold text-secondary mt-1">
              ₹{metrics.monthlyNetProfit.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
            <div className="text-xs text-on-surface-variant font-medium">Capital Payback</div>
            <div className="font-numeric-data text-xl font-bold text-primary mt-1">
              {metrics.breakEvenMonths} Months
            </div>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
            <div className="text-xs text-on-surface-variant font-medium">PMEGP Subsidy</div>
            <div className="font-numeric-data text-xl font-bold text-secondary mt-1">
              ₹{metrics.promoterSubsidyGrant.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-outline-variant/30 text-center">
            <div className="text-xs text-on-surface-variant font-medium">Bank DSCR</div>
            <div className="font-numeric-data text-xl font-bold text-primary mt-1">
              {metrics.dscr}x Coverage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { RiskService } from '../services/riskService';

export const RiskView: React.FC = () => {
  const { simulatorParams, metrics } = useApp();

  const risks = RiskService.assessRisks(simulatorParams, metrics);

  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'text-error bg-error-container/40 border border-error/30';
      case 'MEDIUM':
        return 'text-on-tertiary-container bg-tertiary-fixed/50 border border-amber-300';
      case 'LOW':
      default:
        return 'text-secondary bg-secondary-container/50 border border-secondary/30';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            व्यापारिक जोखिम प्रबंधन • 5-Vector Risk Matrix
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Enterprise Risk Assessment & Hedging Strategies
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Proactive mitigation playbooks for rural agro-processing units to prevent NPA and margin compression.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-label-sm font-bold bg-secondary-container/40 text-secondary border border-secondary/20">
            Overall Health: Bankable
          </span>
        </div>
      </div>

      {/* 5 Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {risks.map((risk) => (
          <div
            key={risk.id}
            className={`bg-surface-container-lowest p-6 rounded-2xl border card-shadow flex flex-col justify-between space-y-4 ${
              risk.level === 'HIGH'
                ? 'border-error/30 bg-error-container/5'
                : 'border-outline-variant/30'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-[17px] text-primary font-bold">
                  {risk.name}
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getBadgeStyle(risk.level)}`}>
                  {risk.level} RISK
                </span>
              </div>

              <p className="text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                {risk.description}
              </p>

              <div className="p-3 bg-surface-container-low rounded-xl text-[12px] text-on-surface-variant">
                <strong className="text-primary block mb-0.5">Potential Impact:</strong>
                {risk.impact}
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20">
              <div className="flex items-start gap-2 text-[12px] text-secondary">
                <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">
                  shield
                </span>
                <div>
                  <strong className="text-primary block">Recommended Mitigation:</strong>
                  <span className="text-on-surface-variant">{risk.mitigation}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sensibility Callout Banner */}
      <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm border border-outline-variant/30 flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">tune</span>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-primary font-bold">
              Want to test how severe market swings affect your risks?
            </div>
            <p className="text-body-sm text-on-surface-variant text-[13px]">
              Simulate grain crop failure, diesel freight increases, or kirana price wars in the What-If Simulator.
            </p>
          </div>
        </div>

        <a
          href="/dashboard/simulator"
          className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-label-md text-label-md rounded-lg flex items-center gap-1.5 whitespace-nowrap elevation-2"
        >
          <span>Open What-If Simulator</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>
    </div>
  );
};

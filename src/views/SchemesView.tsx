import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchemeService } from '../services/schemeService';
import { ReportService } from '../services/reportService';
import { SchemeInfo } from '../types';

export const SchemesView: React.FC = () => {
  const { profile, metrics } = useApp();
  const [filter, setFilter] = useState<'all' | 'high_subsidy'>('all');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<SchemeInfo | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const matchedSchemes = SchemeService.matchSchemes(profile);
  const displayedSchemes = filter === 'high_subsidy'
    ? matchedSchemes.filter(s => s.subsidyRate.includes('35%') || s.subsidyRate.includes('40%'))
    : matchedSchemes;

  const handleGenerateDossier = (scheme: SchemeInfo) => {
    ReportService.generateDPRPdf(profile, metrics, scheme);
    setDownloadSuccess(`Generated and downloaded ${scheme.name} Bank Dossier (PDF)!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Scheme Filter Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            सत्यापित सरकारी योजनाएं • Verified Indian MSME Funding
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Government Scheme Matching Engine
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Instant matching against Central (KVIC, MoFPI, SIDBI) and Madhya Pradesh State Subsidies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-label-md text-label-md text-on-surface-variant font-medium">Filter:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            All Matches ({matchedSchemes.length})
          </button>
          <button
            onClick={() => setFilter('high_subsidy')}
            className={`px-3 py-1.5 rounded-full text-label-sm font-semibold transition-all cursor-pointer ${
              filter === 'high_subsidy'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Subsidy &gt; 30%
          </button>
        </div>
      </div>

      {/* Success alert banner */}
      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-secondary-container/40 border border-secondary/40 text-secondary font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[22px]">check_circle</span>
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Scheme Cards Bento List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className={`bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
              scheme.isBestFit
                ? 'border-2 border-secondary card-shadow'
                : 'border border-outline-variant/30 card-shadow'
            }`}
          >
            {scheme.isBestFit && (
              <div className="absolute top-0 right-0 bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                {scheme.matchScore}% Match • Best Fit
              </div>
            )}

            <div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    scheme.isBestFit
                      ? 'bg-secondary-container/40 text-secondary'
                      : 'bg-surface-container-low text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {scheme.id === 'pmegp'
                      ? 'verified'
                      : scheme.id === 'mudra_kishore'
                      ? 'account_balance'
                      : 'nutrition'}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-[17px] text-primary font-bold">{scheme.name}</h3>
                  <span className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant block">
                    {scheme.ministry}
                  </span>
                </div>
              </div>

              {/* Subsidy Highlight Badge */}
              <div className="mt-4 p-3.5 bg-secondary-container/20 rounded-xl border border-secondary/20">
                <div className="text-headline-md font-headline-md font-bold text-secondary">
                  {scheme.subsidyRate}
                </div>
                <div className="text-body-sm text-on-surface text-[12px] mt-0.5 leading-relaxed">
                  {scheme.subsidyDescription}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mt-4 space-y-2 text-body-sm text-on-surface-variant text-[12px]">
                {scheme.keyBenefits.slice(0, 3).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px] flex-shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 space-y-2">
              <button
                onClick={() => handleGenerateDossier(scheme)}
                className={`w-full py-2.5 font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
                  scheme.isBestFit
                    ? 'bg-secondary hover:bg-secondary/90 text-white elevation-2'
                    : 'bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/40 text-primary'
                }`}
              >
                <span>{scheme.isBestFit ? 'Generate Pre-Filled DPR (PDF)' : 'Download Bank Dossier'}</span>
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>

              <button
                onClick={() => setSelectedSchemeForModal(scheme)}
                className="w-full text-center text-[11px] text-on-surface-variant hover:text-primary transition-colors py-1 cursor-pointer"
              >
                View Bank Checklist / आवश्यक दस्तावेज
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Document Checklist Drawer Banner */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm border border-outline-variant/30 flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">folder_special</span>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-primary font-bold">
              1-Click MSME Scheme Bundle Generator
            </div>
            <div className="text-body-sm text-on-surface-variant text-[13px]">
              Includes Udyam Registration Draft, Land Lease Affidavit format, and 3-Year Cash Flow Projections compliant with Lead Bank norms.
            </div>
          </div>
        </div>

        <button
          onClick={() => handleGenerateDossier(matchedSchemes[0])}
          className="px-5 py-3 bg-primary hover:bg-primary/90 text-white font-label-md text-label-md rounded-lg flex items-center gap-2 whitespace-nowrap elevation-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">cloud_download</span>
          <span>Download Complete Dossier (PDF)</span>
        </button>
      </div>

      {/* Checklist Details Modal */}
      {selectedSchemeForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-outline-variant/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                <h3 className="font-headline-sm text-[16px] text-primary font-bold">
                  {selectedSchemeForModal.name} Checklist
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchemeForModal(null)}
                className="text-on-surface-variant hover:text-primary p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-primary uppercase">
                Eligibility Criteria:
              </div>
              <ul className="space-y-1.5 text-body-sm text-on-surface-variant text-[12px]">
                {selectedSchemeForModal.eligibilityCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="text-[12px] font-semibold text-primary uppercase pt-2">
                Required Documents for DIC & Lead Bank:
              </div>
              <ul className="space-y-1.5 text-body-sm text-on-surface-variant text-[12px]">
                {selectedSchemeForModal.requiredDocs.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[16px]">description</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-2">
              <button
                onClick={() => setSelectedSchemeForModal(null)}
                className="px-4 py-2 border border-outline-variant/50 rounded-lg text-[13px] text-on-surface-variant hover:bg-surface-container-low"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleGenerateDossier(selectedSchemeForModal);
                  setSelectedSchemeForModal(null);
                }}
                className="px-4 py-2 bg-secondary text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download Dossier (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

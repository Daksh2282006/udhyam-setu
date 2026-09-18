import React from 'react';

export const AdminView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            Smart India Hackathon • SIH 2026 Enterprise Telemetry
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            National Grassroots Enterprise Monitoring Engine
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Real-time aggregate data across 18,400+ modeled rural micro-enterprises in Madhya Pradesh, UP & Rajasthan.
          </p>
        </div>

        <span className="px-3 py-1 bg-secondary-container text-secondary font-bold text-label-sm rounded-full flex items-center gap-1.5 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span> Live Portal Feed
        </span>
      </div>

      {/* Aggregate Impact Statistics (4-col grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Total Micro-Plans Modeled</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-2">
            42,840
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">↑ 28% from Q3 2025</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Bank Loans Facilitated</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-2">
            ₹84.2 Cr
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">Across 14 Public Sector Banks</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Average NPA Risk Mitigation</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-2">
            1.8%
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">Vs 7.4% National Rural Avg</div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Vernacular Voice Consults</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-2">
            1,24,900
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">72% Hindi • 18% Regional Dialects</div>
        </div>
      </div>

      {/* Sector Breakdown & Cluster Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sectors Structured */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Top Rural Sectors Structured
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-body-sm mb-1.5">
                <span className="font-medium text-primary">Agro & Pulse Processing Units</span>
                <span className="font-bold text-secondary">34% (14,565 Units)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-body-sm mb-1.5">
                <span className="font-medium text-primary">Rural Retail & FMCG Aggregation</span>
                <span className="font-bold text-primary">28% (11,995 Units)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-body-sm mb-1.5">
                <span className="font-medium text-primary">Textiles, Handloom & Tailoring Clusters</span>
                <span className="font-bold text-on-tertiary-container">22% (9,424 Units)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-on-tertiary-container rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-body-sm mb-1.5">
                <span className="font-medium text-primary">Dairy & Cold Chain Micro-Hubs</span>
                <span className="font-bold text-outline">16% (6,854 Units)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-outline rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Financing Banks */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Lead Financing Banks Active in Network
          </h3>
          <div className="space-y-3 text-body-sm">
            <div className="p-3.5 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">account_balance</span>
                </div>
                <div>
                  <div className="font-bold text-primary text-[14px]">State Bank of India (SBI)</div>
                  <div className="text-[11px] text-on-surface-variant">Rural Mudra & PMEGP Leader</div>
                </div>
              </div>
              <span className="font-numeric-data font-bold text-secondary text-[14px]">
                ₹34.2 Cr Disbursed
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">account_balance</span>
                </div>
                <div>
                  <div className="font-bold text-primary text-[14px]">Central Bank of India (Lead Bank MP)</div>
                  <div className="text-[11px] text-on-surface-variant">Bhopal & Sehore Mandi Clusters</div>
                </div>
              </div>
              <span className="font-numeric-data font-bold text-secondary text-[14px]">
                ₹26.8 Cr Disbursed
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">account_balance</span>
                </div>
                <div>
                  <div className="font-bold text-primary text-[14px]">Madhya Pradesh Gramin Bank</div>
                  <div className="text-[11px] text-on-surface-variant">Last-mile village branch network</div>
                </div>
              </div>
              <span className="font-numeric-data font-bold text-secondary text-[14px]">
                ₹18.4 Cr Disbursed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MarketService } from '../services/marketService';

export const MarketView: React.FC = () => {
  const { profile } = useApp();
  const [radiusKm, setRadiusKm] = useState(15);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const telemetry = MarketService.getClusterTelemetry(radiusKm, profile.location.district);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Radius Selector */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            स्थानीय बाजार विश्लेषण • Geospatial Cluster Telemetry
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Hyper-Local Market Intelligence
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Live APMC Mandi price discovery, competitor radar, and supply-demand gap in {profile.location.block} cluster.
          </p>
        </div>

        {/* Radius Pills */}
        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30 self-start md:self-auto">
          <span className="text-[12px] font-semibold text-on-surface-variant pl-2 pr-1">Radius:</span>
          {[5, 10, 15, 25].map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                radiusKm === r
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* 4 Market KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Unmet Monthly Demand</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-1">
            {telemetry.unmetDemandMt} MT
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">
            Across {radiusKm}km cluster radius
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">APMC Mandi Arrival Price</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-1">
            ₹{telemetry.mandiPricePerKg.toFixed(2)}/kg
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">
            Direct gate procurement rate
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Retail Kirana Realization</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-1">
            ₹{telemetry.retailPricePerKg.toFixed(2)}/kg
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">
            Packaged 1kg/2kg pouches
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Gross Value-Add Spread</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-1">
            +₹{telemetry.retailMarginSpread.toFixed(2)}/kg
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">
            Processing & packaging margin
          </div>
        </div>
      </div>

      {/* Interactive Map & Competitor Detail Cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map View (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Cluster Geospatial Radar ({radiusKm} KM)
            </h3>
            <span className="text-[11px] text-secondary font-semibold bg-secondary-container/40 px-2 py-0.5 rounded">
              Active Range: {radiusKm} km
            </span>
          </div>

          <div className="relative w-full h-96 bg-slate-100 rounded-xl overflow-hidden border border-outline-variant/40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-70"></div>

            {/* Simulated Radar Circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border-2 border-dashed border-secondary/30 bg-secondary/5 transition-all duration-300"
                style={{
                  width: `${Math.min(360, radiusKm * 18)}px`,
                  height: `${Math.min(360, radiusKm * 18)}px`
                }}
              ></div>
            </div>

            {/* Highway Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 40 320 Q 300 220 750 140 T 1200 60" fill="none" stroke="#CBD5E1" strokeLinecap="round" strokeWidth="12" />
              <path d="M 40 320 Q 300 220 750 140 T 1200 60" fill="none" stroke="#94A3B8" strokeDasharray="6,6" strokeWidth="2" />
              <text fill="#64748B" fontFamily="Inter" fontSize="11" fontWeight="600" x="380" y="190">
                SH-18 State Highway Corridor
              </text>
            </svg>

            {/* Pins */}
            {telemetry.pins.map((pin, i) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin.id)}
                className="absolute cursor-pointer group"
                style={{
                  top: `${40 + (i * 18)}%`,
                  left: `${25 + (i * 20)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    pin.type === 'unit'
                      ? 'bg-secondary text-white ring-4 ring-secondary/20 animate-pulse'
                      : pin.type === 'competitor'
                      ? 'bg-error text-white'
                      : pin.type === 'mandi'
                      ? 'bg-primary-container text-white'
                      : 'bg-on-tertiary-container text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {pin.type === 'unit'
                      ? 'store'
                      : pin.type === 'competitor'
                      ? 'factory'
                      : pin.type === 'mandi'
                      ? 'agriculture'
                      : 'local_convenience_store'}
                  </span>
                </div>
                <div className="absolute top-10 -left-16 bg-white px-2 py-0.5 rounded shadow text-center whitespace-nowrap text-[10px] text-on-surface border border-outline-variant/30 pointer-events-none">
                  {pin.name} ({pin.distanceKm}km)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor & Market Telemetry List (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Nearby Entities ({telemetry.pins.length})
          </h3>

          <div className="space-y-3">
            {telemetry.pins.map((pin) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedPin === pin.id
                    ? 'border-secondary bg-secondary-container/20 shadow-sm'
                    : 'border-outline-variant/30 hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-[13px]">{pin.name}</span>
                  <span className="text-[11px] font-semibold text-secondary">{pin.distanceKm} km</span>
                </div>
                <div className="text-[11px] text-on-surface-variant font-bilingual-indicator mt-0.5">
                  {pin.nameHi}
                </div>
                <p className="text-[12px] text-on-surface-variant mt-1.5 leading-relaxed">
                  {pin.details}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-secondary">
                  ✓ {pin.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Supplier Directory Note */}
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-body-sm text-[12px] text-on-surface-variant">
            <strong className="text-primary block mb-1">Certified NSIC Machinery Depots:</strong>
            Indore Industrial Area (Sanwer Road) & Dewas Cluster. 3-day doorstep delivery available for 2HP-5HP units.
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { FinancialService } from '../services/financialService';

export const SimulatorView: React.FC = () => {
  const { profile, simulatorParams, updateSimulatorParam, resetSimulator, metrics } = useApp();

  const cashFlows = FinancialService.generate12MonthCashFlow(metrics);

  // Calculate expense percentages for the horizontal bar
  const totalExp = metrics.totalMonthlyExpense || 1;
  const rawPct = Math.round((metrics.rawMaterialExpense / totalExp) * 100);
  const laborPct = Math.round((metrics.laborExpense / totalExp) * 100);
  const powerPct = Math.round((metrics.powerExpense / totalExp) * 100);
  const packPct = Math.round((metrics.packagingExpense / totalExp) * 100);
  const emiPct = Math.max(0, 100 - (rawPct + laborPct + powerPct + packPct));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
          <div>
            <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
              Fintech Stress-Testing Engine • गणितीय पूर्वानुमान
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Interactive What-If Financial Simulator
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Move the sliders below to stress-test your business against grain inflation, price cuts, and high bank interest rates.
            </p>
          </div>

          <button
            onClick={resetSimulator}
            className="px-3.5 py-2 border border-outline-variant/50 rounded-lg text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset to Baseline / पुनः सेट करें</span>
          </button>
        </div>

        {/* Simulator Interactive Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: 4 Interactive Sliders (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Slider 1: Sales Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-label-md font-label-md">
                <span className="text-primary font-semibold">Monthly Sales Volume:</span>
                <span className="text-secondary font-numeric-data font-bold">
                  {simulatorParams.salesVolume} Quintals ({simulatorParams.salesVolume >= 100 ? '+' : ''}{simulatorParams.salesVolume - 100}%)
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="150"
                step="5"
                value={simulatorParams.salesVolume}
                onChange={(e) => updateSimulatorParam('salesVolume', parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
                <span>-40% (Slow Season)</span>
                <span>100 Q (Normal)</span>
                <span>+50% (Festive Peak)</span>
              </div>
            </div>

            {/* Slider 2: Raw Material Cost */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-label-md font-label-md">
                <span className="text-primary font-semibold">Raw Pulse Purchase Price:</span>
                <span className="text-error font-numeric-data font-bold">
                  ₹{simulatorParams.rawMaterialCost.toFixed(2)} / kg
                </span>
              </div>
              <input
                type="range"
                min="65"
                max="90"
                step="1"
                value={simulatorParams.rawMaterialCost}
                onChange={(e) => updateSimulatorParam('rawMaterialCost', parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-error"
              />
              <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
                <span>₹65 (Harvest Glut)</span>
                <span>₹74 Baseline</span>
                <span>₹90 (Crop Failure)</span>
              </div>
            </div>

            {/* Slider 3: Finished Sale Price */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-label-md font-label-md">
                <span className="text-primary font-semibold">Selling Price (To Kirana Retail):</span>
                <span className="text-secondary font-numeric-data font-bold">
                  ₹{simulatorParams.sellingPrice.toFixed(2)} / kg
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="135"
                step="1"
                value={simulatorParams.sellingPrice}
                onChange={(e) => updateSimulatorParam('sellingPrice', parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
                <span>₹100 (Price War)</span>
                <span>₹118 Baseline</span>
                <span>₹135 (Premium Organic)</span>
              </div>
            </div>

            {/* Slider 4: Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-label-md font-label-md">
                <span className="text-primary font-semibold">Loan Interest Rate (%):</span>
                <span className="text-primary font-numeric-data font-bold">
                  {simulatorParams.interestRate.toFixed(1)}% ({simulatorParams.interestRate <= 9.0 ? 'Mudra/PMEGP' : 'Commercial'})
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="16"
                step="0.5"
                value={simulatorParams.interestRate}
                onChange={(e) => updateSimulatorParam('interestRate', parseFloat(e.target.value))}
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
                <span>7.0% Subsidized</span>
                <span>8.5% Mudra</span>
                <span>15.0% Private NBFC</span>
              </div>
            </div>

            {/* Stress Alert Callout */}
            <div
              className={`p-4 rounded-xl border text-body-sm flex items-start gap-3 transition-colors ${
                metrics.status === 'safe'
                  ? 'border-secondary/30 bg-secondary-container/20 text-secondary'
                  : metrics.status === 'warning'
                  ? 'border-amber-400/40 bg-amber-50 text-amber-800'
                  : 'border-error/30 bg-error-container/20 text-error'
              }`}
            >
              <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                {metrics.status === 'safe' ? 'check_circle' : 'warning'}
              </span>
              <div>
                <strong className="block font-bold">
                  {metrics.status === 'safe'
                    ? 'Viable & Bankable Margin'
                    : metrics.status === 'warning'
                    ? 'Moderate Financial Pressure'
                    : 'High Financial Stress Alert'}
                </strong>
                <p className="text-on-surface-variant text-[12px] mt-1 leading-relaxed">
                  {metrics.statusMessage}
                </p>
                <div className="mt-2 text-[11px] font-semibold">
                  Debt Service Coverage Ratio (DSCR): <strong>{metrics.dscr}x</strong> (Bank Ideal: &gt; 1.75x)
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-Time Dynamic Comparison & Chart (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Comparison Scorecard: Base vs Simulated */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                <span className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant uppercase font-semibold">
                  Baseline Plan (सामान्य स्थिति)
                </span>
                <div className="mt-2 font-display-lg-mobile text-display-lg-mobile font-bold text-primary">
                  ₹68,400
                </div>
                <div className="text-[12px] text-on-surface-variant">Net Profit / Month</div>
                <div className="mt-3 pt-2 border-t border-outline-variant/20 flex justify-between text-[12px]">
                  <span>Annual Net:</span>
                  <strong>₹8,20,800</strong>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-secondary card-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-bilingual-indicator font-bilingual-indicator text-secondary uppercase font-bold">
                    Simulated Outcome (अनुकरण)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded">
                    LIVE
                  </span>
                </div>
                <div
                  className={`mt-2 font-display-lg-mobile text-display-lg-mobile font-bold ${
                    metrics.monthlyNetProfit >= 35000 ? 'text-secondary' : 'text-error'
                  }`}
                >
                  ₹{metrics.monthlyNetProfit.toLocaleString('en-IN')}
                </div>
                <div className="text-[12px] text-on-surface-variant">
                  Net Margin: <strong>{metrics.netMarginPct}%</strong>
                </div>
                <div className="mt-3 pt-2 border-t border-outline-variant/20 flex justify-between text-[12px]">
                  <span>Simulated Annual:</span>
                  <strong className="text-primary font-numeric-data">
                    ₹{metrics.annualNetProfit.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>

            {/* Expense Breakdown Visual (CSS Bar Distribution) */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 card-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-md text-label-md text-primary font-semibold">
                  Monthly Expense Distribution (%)
                </span>
                <span className="text-[12px] text-on-surface-variant">
                  Total OpEx: ₹{metrics.totalMonthlyExpense.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Multi-segment progress bar */}
              <div className="w-full h-5 rounded-lg overflow-hidden flex bg-surface-container-high">
                <div
                  className="bg-primary hover:opacity-90 transition-all duration-300"
                  style={{ width: `${rawPct}%` }}
                  title={`Raw Material: ${rawPct}% (₹${metrics.rawMaterialExpense})`}
                ></div>
                <div
                  className="bg-secondary hover:opacity-90 transition-all duration-300"
                  style={{ width: `${laborPct}%` }}
                  title={`Labor: ${laborPct}% (₹${metrics.laborExpense})`}
                ></div>
                <div
                  className="bg-on-tertiary-container hover:opacity-90 transition-all duration-300"
                  style={{ width: `${powerPct}%` }}
                  title={`Power: ${powerPct}% (₹${metrics.powerExpense})`}
                ></div>
                <div
                  className="bg-secondary-fixed-dim hover:opacity-90 transition-all duration-300"
                  style={{ width: `${packPct}%` }}
                  title={`Packaging: ${packPct}% (₹${metrics.packagingExpense})`}
                ></div>
                <div
                  className="bg-outline hover:opacity-90 transition-all duration-300"
                  style={{ width: `${emiPct}%` }}
                  title={`Bank EMI: ${emiPct}% (₹${metrics.monthlyEmi})`}
                ></div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 text-[11px] text-on-surface-variant font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-primary"></span>
                  Raw ({rawPct}%)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-secondary"></span>
                  Labor ({laborPct}%)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-on-tertiary-container"></span>
                  Power ({powerPct}%)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-secondary-fixed-dim"></span>
                  Pack ({packPct}%)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-outline"></span>
                  EMI ({emiPct}%)
                </div>
              </div>
            </div>

            {/* 12-Month Projected Cash Flow Sparkline (SVG Chart) */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 card-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md text-primary font-semibold">
                  12-Month Projected Cash Surplus (₹ Lakhs)
                </span>
                <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-bold">
                  Post-Debt Free Cash Flow
                </span>
              </div>

              <div className="h-32 w-full flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 90">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#006c4a" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#006c4a" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  {/* Gradient Area */}
                  <polygon
                    fill="url(#chartGrad)"
                    points="0,85 30,78 70,72 110,65 150,55 190,52 230,44 270,38 310,32 350,26 390,15 390,90 0,90"
                  />
                  {/* Polyline trend */}
                  <polyline
                    fill="none"
                    points="0,85 30,78 70,72 110,65 150,55 190,52 230,44 270,38 310,32 350,26 390,15"
                    stroke="#006c4a"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  {/* Data points */}
                  <circle cx="150" cy="55" fill="#006c4a" r="4" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="390" cy="15" fill="#006c4a" r="5" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/20 font-mono">
                <span>Month 1 (Setup)</span>
                <span>Month 4 (Break-Even)</span>
                <span>Month 8 (Expansion)</span>
                <span className="text-secondary font-bold">
                  Month 12 (₹{(cashFlows[11].cumulative / 100000).toFixed(1)}L Cumul.)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { FinancialService } from '../services/financialService';

export const FinanceView: React.FC = () => {
  const { profile, metrics, simulatorParams } = useApp();

  const cashFlows = FinancialService.generate12MonthCashFlow(metrics);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            वित्तीय संरचना • Bankable DPR Financial Appraisal
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Project Capital Structuring & CMA Financial Model
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Formatted in compliance with Lead Bank credit appraisal guidelines (Central Bank of India / SBI).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-secondary-container/40 text-secondary text-[12px] font-bold border border-secondary/20">
            ✓ DSCR: {metrics.dscr}x (Bankable)
          </span>
        </div>
      </div>

      {/* 4 Core Financial Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border-t-4 border-t-primary border-x border-b border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Total Project Outlay</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-1">
            ₹{profile.finance.totalOutlay.toLocaleString('en-IN')}
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">
            ₹4.8L Machinery • ₹3.7L Working Cap
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border-t-4 border-t-secondary border-x border-b border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Monthly Net Profit</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-1">
            ₹{metrics.monthlyNetProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">
            Net Margin: {metrics.netMarginPct}% on sales
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border-t-4 border-t-primary border-x border-b border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Annual Projected Net</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-1">
            ₹{metrics.annualNetProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">
            Post-EMI Free Cash Surplus
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border-t-4 border-t-secondary border-x border-b border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Capital Subsidy Lock</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-1">
            ₹{metrics.promoterSubsidyGrant.toLocaleString('en-IN')}
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">
            35% PMEGP Non-Repayable Grant
          </div>
        </div>
      </div>

      {/* Capital Structure & Means of Finance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost of Project */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            1. Cost of Project (पूंजीगत व्यय)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm text-[13px]">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                  <th className="pb-2 font-semibold">Particulars</th>
                  <th className="pb-2 font-semibold text-right">Amount (₹)</th>
                  <th className="pb-2 font-semibold text-right">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr>
                  <td className="py-2.5">Plant & Machinery (Mini Dal Mill 2HP)</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium">₹4,80,000</td>
                  <td className="py-2.5 text-right text-on-surface-variant">56.5%</td>
                </tr>
                <tr>
                  <td className="py-2.5">Electrification & Feeder Wiring</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium">₹70,000</td>
                  <td className="py-2.5 text-right text-on-surface-variant">8.2%</td>
                </tr>
                <tr>
                  <td className="py-2.5">Shed Lease Advance & Renovation</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium">₹50,000</td>
                  <td className="py-2.5 text-right text-on-surface-variant">5.9%</td>
                </tr>
                <tr>
                  <td className="py-2.5">Working Capital Margin (Pulse Stocks)</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium">₹2,50,000</td>
                  <td className="py-2.5 text-right text-on-surface-variant">29.4%</td>
                </tr>
                <tr className="font-bold text-primary bg-surface-container-low/50">
                  <td className="py-2.5 pl-2">Total Estimated Project Outlay</td>
                  <td className="py-2.5 text-right font-numeric-data">₹{profile.finance.totalOutlay.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 text-right pr-2">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Means of Finance */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            2. Means of Finance (वित्तीय स्रोत)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm text-[13px]">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                  <th className="pb-2 font-semibold">Source of Funds</th>
                  <th className="pb-2 font-semibold text-right">Amount (₹)</th>
                  <th className="pb-2 font-semibold text-right">% Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr>
                  <td className="py-2.5">Promoter's Equity Margin</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium text-primary">
                    ₹{profile.finance.ownCapital.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 text-right text-on-surface-variant">
                    {Math.round((profile.finance.ownCapital / profile.finance.totalOutlay) * 100)}%
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5">Bank Term Loan (60 Months @ {simulatorParams.interestRate}%)</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium text-primary">
                    ₹{metrics.termLoanAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 text-right text-on-surface-variant">
                    {Math.round((metrics.termLoanAmount / profile.finance.totalOutlay) * 100)}%
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-secondary font-medium">
                    Govt Capital Subsidy (PMEGP Locked in Escrow)
                  </td>
                  <td className="py-2.5 text-right font-numeric-data font-bold text-secondary">
                    ₹{metrics.promoterSubsidyGrant.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 text-right text-secondary font-bold">35.0%</td>
                </tr>
                <tr>
                  <td className="py-2.5">Sanctioned Cash Credit (Mudra Working Capital)</td>
                  <td className="py-2.5 text-right font-numeric-data font-medium">
                    ₹{metrics.workingCapitalLoan.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 text-right text-on-surface-variant">Revolving</td>
                </tr>
                <tr className="font-bold text-primary bg-surface-container-low/50">
                  <td className="py-2.5 pl-2">Total Structured Capital</td>
                  <td className="py-2.5 text-right font-numeric-data">₹{profile.finance.totalOutlay.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 text-right pr-2">Fully Funded</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly Profitability Breakdown */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
          3. Monthly Operational Statement (मासिक आय-व्यय विवरण)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-body-sm text-[13px]">
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Gross Finished Dal Sales (76% yield @ ₹{simulatorParams.sellingPrice}/kg):</span>
              <strong className="font-numeric-data text-primary">₹{(simulatorParams.salesVolume * 76 * simulatorParams.sellingPrice).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Cattle Feed Byproduct Sales (18% yield @ ₹22/kg):</span>
              <strong className="font-numeric-data text-secondary">₹{(simulatorParams.salesVolume * 18 * 22).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between py-2 bg-secondary-container/20 px-2 rounded font-bold text-primary">
              <span>Total Monthly Revenue (Inflow):</span>
              <span className="font-numeric-data text-secondary">₹{metrics.monthlyRevenue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-2 text-body-sm text-[13px]">
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Raw Pulse Procurement (100 Q @ ₹{simulatorParams.rawMaterialCost}/kg):</span>
              <span className="font-numeric-data text-primary">₹{metrics.rawMaterialExpense.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Commercial Ag Feeder Electricity:</span>
              <span className="font-numeric-data text-primary">₹{metrics.powerExpense.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Operator & Helper Labor:</span>
              <span className="font-numeric-data text-primary">₹{metrics.laborExpense.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Bank Loan Monthly EMI (Term Loan):</span>
              <span className="font-numeric-data text-primary">₹{metrics.monthlyEmi.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-2 bg-surface-container-low px-2 rounded font-bold text-primary">
              <span>Total Monthly OpEx (Outflow):</span>
              <span className="font-numeric-data text-error">₹{metrics.totalMonthlyExpense.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { SimulatorParams, FinancialMetrics } from '../types';

export class FinancialService {
  /**
   * Calculates comprehensive, realistic financial projections
   * Based on authentic MSME banking credit appraisal models
   */
  static calculateFinancials(
    params: SimulatorParams,
    totalOutlay: number = 850000,
    ownCapital: number = 350000,
    isSpecialCategory: boolean = true // 35% PMEGP
  ): FinancialMetrics {
    const { salesVolume, rawMaterialCost, sellingPrice, interestRate } = params;

    // Pulse / Grain processing physical yield parameters:
    // 1 Quintal = 100 kg
    // Recovery: 76% finished dal, 18% chuni/bhusa cattle feed (₹22/kg), 6% milling dust/wastage
    const totalRawKg = salesVolume * 100;
    const dalKg = totalRawKg * 0.76;
    const huskKg = totalRawKg * 0.18;

    // Monthly Inflows (Revenue)
    const primaryRevenue = dalKg * sellingPrice;
    const byproductRevenue = huskKg * 22.0; // ₹22/kg standard APMC byproduct realization
    const monthlyRevenue = primaryRevenue + byproductRevenue;

    // Monthly Outflows (Operating Expenses)
    const rawMaterialExpense = totalRawKg * rawMaterialCost;
    const powerExpense = params.monthlyPowerCost ?? 11400; // MP rural agricultural feeder tariff
    const laborExpense = params.monthlyLaborCost ?? 14000; // 1 skilled milling operator + 1 helper
    const packagingExpense = dalKg * 1.80;                 // ₹1.80 per 1kg branded laminated pouch

    // Capital & Loan Structuring:
    // PMEGP Grant: 35% for rural OBC/SC/ST/Women, 25% for general
    const subsidyPct = isSpecialCategory ? 0.35 : 0.25;
    const promoterSubsidyGrant = Math.round(totalOutlay * subsidyPct);
    
    // Bank term loan portion: Total outlay - own capital - subsidy in escrow
    const termLoanAmount = Math.max(0, totalOutlay - ownCapital);
    const workingCapitalLoan = Math.round(termLoanAmount * 0.35); // 35% cash credit limit

    // Standard Bank Loan EMI (60 Months / 5 Years)
    const principal = termLoanAmount > 0 ? termLoanAmount : 552500;
    const monthlyRate = (interestRate / 12) / 100;
    const tenureMonths = 60;
    
    let monthlyEmi = 0;
    if (monthlyRate > 0) {
      monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                   (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    } else {
      monthlyEmi = principal / tenureMonths;
    }

    const totalMonthlyExpense = rawMaterialExpense + powerExpense + laborExpense + packagingExpense + monthlyEmi;
    const monthlyNetProfit = monthlyRevenue - totalMonthlyExpense;
    const annualNetProfit = monthlyNetProfit * 12;
    const netMarginPct = monthlyRevenue > 0 ? (monthlyNetProfit / monthlyRevenue) * 100 : 0;

    // Fixed vs Variable Costs for Break-Even Analysis
    const fixedCostsMonthly = powerExpense + laborExpense + monthlyEmi;
    const variableCostPerKg = rawMaterialCost + (packagingExpense / (dalKg || 1));
    const contributionMarginPerKg = sellingPrice - variableCostPerKg;

    // Break-even in finished kg and converted to Quintals
    const breakEvenKg = contributionMarginPerKg > 0 ? fixedCostsMonthly / contributionMarginPerKg : 9999;
    const breakEvenQuintals = Math.round((breakEvenKg / 0.76) / 100);
    const breakEvenMonths = monthlyNetProfit > 0 ? Number(((totalOutlay - promoterSubsidyGrant) / (monthlyNetProfit + monthlyEmi * 0.4)).toFixed(1)) : 24.0;

    // Debt Service Coverage Ratio (DSCR): (Net Profit + Depreciation + Interest) / (EMI * 12)
    const annualEmi = monthlyEmi * 12;
    const annualDepreciation = totalOutlay * 0.10; // 10% straight line machinery depreciation
    const annualInterest = principal * (interestRate / 100);
    const dscr = annualEmi > 0 ? Number(((annualNetProfit + annualDepreciation + annualInterest) / annualEmi).toFixed(2)) : 3.0;

    // Health / Stress Status
    let status: 'safe' | 'warning' | 'stressed' = 'safe';
    let statusMessage = 'Viable & Bankable Model: DSCR coverage is robust at ' + dscr + 'x. Bank credit approval probability is very high.';

    if (netMarginPct < 6 || monthlyNetProfit < 25000) {
      status = 'stressed';
      statusMessage = 'High Financial Stress: Net margin dropped below 6%. High risk of loan service default. Consider increasing retail price or procuring grain directly from FPOs.';
    } else if (netMarginPct < 12 || dscr < 1.5) {
      status = 'warning';
      statusMessage = 'Moderate Stress: Margin compressed to ' + netMarginPct.toFixed(1) + '%. DSCR is ' + dscr + 'x. Recommended to maintain a ₹2.5L cash credit buffer.';
    }

    return {
      monthlyRevenue: Math.round(monthlyRevenue),
      rawMaterialExpense: Math.round(rawMaterialExpense),
      powerExpense: Math.round(powerExpense),
      laborExpense: Math.round(laborExpense),
      packagingExpense: Math.round(packagingExpense),
      monthlyEmi: Math.round(monthlyEmi),
      totalMonthlyExpense: Math.round(totalMonthlyExpense),
      monthlyNetProfit: Math.round(monthlyNetProfit),
      annualNetProfit: Math.round(annualNetProfit),
      netMarginPct: Number(netMarginPct.toFixed(1)),
      breakEvenMonths: Math.max(1, breakEvenMonths),
      breakEvenQuintals: Math.max(10, breakEvenQuintals),
      dscr,
      promoterSubsidyGrant,
      termLoanAmount,
      workingCapitalLoan,
      status,
      statusMessage
    };
  }

  /**
   * Generates 12-month month-by-month cash accumulation curve
   */
  static generate12MonthCashFlow(metrics: FinancialMetrics): Array<{ month: string; cashSurplus: number; cumulative: number }> {
    const months = ['M1 (Setup)', 'M2 (Trial)', 'M3 (Market)', 'M4 (Break-Even)', 'M5', 'M6', 'M7', 'M8 (Expansion)', 'M9', 'M10', 'M11', 'M12'];
    let runningTotal = 0;
    
    return months.map((month, idx) => {
      // Ramp-up coefficient: Month 1 is initial setup (negative/low), reaches 100% by month 4, grows to 115% by month 12
      let ramp = 0.2;
      if (idx === 1) ramp = 0.55;
      else if (idx === 2) ramp = 0.80;
      else if (idx === 3) ramp = 1.00;
      else ramp = 1.0 + (idx - 3) * 0.02;

      const monthlySurplus = Math.round(metrics.monthlyNetProfit * ramp);
      runningTotal += monthlySurplus;

      return {
        month,
        cashSurplus: monthlySurplus,
        cumulative: runningTotal
      };
    });
  }
}

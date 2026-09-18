import { RiskItem, SimulatorParams, FinancialMetrics } from '../types';

export class RiskService {
  /**
   * Generates dynamic 5-vector risk profiling based on business assumptions and financials
   */
  static assessRisks(params: SimulatorParams, metrics: FinancialMetrics): RiskItem[] {
    // 1. Demand Risk
    const demandLevel: 'LOW' | 'MEDIUM' | 'HIGH' = params.salesVolume < 80 ? 'MEDIUM' : 'LOW';
    const demandDesc = params.salesVolume < 80
      ? 'Sales volume is below cluster baseline. May require aggressive haat-bazaar penetration.'
      : 'Pulses are a non-cyclical staple food with steady 7% local consumption growth.';

    // 2. Competition Risk
    const compLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
    const compDesc = 'Nearest competing mill is 3.8 km away. Differentiate through clean 1kg packaging and free delivery.';

    // 3. Raw Grain Price Volatility
    let rawPriceLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
    let rawPriceDesc = 'Chana prices fluctuate 15-20% post-monsoon depending on harvest yield.';
    if (params.rawMaterialCost >= 78) {
      rawPriceLevel = 'HIGH';
      rawPriceDesc = 'Raw material cost is above cluster average (₹74/kg). Significant pressure on operating gross margin.';
    } else if (params.rawMaterialCost <= 70) {
      rawPriceLevel = 'LOW';
      rawPriceDesc = 'Harvest glut keeps raw procurement prices attractive, ensuring higher retention margins.';
    }

    // 4. Liquidity & Cash Flow Risk
    let liquidityLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let liquidityDesc = 'Sufficient cash surplus exists to absorb 15-day kirana payment credit cycles.';
    if (metrics.netMarginPct < 8 || metrics.monthlyNetProfit < 35000) {
      liquidityLevel = 'HIGH';
      liquidityDesc = 'Tight operating surplus. Delay in retailer payments could impair raw pulse procurement capacity.';
    } else if (metrics.netMarginPct < 14) {
      liquidityLevel = 'MEDIUM';
      liquidityDesc = 'Maintain ₹2.5L cash credit working capital facility under Mudra Kishore.';
    }

    // 5. Compliance & Regulatory
    const compRegLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    const compRegDesc = 'Basic FSSAI Registration (Form A) and Udyam MSME certification completed in 1-2 days without complex clearances.';

    return [
      {
        id: 'risk-demand',
        name: 'Demand Stability',
        level: demandLevel,
        description: demandDesc,
        impact: 'Affects capacity utilization of 20 quintal/day plant.',
        mitigation: 'Establish advance purchase contracts with 40+ village kirana stores.'
      },
      {
        id: 'risk-competition',
        name: 'Cluster Competition',
        level: compLevel,
        description: compDesc,
        impact: 'Price-matching pressure on loose pulses.',
        mitigation: 'Provide vacuum-sealed 1kg/2kg pouches with local brand identity.'
      },
      {
        id: 'risk-raw-price',
        name: 'Raw Grain Volatility',
        level: rawPriceLevel,
        description: rawPriceDesc,
        impact: 'Every ₹2/kg raw price increase reduces monthly net profit by ~₹15,200.',
        mitigation: 'Sign seasonal forward procurement MOUs with 3 Farmer Producer Organizations (FPOs).'
      },
      {
        id: 'risk-liquidity',
        name: 'Working Capital & Liquidity',
        level: liquidityLevel,
        description: liquidityDesc,
        impact: 'May delay raw grain stockpile replenishment during harvest.',
        mitigation: 'Sanction ₹2.5L Mudra Cash Credit overdraft limit alongside term loan.'
      },
      {
        id: 'risk-compliance',
        name: 'Statutory & FSSAI',
        level: compRegLevel,
        description: compRegDesc,
        impact: 'Inspection hurdles or penalty on non-labeled bags.',
        mitigation: 'Obtain Udyam MSME certificate and state basic FSSAI license prior to commercial dispatch.'
      }
    ];
  }
}

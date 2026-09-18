export type Language = 
  | 'en' // English
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'gu' // Gujarati
  | 'mr' // Marathi
  | 'pa' // Punjabi
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'or' // Odia
  | 'as' // Assamese
  | 'ur'; // Urdu

export interface BusinessCategory {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  icon: string;
  badge: string;
  badgeHi: string;
  investmentRange: string;
  minInvestment: number;
  maxInvestment: number;
  typicalOutlay: number;
  expectedRoi: string;
  recoveryMonths: number;
  sector: string;
  defaultSalesVolume: number; // Quintals/units
  defaultRawPrice: number; // per kg or unit
  defaultSalePrice: number; // per kg or unit
}

export interface LocationProfile {
  state: string;
  district: string;
  block: string;
  village: string;
  zone: 'Rural' | 'Semi-Urban' | 'Urban';
  pincode?: string;
  latitude?: number;
  longitude?: number;
  apmcMandi: string;
  mandiDistanceKm: number;
  nearestCompetitorDistanceKm: number;
}

export interface FinancialProfile {
  ownCapital: number;
  loanRequired: number;
  totalOutlay: number;
  collateralAvailable: boolean;
  targetSubsidyScheme: string;
}

export interface SkillsProfile {
  education: string;
  experienceYears: string;
  socialCategory: 'OBC' | 'SC' | 'ST' | 'Women' | 'General';
  hasEdpTraining: boolean;
  priorDomainExp: string;
}

export interface GoalsProfile {
  targetMarket: string;
  applyPmegpSubsidy: boolean;
  procureMachinery: boolean;
  tieUpRetailers: boolean;
  seekExportLicense: boolean;
  targetTimelineMonths: number;
}

export interface EntrepreneurProfile {
  id: string;
  name: string;
  businessIdea?: string;
  businessName: string;
  phone: string;
  udyamNumber?: string;
  category: BusinessCategory;
  location: LocationProfile;
  finance: FinancialProfile;
  skills: SkillsProfile;
  goals: GoalsProfile;
  landOwnership?: string;
  targetCustomers?: string;
  createdAt: string;
}

export interface SimulatorParams {
  salesVolume: number;       // Quintals (baseline: 100)
  rawMaterialCost: number;   // ₹/kg (baseline: 74)
  sellingPrice: number;      // ₹/kg (baseline: 118)
  interestRate: number;      // % (baseline: 8.5)
  monthlyLaborCost?: number;
  monthlyPowerCost?: number;
}

export interface FinancialMetrics {
  monthlyRevenue: number;
  rawMaterialExpense: number;
  powerExpense: number;
  laborExpense: number;
  packagingExpense: number;
  monthlyEmi: number;
  totalMonthlyExpense: number;
  monthlyNetProfit: number;
  annualNetProfit: number;
  netMarginPct: number;
  breakEvenMonths: number;
  breakEvenQuintals: number;
  dscr: number;
  promoterSubsidyGrant: number;
  termLoanAmount: number;
  workingCapitalLoan: number;
  status: 'safe' | 'warning' | 'stressed';
  statusMessage: string;
}

export interface SchemeInfo {
  id: string;
  name: string;
  nameHi: string;
  ministry: string;
  tag: string;
  matchScore: number;
  isBestFit: boolean;
  subsidyRate: string;
  subsidyAmountEst: number;
  subsidyDescription: string;
  promoterShare: string;
  loanCeiling: string;
  interestRateRange: string;
  keyBenefits: string[];
  eligibilityCriteria: string[];
  requiredDocs: string[];
  applicationUrl?: string;
}

export interface RiskItem {
  id: string;
  name: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  impact: string;
  mitigation: string;
}

export interface ActionPlanTask {
  id: string;
  phaseId: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDateDay: number;
}

export interface ActionPlanPhase {
  phaseId: number;
  titleEn: string;
  titleHi: string;
  dayRange: string;
  tasks: ActionPlanTask[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

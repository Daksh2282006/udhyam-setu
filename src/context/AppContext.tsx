import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EntrepreneurProfile,
  SimulatorParams,
  FinancialMetrics,
  Language,
  ActionPlanPhase,
  ChatMessage
} from '../types';
import { BUSINESS_CATEGORIES } from '../data/categories';
import { FinancialService } from '../services/financialService';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  profile: EntrepreneurProfile;
  updateProfile: (updates: Partial<EntrepreneurProfile>) => void;
  simulatorParams: SimulatorParams;
  updateSimulatorParam: (key: keyof SimulatorParams, value: number) => void;
  resetSimulator: () => void;
  metrics: FinancialMetrics;
  actionPlan: ActionPlanPhase[];
  toggleTaskStatus: (phaseId: number, taskId: string) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  demoMode: boolean;
  setDemoMode: (mode: boolean) => void;
  resetToDemoBaseline: () => void;
  loadProfilePreset: (preset: 'komal' | 'rameshwar') => void;
}

export const DEFAULT_PROFILE: EntrepreneurProfile = {
  id: 'ent-bhopal-01',
  name: 'Rameshwar Patel',
  businessIdea: 'Mini Dal Mill & Agro Processing',
  businessName: 'Shree Ganesh Agro Dal Processing',
  phone: '+91 98260 12345',
  udyamNumber: 'UDYAM-MP-04-002891',
  category: BUSINESS_CATEGORIES[0], // Dal Mill
  location: {
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    block: 'Phanda Kalan',
    village: 'Phanda Kalan',
    zone: 'Rural',
    apmcMandi: 'Sehore APMC Mandi (14km)',
    mandiDistanceKm: 14.2,
    nearestCompetitorDistanceKm: 3.8
  },
  finance: {
    ownCapital: 350000,
    loanRequired: 500000,
    totalOutlay: 850000,
    collateralAvailable: false,
    targetSubsidyScheme: 'PMEGP 35%'
  },
  skills: {
    education: '10th Standard Passed (10वीं उत्तीर्ण)',
    experienceYears: '3+ Years in Agro Trading / Mandi',
    socialCategory: 'OBC',
    hasEdpTraining: true,
    priorDomainExp: 'Food preparation and local grain trading'
  },
  goals: {
    targetMarket: '40+ Local Kirana Stores & Village Haats',
    applyPmegpSubsidy: true,
    procureMachinery: true,
    tieUpRetailers: true,
    seekExportLicense: false,
    targetTimelineMonths: 3
  },
  landOwnership: 'owned',
  targetCustomers: 'Local Kirana Stores & Mandi',
  createdAt: '2026-09-16'
};

export const KOMAL_DAIRY_PROFILE: EntrepreneurProfile = {
  id: 'ent-betul-01',
  name: 'Komal',
  businessIdea: 'Dairy Business',
  businessName: 'Komal Dairy & Milk Collection Center',
  phone: '+91 94250 54321',
  udyamNumber: 'UDYAM-MP-08-004128',
  category: BUSINESS_CATEGORIES[1], // Dairy
  location: {
    state: 'Madhya Pradesh',
    district: 'Betul',
    block: 'Multai',
    village: 'Multai',
    zone: 'Rural',
    apmcMandi: 'Betul APMC Mandi (18km)',
    mandiDistanceKm: 18.5,
    nearestCompetitorDistanceKm: 4.2
  },
  finance: {
    ownCapital: 100000,
    loanRequired: 675000,
    totalOutlay: 1000000,
    collateralAvailable: false,
    targetSubsidyScheme: 'NABARD Dairy Entrepreneurship'
  },
  skills: {
    education: '10th Standard Passed (10वीं उत्तीर्ण)',
    experienceYears: '1-2 Years Workshop Experience',
    socialCategory: 'OBC',
    hasEdpTraining: true,
    priorDomainExp: 'Dairy cow rearing and milk collection'
  },
  goals: {
    targetMarket: 'Residential Areas Household',
    applyPmegpSubsidy: true,
    procureMachinery: true,
    tieUpRetailers: true,
    seekExportLicense: false,
    targetTimelineMonths: 6
  },
  landOwnership: 'none',
  targetCustomers: 'Residential Areas Household',
  createdAt: '2026-09-17'
};

const DEFAULT_SIMULATOR: SimulatorParams = {
  salesVolume: 100,      // 100 Quintals
  rawMaterialCost: 74,   // ₹74/kg
  sellingPrice: 118,     // ₹118/kg
  interestRate: 8.5      // 8.5%
};

const DEFAULT_ACTION_PLAN: ActionPlanPhase[] = [
  {
    phaseId: 1,
    titleEn: 'Statutory & Identity',
    titleHi: 'वैधानिक पंजीयन व स्थान चयन',
    dayRange: 'Days 1 - 15',
    tasks: [
      {
        id: 't-1',
        phaseId: 1,
        title: 'Udyam Registration on MSME portal using Aadhaar & PAN',
        description: 'Complete zero-cost registration for official MSME recognition.',
        status: 'completed',
        dueDateDay: 5
      },
      {
        id: 't-2',
        phaseId: 1,
        title: 'Execute 5-year shed lease agreement in Phanda Kalan',
        description: 'Ensure registered lease deed for bank loan compliance.',
        status: 'completed',
        dueDateDay: 10
      },
      {
        id: 't-3',
        phaseId: 1,
        title: 'Open Current Bank Account with Central Bank of India',
        description: 'Designated account for PMEGP subsidy escrow and working capital.',
        status: 'in_progress',
        dueDateDay: 15
      }
    ]
  },
  {
    phaseId: 2,
    titleEn: 'Bank DPR & Subsidy Sanction',
    titleHi: 'बैंक परियोजना रिपोर्ट एवं ऋण अनुमोदन',
    dayRange: 'Days 16 - 30',
    tasks: [
      {
        id: 't-4',
        phaseId: 2,
        title: 'Submit UdyamSetu Bank DPR to District Industries Centre (DIC Bhopal)',
        description: 'Forward pre-filled project appraisal to Lead Bank Branch Manager.',
        status: 'pending',
        dueDateDay: 20
      },
      {
        id: 't-5',
        phaseId: 2,
        title: 'Attend 10-Day RSETI/EDP Entrepreneurship Training',
        description: 'Mandatory online/offline training certification for subsidy release.',
        status: 'pending',
        dueDateDay: 28
      },
      {
        id: 't-6',
        phaseId: 2,
        title: 'Receive PMEGP Taskforce Committee Loan Sanction Letter',
        description: 'Formal bank credit appraisal sanction for ₹5.0 Lakh term loan.',
        status: 'pending',
        dueDateDay: 30
      }
    ]
  },
  {
    phaseId: 3,
    titleEn: 'Machinery & Feeder Power',
    titleHi: 'मशीनरी क्रय व विद्युत संयोजन',
    dayRange: 'Days 31 - 60',
    tasks: [
      {
        id: 't-7',
        phaseId: 3,
        title: 'Sanction 3-Phase 10HP Commercial Ag Feeder Power Connection',
        description: 'Submit application to MPPKVVCL for subsidized rural tariff meter.',
        status: 'pending',
        dueDateDay: 40
      },
      {
        id: 't-8',
        phaseId: 3,
        title: 'Procure Mini Dal Mill + Emery Roller Machine (Indore cluster)',
        description: 'Place order with verified NSIC-registered vendor with warranty.',
        status: 'pending',
        dueDateDay: 50
      },
      {
        id: 't-9',
        phaseId: 3,
        title: 'Installation, earth pit wiring, and dry trial test runs',
        description: 'Complete mechanical alignment and safety guard fitting.',
        status: 'pending',
        dueDateDay: 60
      }
    ]
  },
  {
    phaseId: 4,
    titleEn: 'FSSAI & Commercial Launch',
    titleHi: 'खाद्य सुरक्षा लाइसेंस व बाजार वितरण',
    dayRange: 'Days 61 - 90',
    tasks: [
      {
        id: 't-10',
        phaseId: 4,
        title: 'FSSAI Basic Registration & printed batch labeling compliance',
        description: 'Obtain Form A registration for packaging 1kg/2kg consumer pouches.',
        status: 'pending',
        dueDateDay: 70
      },
      {
        id: 't-11',
        phaseId: 4,
        title: 'Onboard 40+ Village Kirana Stores with 15-day sample billing',
        description: 'Supply first 50 quintals directly to retail network.',
        status: 'pending',
        dueDateDay: 80
      },
      {
        id: 't-12',
        phaseId: 4,
        title: 'Lock PMEGP Subsidy in Bank Escrow / TDR Account',
        description: 'Credit verification of ₹2,97,500 non-refundable government grant.',
        status: 'pending',
        dueDateDay: 90
      }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or use English as default
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('udyamsetu_lang') as Language) || 'en';
  });

  const [profile, setProfileState] = useState<EntrepreneurProfile>(() => {
    const saved = localStorage.getItem('udyamsetu_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [simulatorParams, setSimulatorParams] = useState<SimulatorParams>(() => {
    const saved = localStorage.getItem('udyamsetu_sim');
    return saved ? JSON.parse(saved) : DEFAULT_SIMULATOR;
  });

  const [actionPlan, setActionPlan] = useState<ActionPlanPhase[]>(() => {
    const saved = localStorage.getItem('udyamsetu_plan');
    return saved ? JSON.parse(saved) : DEFAULT_ACTION_PLAN;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'c-1',
        sender: 'assistant',
        text: 'Hello! I am your UdyamSetu AI Saarthi. How can I assist you with your business plan, machinery costs, or government subsidies today?',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('udyamsetu_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('udyamsetu_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('udyamsetu_sim', JSON.stringify(simulatorParams));
  }, [simulatorParams]);

  useEffect(() => {
    localStorage.setItem('udyamsetu_plan', JSON.stringify(actionPlan));
  }, [actionPlan]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const updateProfile = (updates: Partial<EntrepreneurProfile>) => {
    setProfileState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const updateSimulatorParam = (key: keyof SimulatorParams, value: number) => {
    setSimulatorParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSimulator = () => {
    setSimulatorParams({
      salesVolume: profile.category.defaultSalesVolume || 100,
      rawMaterialCost: profile.category.defaultRawPrice || 74,
      sellingPrice: profile.category.defaultSalePrice || 118,
      interestRate: 8.5
    });
  };

  const toggleTaskStatus = (phaseId: number, taskId: string) => {
    setActionPlan(prev =>
      prev.map(phase => {
        if (phase.phaseId !== phaseId) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map(task => {
            if (task.id !== taskId) return task;
            const nextStatus: 'pending' | 'in_progress' | 'completed' =
              task.status === 'completed'
                ? 'pending'
                : task.status === 'pending'
                ? 'in_progress'
                : 'completed';
            return { ...task, status: nextStatus };
          })
        };
      })
    );
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, newMsg]);
  };

  const resetToDemoBaseline = () => {
    setProfileState(DEFAULT_PROFILE);
    setSimulatorParams(DEFAULT_SIMULATOR);
    setActionPlan(DEFAULT_ACTION_PLAN);
  };

  const loadProfilePreset = (preset: 'komal' | 'rameshwar') => {
    if (preset === 'komal') {
      setProfileState(KOMAL_DAIRY_PROFILE);
      setSimulatorParams({
        salesVolume: 80,
        rawMaterialCost: 42,
        sellingPrice: 62,
        interestRate: 6.5
      });
    } else {
      setProfileState(DEFAULT_PROFILE);
      setSimulatorParams(DEFAULT_SIMULATOR);
    }
  };

  // Dynamically compute current financial metrics
  const isSpecialCategory = ['OBC', 'SC', 'ST', 'Women'].includes(profile.skills.socialCategory);
  const metrics = FinancialService.calculateFinancials(
    simulatorParams,
    profile.finance.totalOutlay,
    profile.finance.ownCapital,
    isSpecialCategory
  );

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        profile,
        updateProfile,
        simulatorParams,
        updateSimulatorParam,
        resetSimulator,
        metrics,
        actionPlan,
        toggleTaskStatus,
        chatHistory,
        addChatMessage,
        isAssistantOpen,
        setIsAssistantOpen,
        demoMode,
        setDemoMode,
        resetToDemoBaseline,
        loadProfilePreset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

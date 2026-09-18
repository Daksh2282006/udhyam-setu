import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { VoiceAssistantWidget } from './components/assistant/VoiceAssistantWidget';

// Views
import { LandingView } from './views/LandingView';
import { OnboardingWizardView } from './views/OnboardingWizardView';
import { ProcessingView } from './views/ProcessingView';
import { DashboardView } from './views/DashboardView';
import { RecommendationView } from './views/RecommendationView';
import { MarketView } from './views/MarketView';
import { FinanceView } from './views/FinanceView';
import { SchemesView } from './views/SchemesView';
import { RiskView } from './views/RiskView';
import { SimulatorView } from './views/SimulatorView';
import { AssistantView } from './views/AssistantView';
import { BlueprintView } from './views/BlueprintView';
import { AdminView } from './views/AdminView';
import { SettingsView } from './views/SettingsView';
import { FeasibilityReportView } from './views/FeasibilityReportView';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md antialiased selection:bg-secondary-container selection:text-on-secondary-container">
          {/* Fixed Top App Bar */}
          <Header />

          {/* Dynamic Content Canvas with safe top clearance */}
          <main className="flex-1 pt-24 md:pt-28 pb-28 md:pb-16 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingView />} />

              {/* Business Analysis Onboarding Flow */}
              <Route path="/analyze" element={<OnboardingWizardView />} />
              <Route path="/analyze/business" element={<OnboardingWizardView />} />
              <Route path="/analyze/location" element={<OnboardingWizardView />} />
              <Route path="/analyze/finance" element={<OnboardingWizardView />} />
              <Route path="/analyze/skills" element={<OnboardingWizardView />} />
              <Route path="/analyze/goals" element={<OnboardingWizardView />} />
              <Route path="/analyze/processing" element={<ProcessingView />} />

              {/* Business Feasibility Report (Agneyaa Reference Model) */}
              <Route path="/report" element={<FeasibilityReportView />} />
              <Route path="/feasibility-report" element={<FeasibilityReportView />} />
              <Route path="/dashboard/report" element={<FeasibilityReportView />} />

              {/* Main AI Business Dashboard & Modules */}
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/dashboard/recommendation" element={<RecommendationView />} />
              <Route path="/dashboard/market" element={<MarketView />} />
              <Route path="/dashboard/finance" element={<FinanceView />} />
              <Route path="/dashboard/schemes" element={<SchemesView />} />
              <Route path="/dashboard/risk" element={<RiskView />} />
              <Route path="/dashboard/simulator" element={<SimulatorView />} />
              <Route path="/dashboard/assistant" element={<AssistantView />} />
              <Route path="/dashboard/blueprint" element={<BlueprintView />} />
              <Route path="/dashboard/action-plan" element={<BlueprintView />} />

              {/* SIH Analytics / Admin */}
              <Route path="/admin" element={<AdminView />} />

              {/* User Settings */}
              <Route path="/settings" element={<SettingsView />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Persistent Mobile Bottom Navigation */}
          <MobileNav />

          {/* Floating AI Vernacular Voice Assistant */}
          <VoiceAssistantWidget />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

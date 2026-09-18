import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { VoiceAssistantWidget } from './components/assistant/VoiceAssistantWidget';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { LandingView } from './views/LandingView';
import { AuthView } from './views/AuthView';
=======
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { VoiceAssistantWidget } from './components/assistant/VoiceAssistantWidget';

// Views
import { LandingView } from './views/LandingView';
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
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
<<<<<<< HEAD
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md antialiased selection:bg-secondary-container selection:text-on-secondary-container">
            {/* Fixed Top App Bar */}
            <Header />

            {/* Dynamic Content Canvas with safe top clearance */}
            <main className="flex-1 pt-24 md:pt-28 pb-28 md:pb-16 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              <Routes>
                {/* Public / Landing Routes */}
                <Route path="/" element={<LandingView />} />
                <Route path="/login" element={<LandingView />} />
                <Route path="/signup" element={<LandingView />} />

                {/* Protected Business Analysis Flow */}
                <Route
                  path="/analyze"
                  element={
                    <ProtectedRoute>
                      <OnboardingWizardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyze/business"
                  element={
                    <ProtectedRoute>
                      <OnboardingWizardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyze/location"
                  element={
                    <ProtectedRoute>
                      <OnboardingWizardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyze/finance"
                  element={
                    <ProtectedRoute>
                      <OnboardingWizardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyze/skills"
                  element={
                    <ProtectedRoute>
                      <OnboardingWizardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyze/goals"
                  element={
                    <ProtectedRoute>
                      <OnboardingWizardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyze/processing"
                  element={
                    <ProtectedRoute>
                      <ProcessingView />
                    </ProtectedRoute>
                  }
                />

                {/* Bank-Grade Executive Business Feasibility Report */}
                <Route
                  path="/report"
                  element={
                    <ProtectedRoute>
                      <FeasibilityReportView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feasibility-report"
                  element={
                    <ProtectedRoute>
                      <FeasibilityReportView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/report"
                  element={
                    <ProtectedRoute>
                      <FeasibilityReportView />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Main AI Business Dashboard & Modules */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/recommendation"
                  element={
                    <ProtectedRoute>
                      <RecommendationView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/market"
                  element={
                    <ProtectedRoute>
                      <MarketView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/finance"
                  element={
                    <ProtectedRoute>
                      <FinanceView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/schemes"
                  element={
                    <ProtectedRoute>
                      <SchemesView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/risk"
                  element={
                    <ProtectedRoute>
                      <RiskView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/simulator"
                  element={
                    <ProtectedRoute>
                      <SimulatorView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/assistant"
                  element={
                    <ProtectedRoute>
                      <AssistantView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/blueprint"
                  element={
                    <ProtectedRoute>
                      <BlueprintView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/action-plan"
                  element={
                    <ProtectedRoute>
                      <BlueprintView />
                    </ProtectedRoute>
                  }
                />

                {/* SIH Analytics / Admin */}
                <Route path="/admin" element={<AdminView />} />

                {/* Protected User Settings */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsView />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Persistent Mobile Bottom Navigation */}
            <MobileNav />

            {/* Floating AI Vernacular Voice Assistant */}
            <VoiceAssistantWidget />

            {/* Auth Popup Modal Window */}
            <AuthModal />
          </div>
        </BrowserRouter>
      </AuthProvider>
=======
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
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
    </AppProvider>
  );
};

export default App;

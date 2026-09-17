import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, profile, updateProfile, demoMode, setDemoMode, resetToDemoBaseline } = useApp();
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow">
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          User Settings & Preferences
        </h2>
        <p className="text-body-sm text-on-surface-variant">
          Manage language, demo simulation datasets, and entrepreneur profile metadata.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-secondary-container/40 border border-secondary/40 text-secondary font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Preferences updated and saved to session!</span>
        </div>
      )}

      {/* Language Preferences */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">translate</span>
          <span>Vernacular Language Preference / भाषा चुनें</span>
        </h3>
        <p className="text-body-sm text-on-surface-variant">
          Select primary display language for navigation, scheme details, and AI Saarthi audio advisories.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { code: 'hi', name: 'हिन्दी (Hindi)' },
            { code: 'en', name: 'English (EN)' },
            { code: 'bn', name: 'বাংলা (Bengali)' },
            { code: 'ta', name: 'தமிழ் (Tamil)' },
          ].map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code as Language)}
              className={`p-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                language === lang.code
                  ? 'border-secondary bg-secondary-container/30 text-secondary font-bold shadow-xs'
                  : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Mode & Evaluator Sandbox */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">science</span>
          <span>SIH 2026 Evaluation Sandbox & Demo Mode</span>
        </h3>
        <p className="text-body-sm text-on-surface-variant">
          Enables pre-populated authentic entrepreneur telemetry for Bhopal - Sehore agro processing corridor.
        </p>

        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center justify-between">
          <div>
            <span className="font-semibold text-primary block">Active Demo Baseline:</span>
            <span className="text-body-sm text-on-surface-variant">
              Rameshwar Patel • Shree Ganesh Dal Processing • Phanda Kalan, Bhopal (M.P.)
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              resetToDemoBaseline();
              setSavedNotice(true);
              setTimeout(() => setSavedNotice(false), 3000);
            }}
            className="px-4 py-2 bg-secondary text-white rounded-lg text-label-md font-semibold hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer"
          >
            Reset Demo Baseline
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSave} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">badge</span>
          <span>Entrepreneur Profile Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-label-md font-label-md text-primary mb-1">
              Founder Name (संस्थापक का नाम)
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-label-md font-label-md text-primary mb-1">
              Enterprise Title (उद्यम का नाम)
            </label>
            <input
              type="text"
              value={profile.businessName}
              onChange={(e) => updateProfile({ businessName: e.target.value })}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-label-md font-label-md text-primary mb-1">
              Udyam Registration Number
            </label>
            <input
              type="text"
              value={profile.udyamNumber || ''}
              onChange={(e) => updateProfile({ udyamNumber: e.target.value })}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-label-md font-label-md text-primary mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => updateProfile({ phone: e.target.value })}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-label-md font-semibold active:scale-95 transition-all shadow-md cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES_LIST } from '../data/translations';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, profile, updateProfile, resetToDemoBaseline } = useApp();
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow">
        <h2 className="font-headline-md text-headline-md text-primary font-bold">
          User Settings & Preferences
        </h2>
        <p className="text-body-sm text-on-surface-variant">
          Manage language, profile data, and financial calculation preferences.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-secondary-container/40 border border-secondary/40 text-secondary font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Preferences updated and saved successfully!</span>
        </div>
      )}

      {/* Language Preferences (13 Indian Languages) */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">translate</span>
          <span>Primary Language Preference / भाषा चुनें (13 Languages)</span>
        </h3>
        <p className="text-body-sm text-on-surface-variant">
          Select primary display language for navigation, scheme details, DPR generator, and Bhashini AI voice advisories.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
          {SUPPORTED_LANGUAGES_LIST.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code as Language)}
              className={`p-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                language === lang.code
                  ? 'border-secondary bg-secondary-container/30 text-secondary font-bold shadow-xs ring-2 ring-secondary/20'
                  : 'border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <div className="font-bold text-[13px]">{lang.nativeName}</div>
              <div className="text-[11px] opacity-75">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Profile & Baseline Management */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">tune</span>
          <span>Default Financial & Cluster Baseline</span>
        </h3>
        <p className="text-body-sm text-on-surface-variant">
          Active enterprise baseline: {profile.name} • {profile.businessName} ({profile.location.block}, {profile.location.district}).
        </p>

        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-primary block">Reset Configuration:</span>
            <span className="text-body-sm text-on-surface-variant text-[12px]">
              Restore baseline financial parameters, categories, and 90-day action plan.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              resetToDemoBaseline();
              setSavedNotice(true);
              setTimeout(() => setSavedNotice(false), 3000);
            }}
            className="px-4 py-2 bg-secondary text-white rounded-xl text-label-md font-semibold hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer shadow-sm whitespace-nowrap"
          >
            Reset to Baseline
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
              Contact Phone (संपर्क सूत्र)
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => updateProfile({ phone: e.target.value })}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-label-md font-label-md text-primary mb-1">
              Pincode (पिनकोड)
            </label>
            <input
              type="text"
              value={profile.location.pincode || '462030'}
              onChange={(e) => updateProfile({ location: { ...profile.location, pincode: e.target.value } })}
              className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-label-md font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-md"
          >
            Save Changes / सुरक्षित करें
          </button>
        </div>
      </form>
    </div>
  );
};

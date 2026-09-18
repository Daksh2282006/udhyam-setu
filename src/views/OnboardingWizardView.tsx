import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BUSINESS_CATEGORIES } from '../data/categories';
import { GEOGRAPHY_DATA } from '../data/geography';
<<<<<<< HEAD
import { LocationService } from '../services/locationService';
import { GlobalMicAdvisorModal } from '../components/voice/GlobalMicAdvisorModal';

export const OnboardingWizardView: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, t } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [voiceBannerVisible, setVoiceBannerVisible] = useState(false);
  const [isMicModalOpen, setIsMicModalOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [availablePostOffices, setAvailablePostOffices] = useState<string[]>([]);
  const [searchLocalityText, setSearchLocalityText] = useState('');
  const [localityResults, setLocalityResults] = useState<any[]>([]);
  const [isSearchingLocality, setIsSearchingLocality] = useState(false);

  const selectedCategory = profile.category;
  const states = Object.keys(GEOGRAPHY_DATA);
  const currentStateData = GEOGRAPHY_DATA[profile.location.state] || {
    name: profile.location.state,
    nameHi: profile.location.state,
    districts: {
      [profile.location.district]: {
        name: profile.location.district,
        nameHi: profile.location.district,
        blocks: [profile.location.block || 'Main Block'],
        primaryMandis: ['Local APMC Mandi'],
        majorCrops: ['Regional Crops'],
        ruralZone: profile.location.zone === 'Rural' ? 'Zone A Rural' : 'Zone B Semi-Urban',
        powerTariffPerUnit: 5.00
      }
    }
  };
  const districts = Object.keys(currentStateData.districts || {});
  const currentDistrictData = currentStateData.districts?.[profile.location.district] || {
    name: profile.location.district,
    nameHi: profile.location.district,
    blocks: [profile.location.block || 'Main Block'],
    primaryMandis: ['Local APMC Mandi'],
    majorCrops: ['Regional Crops'],
    ruralZone: profile.location.zone === 'Rural' ? 'Zone A Rural' : 'Zone B Semi-Urban',
    powerTariffPerUnit: 5.00
  };
=======

export const OnboardingWizardView: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [voiceBannerVisible, setVoiceBannerVisible] = useState(false);

  const selectedCategory = profile.category;
  const states = Object.keys(GEOGRAPHY_DATA);
  const currentStateData = GEOGRAPHY_DATA[profile.location.state] || GEOGRAPHY_DATA['Madhya Pradesh'];
  const districts = Object.keys(currentStateData.districts);
  const currentDistrictData = currentStateData.districts[profile.location.district] || currentStateData.districts['Bhopal'];
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7

  // Handle Category Select
  const handleSelectCategory = (catId: string) => {
    const cat = BUSINESS_CATEGORIES.find(c => c.id === catId);
    if (cat) {
      updateProfile({
        category: cat,
        finance: {
          ...profile.finance,
          totalOutlay: cat.typicalOutlay,
          ownCapital: Math.round(cat.typicalOutlay * 0.35)
        }
      });
    }
  };

<<<<<<< HEAD
  // Search locality / colony via India Post Directory
  const handleSearchLocality = async (query: string) => {
    setSearchLocalityText(query);
    if (query.trim().length < 3) {
      setLocalityResults([]);
      return;
    }
    setIsSearchingLocality(true);
    try {
      const results = await LocationService.searchPostOfficesByQuery(query);
      setLocalityResults(results.slice(0, 8));
    } catch {
      setLocalityResults([]);
    } finally {
      setIsSearchingLocality(false);
    }
  };

  // Select a Post Office / Locality from Search Result
  const handleSelectLocalityRecord = (rec: any) => {
    updateProfile({
      location: {
        ...profile.location,
        pincode: rec.pincode,
        state: rec.state || profile.location.state,
        district: rec.district || profile.location.district,
        block: rec.block || profile.location.block,
        village: rec.name || profile.location.village
      }
    });
    setAvailablePostOffices([rec.name]);
    setLocalityResults([]);
    setSearchLocalityText('');
    setLocationSuccessMsg(`📮 चयनित डाकघर: ${rec.name} (पिनकोड: ${rec.pincode}), ${rec.district}, ${rec.state}`);
  };

  // Handle Pincode manual edit and auto-resolve
  const handlePincodeChange = async (newPin: string) => {
    const clean = newPin.trim().slice(0, 6);
    updateProfile({
      location: {
        ...profile.location,
        pincode: clean
      }
    });

    if (clean.length === 6) {
      try {
        const pinDetails = await LocationService.lookupPincode(clean);
        if (pinDetails) {
          setAvailablePostOffices(pinDetails.postOffices || []);
          updateProfile({
            location: {
              ...profile.location,
              pincode: clean,
              state: pinDetails.state || profile.location.state,
              district: pinDetails.district || profile.location.district,
              block: pinDetails.block || profile.location.block,
              village: pinDetails.postOffices[0] || profile.location.village
            }
          });
          setLocationSuccessMsg(`📮 पिनकोड सत्यापित (${clean}): ${pinDetails.district}, ${pinDetails.state} (${pinDetails.block})`);
        }
      } catch (e) {
        console.warn('Pincode lookup error:', e);
      }
    }
  };

  // GPS Auto-detect location
  const handleDetectGpsLocation = async () => {
    setIsDetectingLocation(true);
    setLocationSuccessMsg(null);
    try {
      const loc = await LocationService.getCurrentLocation();
      if (loc.accuracyMeters) {
        setGpsAccuracy(loc.accuracyMeters);
      }
      if (loc.pincode && loc.pincode.length === 6) {
        LocationService.lookupPincode(loc.pincode).then(details => {
          if (details?.postOffices) setAvailablePostOffices(details.postOffices);
        });
      }
      updateProfile({
        location: {
          ...profile.location,
          latitude: loc.latitude,
          longitude: loc.longitude,
          state: loc.state,
          district: loc.district,
          block: loc.block,
          village: loc.village,
          pincode: loc.pincode,
          zone: loc.zone,
          apmcMandi: loc.apmcMandi,
          mandiDistanceKm: loc.mandiDistanceKm,
          nearestCompetitorDistanceKm: loc.nearestCompetitorDistanceKm
        }
      });
      setLocationSuccessMsg(`📍 लोकेशन प्राप्त: ${loc.village || loc.block}, ${loc.district} (पिनकोड: ${loc.pincode}) • ${loc.zone === 'Rural' ? '🌾 ग्रामीण (35% PMEGP Subsidy)' : '🏙️ शहरी (25% PMEGP Subsidy)'}`);
    } catch (e: any) {
      console.warn(e);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Voice fill simulation
  const handleVoiceSimulate = () => {
    setIsMicModalOpen(true);
=======
  // Voice fill simulation
  const handleVoiceSimulate = () => {
    setVoiceBannerVisible(true);
    updateProfile({
      name: 'Rameshwar Patel',
      businessName: 'Shree Ganesh Agro Dal Processing',
      category: BUSINESS_CATEGORIES[0],
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
        priorDomainExp: 'Food processing & retail'
      }
    });

    setTimeout(() => {
      setCurrentStep(5);
    }, 1000);
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/analyze/processing');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const promoterEquityPct = Math.round((profile.finance.ownCapital / (profile.finance.totalOutlay || 1)) * 100);
  const loanNeeded = Math.max(0, profile.finance.totalOutlay - profile.finance.ownCapital);

  return (
    <section className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Stepper Header Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
          <div>
            <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
              व्यापार सेटअप विज़ार्ड • Step By Step Guided Onboarding
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Configure Your Enterprise Idea
            </h2>
          </div>

          <button
<<<<<<< HEAD
            onClick={() => setIsMicModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-white rounded-xl text-label-md font-bold transition-all active:scale-95 shadow-md hover:bg-secondary/90 cursor-pointer"
          >
            <span className="material-symbols-outlined text-white text-[20px]">mic</span>
            <span>Bhashini AI Voice Auto-Fill / बोलकर भरें</span>
=======
            onClick={handleVoiceSimulate}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-secondary-container/40 hover:bg-secondary-container text-on-secondary-container rounded-lg text-label-md font-label-md transition-all active:scale-95 border border-secondary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary text-[20px]">mic</span>
            <span>Auto-Fill With Voice / बोलकर भरें</span>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </button>
        </div>

        {/* Stepper Progress Ribbon */}
        <div className="grid grid-cols-5 gap-2 pt-4">
          {[
            { num: 1, label: 'Category' },
            { num: 2, label: 'Location' },
            { num: 3, label: 'Capital' },
            { num: 4, label: 'Skills' },
            { num: 5, label: 'Goal' },
          ].map(step => (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className="flex flex-col gap-1 cursor-pointer group"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  step.num <= currentStep ? 'bg-secondary' : 'bg-outline-variant/40'
                }`}
              />
              <span
                className={`text-[11px] font-semibold transition-colors ${
                  step.num === currentStep
                    ? 'text-secondary font-bold'
                    : step.num < currentStep
                    ? 'text-secondary'
                    : 'text-on-surface-variant'
                }`}
              >
                {step.num}. {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Recognition Simulated Alert */}
      {voiceBannerVisible && (
        <div className="p-4 rounded-xl bg-secondary-container/30 border border-secondary/30 flex items-start gap-3 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-secondary text-[24px]">graphic_eq</span>
          <div>
            <div className="font-label-md text-label-md text-secondary font-bold">
              Voice Recognized (हिन्दी ध्वनि समझी गई):
            </div>
            <p className="font-body-sm text-body-sm text-on-surface italic mt-0.5">
              "मुझे फंदा कलां, भोपाल में छोटी दाल मिल लगानी है। मेरे पास ₹3.5 लाख हैं और PMEGP 35% सब्सिडी का लाभ लेना है।"
            </p>
            <span className="text-[11px] text-secondary font-semibold block mt-1">
              ✓ Auto-Configured: Category=Dal Mill, Location=Phanda Kalan MP, Equity=₹3.5L, Subsidy=PMEGP 35%.
            </span>
          </div>
        </div>
      )}

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-outline-variant/30 card-shadow">
        {/* STEP 1: CATEGORY */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-semibold">Step 1 of 5</span>
                <span className="text-label-sm font-label-sm text-secondary font-bold">व्यापार चयन</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Select Business Domain / व्यापार क्षेत्र चुनें
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tailors scheme parameters and local APMC demand data specifically for your trade.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BUSINESS_CATEGORIES.map(cat => {
                const isSelected = selectedCategory.id === cat.id;
                return (
                  <label
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`relative p-4 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-secondary bg-emerald-50/40 shadow-sm'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-secondary text-white' : 'bg-surface-container-low text-primary'
                      }`}>
                        <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                      </div>
                      <div className="pr-6">
                        <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {cat.badge}
                        </span>
                        <div className="font-headline-sm text-[16px] text-primary font-semibold mt-1">
                          {cat.titleEn}
                        </div>
                        <div className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant">
                          {cat.titleHi}
                        </div>
                        <p className="text-body-sm text-on-surface-variant text-[12px] mt-1.5 leading-relaxed">
                          {cat.descEn}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-on-surface-variant block text-[10px]">Outlay</span>
                        <span className="font-numeric-data font-bold text-primary">{cat.investmentRange}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-on-surface-variant block text-[10px]">Break-Even</span>
                        <span className="font-bold text-secondary">{cat.recoveryMonths} Months</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
<<<<<<< HEAD
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-semibold">Step 2 of 5</span>
                  <span className="text-label-sm font-label-sm text-secondary font-bold">कार्यस्थल चयन</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Enterprise Location & GPS Pin / कार्यस्थल एवं पिनकोड
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Auto-detects rural/urban classification, local APMC Mandi, and PMEGP subsidy eligibility.
                </p>
              </div>

              {/* GPS One-Click Trigger */}
              <button
                onClick={handleDetectGpsLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-white rounded-xl text-[12px] font-bold shadow-md hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60"
              >
                <span className={`material-symbols-outlined text-[18px] ${isDetectingLocation ? 'animate-spin' : ''}`}>
                  {isDetectingLocation ? 'sync' : 'my_location'}
                </span>
                <span>{isDetectingLocation ? 'लोकेशन पहचानी जा रही है...' : '📍 मेरी लोकेशन पता करें (GPS Pin)'}</span>
              </button>
            </div>

            {/* GPS Success Notification */}
            {locationSuccessMsg && (
              <div className="p-3 bg-secondary-container/40 text-secondary border border-secondary/30 rounded-xl text-[12px] font-semibold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>{locationSuccessMsg}</span>
              </div>
            )}

            {/* Locality & Pincode Fast Finder Search Box */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-label-md font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">search</span>
                  <span>Direct Colony / Area / Post Office Search (कॉलोनी या क्षेत्र से तुरंत खोजें)</span>
                </label>
                <span className="text-[11px] text-secondary font-semibold">India Post Live Directory</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchLocalityText}
                  onChange={(e) => handleSearchLocality(e.target.value)}
                  placeholder="अपनी कॉलोनी, गांव, शहर या पिनकोड टाइप करें (उदा. Minal, Ayodhya Nagar, Govindpura, 462023)..."
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-body-md focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-primary placeholder:text-on-surface-variant/50"
                />
                {isSearchingLocality && (
                  <div className="absolute right-3 top-3">
                    <span className="material-symbols-outlined animate-spin text-secondary text-[20px]">sync</span>
                  </div>
                )}

                {/* Instant Search Results Dropdown */}
                {localityResults.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                    <div className="p-2 bg-secondary/10 text-[11px] font-bold text-secondary border-b border-secondary/15 flex justify-between">
                      <span>डाकघर परिणाम ({localityResults.length})</span>
                      <span>क्लिक करके चुनें</span>
                    </div>
                    {localityResults.map((rec, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectLocalityRecord(rec)}
                        className="p-3 hover:bg-secondary-container/40 cursor-pointer border-b border-outline-variant/10 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-primary text-body-sm flex items-center gap-2">
                            <span>📮 {rec.name}</span>
                            <span className="text-[11px] bg-secondary text-white px-2 py-0.5 rounded-md font-bold">
                              PIN: {rec.pincode}
                            </span>
                          </div>
                          <div className="text-[11px] text-on-surface-variant mt-0.5">
                            तालुका/ब्लॉक: {rec.block} • जिला: {rec.district} • राज्य: {rec.state}
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-secondary text-[18px]">arrow_forward_ios</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-on-surface-variant font-semibold">त्वरित खोज:</span>
                {[
                  { name: 'Minal Residency', pin: '462023' },
                  { name: 'Ayodhya Nagar', pin: '462041' },
                  { name: 'Govindpura', pin: '462023' },
                  { name: 'MP Nagar Bhopal', pin: '462011' },
                  { name: 'Phanda Kalan', pin: '462030' },
                  { name: 'Indore Main', pin: '452001' }
                ].map((chip) => (
                  <button
                    key={chip.name}
                    type="button"
                    onClick={() => handlePincodeChange(chip.pin)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-surface border border-outline-variant/40 text-primary font-medium hover:bg-secondary/10 hover:border-secondary/30 transition-all cursor-pointer"
                  >
                    📍 {chip.name} ({chip.pin})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
=======
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-semibold">Step 2 of 5</span>
                <span className="text-label-sm font-label-sm text-secondary font-bold">कार्यस्थल चयन</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Enterprise Location / कार्यस्थल का चयन
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Used to cross-reference rural population indices, mandi arrival volumes, and transport links.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5">
                  State / राज्य
                </label>
                <select
                  value={profile.location.state}
                  onChange={(e) => {
                    const newState = e.target.value;
                    const firstDist = Object.keys(GEOGRAPHY_DATA[newState]?.districts || {})[0] || 'Bhopal';
                    updateProfile({
                      location: {
                        ...profile.location,
                        state: newState,
                        district: firstDist
                      }
                    });
                  }}
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {states.map(s => (
<<<<<<< HEAD
                    <option key={s} value={s}>{s} ({GEOGRAPHY_DATA[s]?.nameHi || s})</option>
=======
                    <option key={s} value={s}>{s} ({GEOGRAPHY_DATA[s].nameHi})</option>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5">
                  District / जिला
                </label>
                <select
                  value={profile.location.district}
                  onChange={(e) => {
                    const newDist = e.target.value;
<<<<<<< HEAD
                    const firstBlock = currentStateData?.districts[newDist]?.blocks[0] || 'Phanda Kalan';
=======
                    const firstBlock = currentStateData.districts[newDist]?.blocks[0] || 'Phanda Kalan';
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
                    updateProfile({
                      location: {
                        ...profile.location,
                        district: newDist,
                        block: firstBlock
                      }
                    });
                  }}
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {districts.map(d => (
<<<<<<< HEAD
                    <option key={d} value={d}>{d} ({currentStateData?.districts[d]?.nameHi || d})</option>
=======
                    <option key={d} value={d}>{d} ({currentStateData.districts[d]?.nameHi})</option>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5">
                  Tehsil / Block (ब्लॉक)
                </label>
                <select
                  value={profile.location.block}
                  onChange={(e) => {
                    updateProfile({
                      location: {
                        ...profile.location,
                        block: e.target.value,
                        village: e.target.value
                      }
                    });
                  }}
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
<<<<<<< HEAD
                  {(currentDistrictData?.blocks || [profile.location.block || 'Phanda Kalan']).map(b => (
=======
                  {currentDistrictData.blocks.map(b => (
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
<<<<<<< HEAD

              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5 flex items-center justify-between">
                  <span>Pincode / पिनकोड</span>
                  <span className="text-[10px] text-secondary font-bold">Auto Lookup</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={profile.location.pincode || '462030'}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="उदा. 462030"
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary font-bold text-primary tracking-wider"
                />
              </div>
            </div>

            {/* Post Office Selection Dropdown (if multiple post offices in current PIN) */}
            {availablePostOffices.length > 1 && (
              <div className="p-3 bg-secondary-container/20 rounded-xl border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">local_post_office</span>
                  <span className="text-label-md text-primary font-bold">
                    डाकघर / शाखा चुनें ({availablePostOffices.length} शाखाएं उपलब्ध):
                  </span>
                </div>
                <select
                  value={profile.location.village}
                  onChange={(e) => {
                    updateProfile({
                      location: {
                        ...profile.location,
                        village: e.target.value
                      }
                    });
                  }}
                  className="bg-surface border border-secondary/40 rounded-lg px-3 py-1.5 text-body-sm font-semibold text-primary focus:ring-1 focus:ring-secondary"
                >
                  {availablePostOffices.map((po) => (
                    <option key={po} value={po}>{po}</option>
                  ))}
                </select>
              </div>
            )}

            {/* GPS Telemetry & Accuracy Card */}
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[28px]">pin_drop</span>
                <div>
                  <div className="font-label-md text-label-md text-primary font-bold flex items-center gap-2 flex-wrap">
                    <span>Location Telemetry: {profile.location.village ? `${profile.location.village}, ` : ''}{profile.location.block} ({profile.location.district}), PIN: {profile.location.pincode || '462030'}</span>
                    {gpsAccuracy !== null && (
                      <span className="text-[10px] bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-bold">
                        🎯 GPS Precision: ±{gpsAccuracy}m
                      </span>
                    )}
                  </div>
                  <div className="text-body-sm text-on-surface-variant text-[12px] mt-0.5">
                    {profile.location.zone === 'Rural' 
                      ? '🌾 ग्रामीण क्षेत्र (Rural Area): 35% PMEGP पूंजीगत अनुदान के लिए पूर्ण पात्र।' 
                      : '🏙️ शहरी क्षेत्र (Urban Area): 25% PMEGP पूंजीगत अनुदान के पात्र।'} Mandi: {profile.location.apmcMandi || currentDistrictData?.primaryMandis?.[0] || 'Local Mandi'}.
                  </div>
                </div>
              </div>
              <span className="text-secondary font-bold text-label-sm bg-secondary-container/40 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto border border-secondary/30">
                {profile.location.zone === 'Rural' ? '🌾 Zone A Rural (35% Subsidy)' : '🏙️ Zone B Urban (25% Subsidy)'}
=======
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[28px]">pin_drop</span>
                <div>
                  <div className="font-label-md text-label-md text-primary font-bold">
                    Location Telemetry Verified: {profile.location.block} ({profile.location.district})
                  </div>
                  <div className="text-body-sm text-on-surface-variant">
                    Classified as Rural Area: Qualifies for maximum 35% PMEGP subsidy tier. Mandi: {currentDistrictData.primaryMandis[0]}.
                  </div>
                </div>
              </div>
              <span className="text-secondary font-bold text-label-sm bg-secondary-container/40 px-2.5 py-1 rounded-full whitespace-nowrap">
                Zone A Rural
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CAPITAL */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-semibold">Step 3 of 5</span>
                <span className="text-label-sm font-label-sm text-secondary font-bold">पूंजी व ऋण निर्धारण</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Investment Sizing / पूंजी एवं ऋण आवश्यकता
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Determine your promoter contribution vs required institutional bank debt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                <label className="block font-label-md text-label-md text-primary mb-1">
                  Own Capital Available (स्वयं की पूंजी)
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant font-semibold">₹</span>
                  <input
                    type="number"
                    value={profile.finance.ownCapital}
                    onChange={(e) => {
                      updateProfile({
                        finance: {
                          ...profile.finance,
                          ownCapital: Number(e.target.value)
                        }
                      });
                    }}
                    className="w-full bg-white pl-8 pr-4 py-2 rounded-lg border border-outline-variant/40 font-numeric-data text-numeric-data font-bold text-primary"
                  />
                </div>
                <span className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant mt-1.5 block">
                  Promoter's equity margin ({promoterEquityPct}% of project cost)
                </span>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                <label className="block font-label-md text-label-md text-primary mb-1">
                  Total Estimated Project Outlay (कुल परियोजना लागत)
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant font-semibold">₹</span>
                  <input
                    type="number"
                    value={profile.finance.totalOutlay}
                    onChange={(e) => {
                      updateProfile({
                        finance: {
                          ...profile.finance,
                          totalOutlay: Number(e.target.value)
                        }
                      });
                    }}
                    className="w-full bg-white pl-8 pr-4 py-2 rounded-lg border border-outline-variant/40 font-numeric-data text-numeric-data font-bold text-primary"
                  />
                </div>
                <span className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant mt-1.5 block">
                  Includes machinery, shed electrification & working capital
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-secondary/30 bg-secondary-container/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-label-sm font-label-sm text-secondary font-bold">
                  Recommended Loan Route
                </span>
                <div className="font-headline-sm text-headline-sm text-primary font-bold mt-0.5">
                  Bank Term Loan Needed: ₹{loanNeeded.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="px-3 py-1 bg-secondary text-white text-label-sm font-semibold rounded-lg self-start sm:self-auto">
                PMEGP + Mudra Ideal
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: SKILLS & PROFILE */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-semibold">Step 4 of 5</span>
                <span className="text-label-sm font-label-sm text-secondary font-bold">कौशल व पृष्ठभूमि</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Founder Background / योग्यता एवं अनुभव
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Helps score bank credit appraisal and government training certifications (EDP).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5">
                  Education Qualification
                </label>
                <select
                  value={profile.skills.education}
                  onChange={(e) => {
                    updateProfile({
                      skills: {
                        ...profile.skills,
                        education: e.target.value
                      }
                    });
                  }}
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md"
                >
                  <option>10th Standard Passed (10वीं उत्तीर्ण)</option>
                  <option>12th Standard Passed</option>
                  <option>Graduate / ITI Diploma</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5">
                  Prior Experience
                </label>
                <select
                  value={profile.skills.experienceYears}
                  onChange={(e) => {
                    updateProfile({
                      skills: {
                        ...profile.skills,
                        experienceYears: e.target.value
                      }
                    });
                  }}
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md"
                >
                  <option>3+ Years in Agro Trading / Mandi</option>
                  <option>1-2 Years Workshop Experience</option>
                  <option>First Time Business Owner</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-primary mb-1.5">
                  Social Category
                </label>
                <select
                  value={profile.skills.socialCategory}
                  onChange={(e) => {
                    updateProfile({
                      skills: {
                        ...profile.skills,
                        socialCategory: e.target.value as any
                      }
                    });
                  }}
                  className="w-full bg-surface border border-outline-variant/60 rounded-lg p-2.5 text-body-md"
                >
                  <option value="OBC">OBC (35% Subsidy Tier)</option>
                  <option value="SC">SC / ST (35% Subsidy Tier)</option>
                  <option value="Women">Women Owned (35% Subsidy)</option>
                  <option value="General">General Category (25% Subsidy)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: GOALS */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-semibold">Step 5 of 5</span>
                <span className="text-label-sm font-label-sm text-secondary font-bold">अंतिम लक्ष्य</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Finalize Strategic Objectives / अंतिम लक्ष्य
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Select target outcomes to tailor the 90-day actionable roadmap.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-secondary/40 bg-secondary-container/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.goals.applyPmegpSubsidy}
                  onChange={(e) => {
                    updateProfile({
                      goals: {
                        ...profile.goals,
                        applyPmegpSubsidy: e.target.checked
                      }
                    });
                  }}
                  className="w-5 h-5 rounded text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Apply for 35% PMEGP Capital Subsidy via KVIC
                  </span>
                  <p className="text-body-sm text-on-surface-variant text-[12px]">
                    Generate pre-filled project report compliant with Lead Bank norms.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.goals.procureMachinery}
                  onChange={(e) => {
                    updateProfile({
                      goals: {
                        ...profile.goals,
                        procureMachinery: e.target.checked
                      }
                    });
                  }}
                  className="w-5 h-5 rounded text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Procure Semi-Automated 2HP Mini Dal Mill Plant
                  </span>
                  <p className="text-body-sm text-on-surface-variant text-[12px]">
                    Connect with certified machinery vendors in Indore & Dewas clusters.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-low cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.goals.tieUpRetailers}
                  onChange={(e) => {
                    updateProfile({
                      goals: {
                        ...profile.goals,
                        tieUpRetailers: e.target.checked
                      }
                    });
                  }}
                  className="w-5 h-5 rounded text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Direct Supply Onboarding with 40+ Local Kirana Stores
                  </span>
                  <p className="text-body-sm text-on-surface-variant text-[12px]">
                    Eliminate secondary middlemen to retain ₹22/kg additional value margin.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP FOOTER CONTROLS */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-outline-variant/20">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2.5 rounded-lg border border-outline-variant/50 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low disabled:opacity-40 cursor-pointer"
          >
            Previous / पीछे
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-label-md text-label-md flex items-center gap-2 elevation-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>
              {currentStep === 5 ? 'Generate AI Advisory & Feasibility / परिणाम देखें' : 'Next Step / आगे बढ़ें'}
            </span>
            <span className="material-symbols-outlined text-[18px]">
              {currentStep === 5 ? 'verified' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
<<<<<<< HEAD

      {/* Bhashini AI Multilingual Voice Advisor Modal */}
      <GlobalMicAdvisorModal
        isOpen={isMicModalOpen}
        onClose={() => setIsMicModalOpen(false)}
      />
=======
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
    </section>
  );
};

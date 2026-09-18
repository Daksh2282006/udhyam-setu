import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    login,
    signup,
    loginDemo,
    signInWithGoogle,
    isLoading
  } = useAuth();
  const { profile, updateProfile } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [enterpriseName, setEnterpriseName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(authModalMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('कृपया ईमेल और पासवर्ड दोनों दर्ज करें। / Please enter both email and password.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMessage('कृपया अपना पूरा नाम दर्ज करें। / Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('पासवर्ड कम से कम 6 अक्षरों का होना चाहिए। / Password must be at least 6 characters.');
        return;
      }

      const res = await signup(email.trim(), password, {
        full_name: fullName.trim(),
        enterprise_name: enterpriseName.trim() || 'My MSME Unit',
        phone: phone.trim()
      });

      if (res.success) {
        updateProfile({
          name: fullName.trim(),
          businessName: enterpriseName.trim() || profile.businessName,
          phone: phone.trim() || profile.phone
        });
        setSuccessMessage('🎉 खाता सफलतापूर्वक बनाया गया! नेविगेट किया जा रहा है...');
        setTimeout(() => {
          closeAuthModal();
          navigate('/analyze');
        }, 600);
      } else {
        setErrorMessage(res.error || 'पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।');
      }
    } else {
      // Login
      const res = await login(email.trim(), password);
      if (res.success) {
        setSuccessMessage('✓ सफलतापूर्वक लॉगिन हुआ!');
        setTimeout(() => {
          closeAuthModal();
          navigate('/dashboard');
        }, 500);
      } else {
        setErrorMessage(res.error || 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।');
      }
    }
  };

  const handleDemoLogin = () => {
    loginDemo('Ramesh Patel', 'ramesh.patel@udhyamsetu.in');
    updateProfile({
      name: 'Ramesh Patel',
      businessName: 'Shree Ganesh Dal Mill',
      phone: '+91 98765 43210'
    });
    closeAuthModal();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Popup Window */}
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header with Close Button */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/40 border border-secondary/30 text-secondary text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Supabase Secure Auth</span>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="px-6 pb-6 pt-1 overflow-y-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              {mode === 'login' ? 'उद्यमी लॉगिन / Sign In' : 'नया उद्यमी खाता / Register'}
            </h2>
            <p className="text-[12px] text-on-surface-variant">
              {mode === 'login'
                ? 'अपने सहेजे गए बिजनेस प्रोजेक्ट और वित्तीय योजनाओं तक पहुंचें।'
                : 'PMEGP सब्सिडी, AI एडवाइजरी और विश्लेषण के लिए रजिस्टर करें।'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                openAuthModal('login');
                setErrorMessage(null);
              }}
              className={`py-1.5 text-label-md font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              साइन इन (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                openAuthModal('signup');
                setErrorMessage(null);
              }}
              className={`py-1.5 text-label-md font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              नया खाता (Sign Up)
            </button>
          </div>

          {/* 1-Click Google OAuth Direct Button */}
          <button
            type="button"
            onClick={async () => {
              try {
                await signInWithGoogle();
              } catch (e: any) {
                setErrorMessage(e.message || 'Google Sign-In failed');
              }
            }}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-[13px] transition-all cursor-pointer flex items-center justify-center gap-3 shadow-xs hover:shadow-sm active:scale-[0.98]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {mode === 'login'
                ? 'Google से जारी रखें (Continue with Google)'
                : 'Google से नया खाता बनाएं (Sign up with Google)'}
            </span>
          </button>

          <div className="relative flex py-0.5 items-center">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-3 text-on-surface-variant text-[10px] font-semibold uppercase">या ईमेल व पासवर्ड द्वारा</span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="p-3 bg-error/10 border border-error/30 text-error rounded-xl text-[12px] font-semibold flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-[12px] font-semibold flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-label-md text-primary font-bold mb-1 text-[12px]">
                    Full Name / उद्यमी का नाम *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant/60 text-[18px]">
                      person
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="उदा. रमेश पटेल"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl pl-9 pr-3 py-2 text-[13px] focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-label-md text-primary font-bold mb-1 text-[12px]">
                    Proposed Enterprise / व्यवसाय का नाम
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant/60 text-[18px]">
                      storefront
                    </span>
                    <input
                      type="text"
                      value={enterpriseName}
                      onChange={(e) => setEnterpriseName(e.target.value)}
                      placeholder="उदा. श्री गणेश दाल मिल उद्योग"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl pl-9 pr-3 py-2 text-[13px] focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-label-md text-primary font-bold mb-1 text-[12px]">
                    Phone Number / मोबाइल नंबर
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant/60 text-[18px]">
                      phone
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl pl-9 pr-3 py-2 text-[13px] focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-primary"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-label-md text-primary font-bold mb-1 text-[12px]">
                Email Address / ईमेल आईडी *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant/60 text-[18px]">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl pl-9 pr-3 py-2 text-[13px] focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-label-md text-primary font-bold text-[12px]">
                  Password / पासवर्ड *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('पासवर्ड रीसेट लिंक आपके ईमेल पर भेजा जाएगा।')}
                    className="text-[10px] text-secondary font-semibold hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant/60 text-[18px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl pl-9 pr-9 py-2 text-[13px] focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-on-surface-variant/70 hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-secondary focus:ring-secondary border-outline-variant/60"
                />
                <span className="text-[11.5px] text-on-surface-variant font-medium">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-secondary text-white rounded-xl font-bold text-label-md shadow-md hover:bg-secondary/90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  <span>प्रमाणित किया जा रहा है...</span>
                </>
              ) : mode === 'login' ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">login</span>
                  <span>साइन इन करें (Sign In)</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">person_add</span>
                  <span>खाता बनाएं एवं जारी रखें (Register)</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Evaluator Login */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 bg-surface-container-low hover:bg-surface-container-high text-primary border border-outline-variant/40 rounded-xl font-bold text-[12px] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span>
              <span>1-Click Evaluator / Demo Login (अतिथि लॉगिन)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

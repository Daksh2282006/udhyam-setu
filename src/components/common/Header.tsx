import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { language, setLanguage, setIsAssistantOpen, isAssistantOpen, t } = useApp();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/analyze', label: t('wizard') },
    { path: '/report', label: 'Feasibility Report' },
    { path: '/dashboard', label: t('dashboard') },
    { path: '/dashboard/market', label: t('market') },
    { path: '/dashboard/simulator', label: t('simulator') },
    { path: '/dashboard/schemes', label: t('schemes') },
    { path: '/dashboard/blueprint', label: t('blueprint') },
    { path: '/admin', label: t('admin') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'उद्यमी (Entrepreneur)';

  return (
    <>
      <header className="no-print fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant/30 px-3 sm:px-5 lg:px-8 h-16 transition-all duration-200 shadow-xs">
        <div className="w-full max-w-[1600px] mx-auto h-full flex items-center justify-between gap-3 lg:gap-6 flex-nowrap">
          {/* Left Cluster: Brand & Left-Shifted Navigation Bar */}
          <div className="flex items-center gap-3 lg:gap-5 min-w-0">
            {/* Brand & Identity */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                alt="UdyamSetu Official Brandmark"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg border border-outline-variant/30 p-0.5 bg-surface-container-lowest shadow-xs group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WgqPPEaYCbNn58_GTBXOpfNvkzv-0nDF4ureN9yxnrYXa9EdmD6ZUrBDNHIf88hlsE3uwdxPds6QhPVCduTz-wYXS1CJ3QzO--PwS68JFa-FOk8AEYDEBNDvRR8fCvPtSmOcq8dldA9ssKZPtMOeiqo165hLJAwnYegdzJ50dwV7EAY8DLfFCnRMmjpZ-2l7aOGaMXRt8iALq9uf2QxGHUmMFeqiLC-dNdp49uoUPITufIoUyCAv2ydw7r"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-[15px] sm:text-[17px] text-primary font-bold tracking-tight whitespace-nowrap">
                    {t('appName')}
                  </span>
                  <span className="hidden 2xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container/40 text-secondary border border-secondary/20 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[11px]">verified</span> {t('msmeAligned')}
                  </span>
                </div>
                <span className="hidden sm:inline text-[11px] text-on-surface-variant font-bilingual-indicator whitespace-nowrap">
                  {t('appSubtitle')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Tabs (Left Shifted next to brand) */}
            <nav className="hidden lg:flex items-center gap-0.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 shrink-0 flex-nowrap">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium whitespace-nowrap transition-all duration-150 ${
                      active
                        ? 'font-bold text-primary bg-surface-container-lowest shadow-xs'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Utility Cluster */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {/* Language Selector Dropdown (13 Indian Languages) */}
            <div className="relative shrink-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-[12px] font-bold bg-surface-container-low text-primary border border-outline-variant/40 rounded-xl py-1.5 pl-2.5 pr-7 focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer appearance-none h-9"
                id="langSelect"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="bn">বাংলা (BN)</option>
                <option value="gu">ગુજરાતી (GU)</option>
                <option value="mr">मराठी (MR)</option>
                <option value="pa">ਪੰਜਾਬੀ (PA)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="te">తెలుగు (TE)</option>
                <option value="kn">ಕನ್ನಡ (KN)</option>
                <option value="ml">മലയാളം (ML)</option>
                <option value="or">ଓଡ଼ିଆ (OR)</option>
                <option value="as">অসমীয়া (AS)</option>
                <option value="ur">اردو (UR)</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2.5 text-[15px] text-on-surface-variant">
                translate
              </span>
            </div>

            {/* User Auth Status / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="h-9 px-2 sm:px-2.5 rounded-xl bg-secondary-container/30 hover:bg-secondary-container/50 border border-secondary/30 flex items-center gap-1.5 text-[12px] font-bold text-primary active:scale-95 transition-all cursor-pointer"
                  title={displayName}
                >
                  <div className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[80px] truncate">{displayName}</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    arrow_drop_down
                  </span>
                </button>

                {/* Click Outside Overlay */}
                {userMenuOpen && (
                  <div
                    className="fixed inset-0 z-40 bg-black/5"
                    onClick={() => setUserMenuOpen(false)}
                  />
                )}

                {/* Dropdown Menu - Safely positioned within viewport */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 max-w-[calc(100vw-1.5rem)] bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 origin-top-right">
                    <div className="px-3.5 py-2 border-b border-outline-variant/20 bg-surface-container-low/50 rounded-t-xl">
                      <div className="font-bold text-[12px] text-primary truncate">{displayName}</div>
                      <div className="text-[10px] text-on-surface-variant truncate">{user?.email}</div>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-semibold text-primary hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">settings</span>
                      <span>{t('settings')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-semibold text-error hover:bg-error/10 cursor-pointer transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="h-9 px-3.5 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-[12px] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                <span>{t('login')}</span>
              </button>
            )}

            {/* Clearly Visible Settings Button */}
            <button
              onClick={() => navigate('/settings')}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low hover:bg-surface-container text-primary border border-outline-variant/40 transition-all active:scale-95 shadow-xs shrink-0 cursor-pointer"
              title={t('settings')}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </button>

            {/* Mobile / Tablet Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low hover:bg-surface-container text-primary border border-outline-variant/40 transition-colors active:scale-95 shrink-0"
              title="Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Slide-down Menu for Screens < 1024px */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full z-40 bg-surface-container-lowest border-b border-outline-variant/30 shadow-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-[12px] text-center font-medium transition-colors ${
                    active
                      ? 'bg-secondary-container/40 text-secondary font-bold'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { language, setLanguage, setIsAssistantOpen, isAssistantOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home / मुख्य' },
    { path: '/analyze', label: 'Wizard / सेटअप' },
    { path: '/dashboard', label: 'Dashboard / परामर्श' },
    { path: '/dashboard/market', label: 'Market / बाजार' },
    { path: '/dashboard/simulator', label: 'Simulator / सिमुलेटर' },
    { path: '/dashboard/schemes', label: 'Schemes / योजनाएं' },
    { path: '/dashboard/blueprint', label: '90-Day Plan / रोडमैप' },
    { path: '/admin', label: 'SIH Analytics' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant/30 px-3 sm:px-6 lg:px-8 h-16 transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-2 lg:gap-4 flex-nowrap">
          {/* Brand & Identity Cluster */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              alt="UdyamSetu Official Brandmark"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-lg border border-outline-variant/30 p-0.5 bg-surface-container-lowest shadow-xs group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WgqPPEaYCbNn58_GTBXOpfNvkzv-0nDF4ureN9yxnrYXa9EdmD6ZUrBDNHIf88hlsE3uwdxPds6QhPVCduTz-wYXS1CJ3QzO--PwS68JFa-FOk8AEYDEBNDvRR8fCvPtSmOcq8dldA9ssKZPtMOeiqo165hLJAwnYegdzJ50dwV7EAY8DLfFCnRMmjpZ-2l7aOGaMXRt8iALq9uf2QxGHUmMFeqiLC-dNdp49uoUPITufIoUyCAv2ydw7r"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-[15px] sm:text-[17px] text-primary font-bold tracking-tight whitespace-nowrap">
                  UdyamSetu | उद्यमसेतु
                </span>
                <span className="hidden 2xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container/40 text-secondary border border-secondary/20 whitespace-nowrap">
                  <span className="material-symbols-outlined text-[11px]">verified</span> MSME Aligned
                </span>
              </div>
              <span className="hidden sm:inline text-[11px] text-on-surface-variant font-bilingual-indicator whitespace-nowrap">
                From Business Idea to Business Blueprint • भारत सरकार मान्यता प्राप्त
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Tabs (Hidden on small laptops/tablets, visible on large screens) */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 shrink-0 flex-nowrap">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] whitespace-nowrap transition-all duration-150 ${
                    active
                      ? 'font-bold text-primary bg-surface-container-lowest shadow-xs'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Utility Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Voice Quick Trigger */}
            <button
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-tertiary-fixed/40 hover:bg-tertiary-fixed text-tertiary border border-on-tertiary-container/30 rounded-lg text-[12px] font-medium active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              title="Voice Assistant"
            >
              <span className="material-symbols-outlined text-secondary text-[16px]">mic</span>
              <span>बोलकर पूछें</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative shrink-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-[12px] font-medium bg-surface-container-low text-primary border border-outline-variant/40 rounded-lg py-1 pl-2 pr-6 focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer appearance-none"
                id="langSelect"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="bn">বাংলা (BN)</option>
                <option value="ta">தமிழ் (TA)</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-1.5 top-1.5 text-[14px] text-on-surface-variant">
                translate
              </span>
            </div>

            {/* Settings Shortcut */}
            <button
              onClick={() => navigate('/settings')}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-primary transition-colors active:scale-95 shrink-0"
              title="Settings"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
            </button>

            {/* Mobile / Tablet Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-primary transition-colors active:scale-95 shrink-0"
              title="Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Slide-down Menu for Screens < 1280px */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-16 left-0 w-full z-40 bg-surface-container-lowest border-b border-outline-variant/30 shadow-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200">
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

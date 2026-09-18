import React from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { t } = useApp();

  const items = [
    { path: '/', label: t('home'), icon: 'home' },
    { path: '/analyze', label: t('wizard'), icon: 'add_circle' },
    { path: '/dashboard', label: t('dashboard'), icon: 'dashboard' },
    { path: '/dashboard/simulator', label: t('simulator'), icon: 'calculate' },
    { path: '/dashboard/schemes', label: t('schemes'), icon: 'verified' },
=======

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { path: '/', label: 'मुख्य', icon: 'home' },
    { path: '/analyze', label: 'सेटअप', icon: 'add_circle' },
    { path: '/dashboard', label: 'डैशबोर्ड', icon: 'dashboard' },
    { path: '/dashboard/simulator', label: 'सिमुलेटर', icon: 'calculate' },
    { path: '/dashboard/schemes', label: 'योजनाएं', icon: 'verified' },
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
<<<<<<< HEAD
    <nav className="no-print md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant/30 shadow-[0px_-2px_8px_rgba(10,37,64,0.04)] px-2 py-1.5 flex justify-around items-center">
=======
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant/30 shadow-[0px_-2px_8px_rgba(10,37,64,0.04)] px-2 py-1.5 flex justify-around items-center">
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center px-2 py-1 transition-colors ${
              active
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                active ? 'fill-1 text-secondary' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

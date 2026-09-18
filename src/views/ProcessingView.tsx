import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProcessingView: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useApp();
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { title: 'Analyzing business profile...', titleHi: 'व्यापारिक प्रोफ़ाइल विश्लेषण...' },
    { title: 'Checking local APMC market signals & mandi arrivals...', titleHi: 'स्थानीय मंडी व आवक डेटा सत्यापन...' },
    { title: 'Structuring financial assumptions & debt coverage (DSCR)...', titleHi: 'वित्तीय व्यवहार्यता व ऋण संरचना...' },
    { title: 'Matching relevant central & MP state schemes (PMEGP)...', titleHi: 'सरकारी अनुदान व योजना मिलान...' },
    { title: 'Generating bank-ready Detailed Project Report (DPR)...', titleHi: 'बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट तैयार...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/report');
          }, 600);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [navigate, stages.length]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 card-shadow text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Animated Processing Icon */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-surface-container-high border-t-secondary animate-spin"></div>
          <span className="material-symbols-outlined text-secondary text-[36px]">psychology</span>
        </div>

        <div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Synthesizing Business Intelligence
          </h2>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Analyzing {profile.category.titleEn} for {profile.location.block}, {profile.location.district}
          </p>
        </div>

        {/* Dynamic Progress Pipeline */}
        <div className="space-y-3 text-left">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStage;
            const isCurrent = idx === currentStage;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-secondary-container/20 border border-secondary/30 scale-[1.02]'
                    : isCompleted
                    ? 'text-secondary'
                    : 'text-on-surface-variant/50'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      check_circle
                    </span>
                  ) : isCurrent ? (
                    <span className="w-5 h-5 rounded-full border-2 border-secondary border-t-transparent animate-spin inline-block"></span>
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-outline-variant/50 inline-block"></span>
                  )}
                </div>
                <div className="text-[13px]">
                  <div className={`font-semibold ${isCurrent ? 'text-primary' : ''}`}>
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-on-surface-variant/70 font-bilingual-indicator">
                    {stage.titleHi}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-secondary h-full transition-all duration-500 rounded-full"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

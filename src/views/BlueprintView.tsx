import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AssistantService } from '../services/assistantService';
import { ReportService } from '../services/reportService';
import { CENTRAL_STATE_SCHEMES } from '../data/schemes';

export const BlueprintView: React.FC = () => {
  const { profile, metrics, actionPlan, toggleTaskStatus } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const totalTasks = actionPlan.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = actionPlan.reduce(
    (acc, p) => acc + p.tasks.filter(t => t.status === 'completed').length,
    0
  );
  const progressPct = Math.round((completedTasks / (totalTasks || 1)) * 100);

  const handleListenAudio = () => {
    if (isPlayingAudio) {
      AssistantService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const script = `नमस्कार ${profile.name} जी! आपकी 90 दिवसीय ${profile.category.titleHi} कार्ययोजना का सारांश प्रस्तुत है। 
पहले 15 दिनों में उद्यम पंजीयन एवं लीज एग्रीमेंट पूर्ण करें। 
दिन 16 से 30 में UdyamSetu का बैंक डीपीआर जिला उद्योग केंद्र भोपाल और लीड बैंक में जमा करें। 
दिन 31 से 60 में 3-फेज विद्युत कनेक्शन एवं इंदौर क्लस्टर से मशीनरी क्रय कर स्थापित करें। 
और दिन 61 से 90 में FSSAI लाइसेंस प्राप्त कर 40 किराना दुकानों को आपूर्ति शुरू करें। 
आपका अनुमानित शुद्ध लाभ ₹${metrics.monthlyNetProfit.toLocaleString('en-IN')} प्रति माह होगा।`;
      AssistantService.speak(script, 'hi-IN');
      setTimeout(() => setIsPlayingAudio(false), 24000);
    }
  };

  const handleExportPDF = () => {
    const leadScheme = CENTRAL_STATE_SCHEMES[0];
    ReportService.generateDPRPdf(profile, metrics, leadScheme);
  };

  const handleShareWithBank = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Blueprint Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            90-Day Execution Playbook • 90 दिन की कार्ययोजना
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            From Setup to First Commercial Invoice
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Time-boxed operational milestones ensuring your unit reaches positive cash flow without delays.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleListenAudio}
            className={`px-4 py-2 rounded-lg border font-label-md text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-secondary text-white border-secondary animate-pulse'
                : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/40 text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlayingAudio ? 'stop_circle' : 'volume_up'}
            </span>
            <span>{isPlayingAudio ? 'Stop Audio / रोकें' : 'Listen Audio Brief (Hindi)'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-label-md text-label-md flex items-center gap-1.5 elevation-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Export Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Bar */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow space-y-2">
        <div className="flex items-center justify-between text-body-sm">
          <span className="font-semibold text-primary">
            Execution Progress: {completedTasks} of {totalTasks} Milestones Achieved
          </span>
          <span className="font-numeric-data font-bold text-secondary">{progressPct}% Completed</span>
        </div>
        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
          <div
            className="bg-secondary h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>

      {/* Toast Notification */}
      {shareToast && (
        <div className="p-4 rounded-xl bg-secondary-container/40 border border-secondary/40 text-secondary font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[22px]">verified</span>
          <span>
            Shared bankable DPR summary with Central Bank of India (Phanda Kalan Branch Manager) via WhatsApp & SMS.
          </span>
        </div>
      )}

      {/* 4 Timeline Phases Accordion / Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actionPlan.map((phase) => {
          const phaseCompleted = phase.tasks.filter(t => t.status === 'completed').length;
          const phasePct = Math.round((phaseCompleted / phase.tasks.length) * 100);
          const isPhaseDone = phasePct === 100;

          return (
            <div
              key={phase.phaseId}
              className={`bg-surface-container-lowest p-5 rounded-2xl border-x border-b border-outline-variant/30 card-shadow space-y-4 flex flex-col justify-between ${
                isPhaseDone ? 'border-t-4 border-t-secondary' : 'border-t-4 border-t-primary'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isPhaseDone
                        ? 'text-secondary bg-secondary-container/40'
                        : 'text-primary bg-surface-container-high'
                    }`}
                  >
                    PHASE {phase.phaseId}
                  </span>
                  <span className="text-[11px] font-semibold text-on-surface-variant font-mono">
                    {phase.dayRange}
                  </span>
                </div>

                <h3 className="font-headline-sm text-[16px] text-primary font-bold mt-2">
                  {phase.titleEn}
                </h3>
                <span className="text-bilingual-indicator font-bilingual-indicator text-on-surface-variant block mb-3">
                  {phase.titleHi}
                </span>

                <div className="space-y-3 text-body-sm">
                  {phase.tasks.map((task) => {
                    const isDone = task.status === 'completed';
                    return (
                      <label
                        key={task.id}
                        className="flex items-start gap-2.5 cursor-pointer select-none group"
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTaskStatus(phase.phaseId, task.id)}
                          className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                        />
                        <span
                          className={`text-[13px] leading-snug transition-colors ${
                            isDone ? 'line-through text-on-surface-variant/70' : 'text-on-surface'
                          }`}
                        >
                          {task.title}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-bilingual-indicator font-bilingual-indicator">
                <span className={isPhaseDone ? 'text-secondary font-bold' : 'text-on-surface-variant'}>
                  Status: {phasePct}% Complete
                </span>
                <span className="text-[10px] text-on-surface-variant font-mono">
                  {phaseCompleted}/{phase.tasks.length} Done
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[26px]">verified</span>
          <span className="text-body-sm text-on-surface">
            Directly share this structured roadmap with your Lead Bank Manager via WhatsApp or Email.
          </span>
        </div>

        <button
          onClick={handleShareWithBank}
          className="px-4 py-2 bg-secondary text-white rounded-lg text-label-md font-semibold flex items-center gap-1.5 active:scale-95 hover:bg-secondary/90 transition-all cursor-pointer whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span>Share with Bank Manager</span>
        </button>
      </div>
    </div>
  );
};

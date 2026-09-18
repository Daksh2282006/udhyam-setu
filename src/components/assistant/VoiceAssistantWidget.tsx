import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { AssistantService } from '../../services/assistantService';
import { GlobalMicAdvisorModal } from '../voice/GlobalMicAdvisorModal';

export const VoiceAssistantWidget: React.FC = () => {
  const { profile, metrics, chatHistory, addChatMessage, isAssistantOpen, setIsAssistantOpen, t } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (isAssistantOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isAssistantOpen]);

  // Web Speech API recognition setup
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please type your query.');
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Hindi recognition with English fallback
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setSpeechError(null);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Automatically submit recognized query
        handleSendQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError(`Voice input error: ${event.error}`);
          setTimeout(() => setSpeechError(null), 3000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      setSpeechError('Could not start voice recognition.');
    }
  };

  const handleSendQuery = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // 1. Add user message
    addChatMessage({
      sender: 'user',
      text: query
    });

    setInputText('');

    // 2. Generate assistant response
    setTimeout(() => {
      const response = AssistantService.generateResponse(query, profile, metrics);
      addChatMessage({
        sender: 'assistant',
        text: response
      });

      // Optional voice audio read-out
      AssistantService.speak(response, 'hi-IN');
    }, 400);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendQuery(prompt);
  };

  return (
    <aside className="no-print fixed bottom-16 md:bottom-6 right-4 md:right-8 z-50">
      <div className="relative">
        {/* Expanded Voice Assistant Dialog Card */}
        {isAssistantOpen && (
          <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl border border-outline-variant/40 shadow-2xl p-5 space-y-4 elevation-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary font-bold">
                    Udyam Saarthi / सारथी
                  </div>
                  <span className="text-[10px] text-on-surface-variant">
                    Multilingual Micro-Business AI Assistant
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="px-2 py-1 rounded-lg bg-secondary-container/40 hover:bg-secondary-container text-secondary text-[11px] font-bold flex items-center gap-1 transition-colors"
                  title="Full Voice Mode (Bhashini AI)"
                >
                  <span className="material-symbols-outlined text-[16px]">mic</span>
                  <span>Voice Mode</span>
                </button>
                <button
                  onClick={() => {
                    AssistantService.stopSpeaking();
                    setIsAssistantOpen(false);
                  }}
                  className="text-on-surface-variant hover:text-primary p-1 rounded-lg hover:bg-surface-container-low transition-colors"
                  title="Close"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Speech error toast */}
            {speechError && (
              <div className="p-2 text-[11px] bg-error-container text-error rounded-lg">
                {speechError}
              </div>
            )}

            {/* Chat History */}
            <div className="space-y-3 text-body-sm max-h-60 overflow-y-auto custom-scroll pr-1">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl text-body-sm ${
                    msg.sender === 'assistant'
                      ? 'bg-surface-container-low rounded-tl-none border border-outline-variant/20'
                      : 'bg-secondary-container/30 rounded-tr-none border border-secondary/20 ml-6'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[11px] font-bold ${
                        msg.sender === 'assistant' ? 'text-secondary' : 'text-primary'
                      }`}
                    >
                      {msg.sender === 'assistant' ? 'AI Saarthi (सारथी):' : 'You (आप):'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{msg.timestamp}</span>
                  </div>
                  <p className="text-on-surface text-[13px] leading-relaxed">{msg.text}</p>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => AssistantService.speak(msg.text, 'hi-IN')}
                      className="mt-2 text-[11px] text-secondary font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[14px]">volume_up</span>
                      सुनें (Listen Audio)
                    </button>
                  )}
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Vernacular Prompts */}
            <div className="space-y-1.5 pt-2 border-t border-outline-variant/20">
              <div className="text-[11px] font-semibold text-on-surface-variant">
                Quick Voice Prompts (पूछें):
              </div>
              <button
                onClick={() => handlePromptClick('क्या मुझे फंदा कलां दाल मिल के लिए 35% PMEGP सब्सिडी मिल सकती है?')}
                className="w-full text-left px-2.5 py-1.5 bg-surface rounded-lg hover:bg-surface-container-low text-[12px] text-primary flex items-center justify-between transition-colors"
              >
                <span>"35% PMEGP सब्सिडी कैसे प्राप्त करें?"</span>
                <span className="material-symbols-outlined text-[14px] text-secondary">play_arrow</span>
              </button>
              <button
                onClick={() => handlePromptClick('इंदौर क्लस्टर से मिनी दाल मिल मशीनरी की लागत क्या होगी?')}
                className="w-full text-left px-2.5 py-1.5 bg-surface rounded-lg hover:bg-surface-container-low text-[12px] text-primary flex items-center justify-between transition-colors"
              >
                <span>"इंदौर से दाल मिल मशीनरी की कीमत क्या है?"</span>
                <span className="material-symbols-outlined text-[14px] text-secondary">play_arrow</span>
              </button>
              <button
                onClick={() => handlePromptClick('मासिक शुद्ध लाभ और ब्रेक-इवन अवधि क्या है?')}
                className="w-full text-left px-2.5 py-1.5 bg-surface rounded-lg hover:bg-surface-container-low text-[12px] text-primary flex items-center justify-between transition-colors"
              >
                <span>"मासिक शुद्ध लाभ और लागत वसूली कब होगी?"</span>
                <span className="material-symbols-outlined text-[14px] text-secondary">play_arrow</span>
              </button>
            </div>

            {/* Voice Input Action Row */}
            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
                  placeholder={isListening ? 'Listening (सुन रहे हैं...)' : 'Type or ask in Hindi/English...'}
                  className={`w-full text-[13px] bg-surface border rounded-lg px-3 py-2 pr-8 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all ${
                    isListening ? 'border-secondary ring-2 ring-secondary/20 animate-pulse' : 'border-outline-variant/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`absolute right-2 top-2 text-[18px] transition-colors ${
                    isListening ? 'text-secondary animate-ping' : 'text-on-surface-variant hover:text-secondary'
                  }`}
                  title="Speak via Microphone"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isListening ? 'graphic_eq' : 'mic'}
                  </span>
                </button>
              </div>

              <button
                onClick={() => handleSendQuery()}
                className="p-2 bg-secondary text-white rounded-lg active:scale-95 hover:bg-secondary/90 transition-all"
                title="Send Message"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-full elevation-3 shadow-xl active:scale-95 transition-all group cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed"></span>
          </span>
          <span className="material-symbols-outlined text-[24px]">mic</span>
          <span className="font-label-md text-label-md font-bold pr-1">{t('askSaarthi')}</span>
        </button>
      </div>

      {/* Bhashini Multilingual Voice Advisor Modal */}
      <GlobalMicAdvisorModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </aside>
  );
};

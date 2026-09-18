import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AssistantService } from '../services/assistantService';

export const AssistantView: React.FC = () => {
  const { profile, metrics, chatHistory, addChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = (text?: string) => {
    const q = (text || inputText).trim();
    if (!q) return;

    addChatMessage({ sender: 'user', text: q });
    setInputText('');

    setTimeout(() => {
      const resp = AssistantService.generateResponse(q, profile, metrics);
      addChatMessage({ sender: 'assistant', text: resp });
      AssistantService.speak(resp, 'hi-IN');
    }, 400);
  };

  const handleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice('Voice input is not supported in this browser. Please type below.');
      setTimeout(() => setVoiceNotice(null), 3000);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'hi-IN';
      rec.interimResults = false;
      setIsListening(true);

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setIsListening(false);
        handleSend(text);
      };

      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      rec.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[28px]">support_agent</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Ask UdyamSetu (एआई सारथी)
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Continuous vernacular advisory for {profile.businessName} • Phanda Kalan cluster
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-label-sm font-semibold text-secondary">Online & Active</span>
        </div>
      </div>

      {voiceNotice && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-body-sm rounded-xl">
          {voiceNotice}
        </div>
      )}

      {/* Main Chat Box */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 card-shadow p-6 flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll">
          {chatHistory.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-body-sm ${
                  m.sender === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-surface-container-low text-on-surface border border-outline-variant/20 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1 text-[11px] opacity-80">
                  <span className="font-bold">
                    {m.sender === 'user' ? 'You (आप)' : 'AI Saarthi (सारथी)'}
                  </span>
                  <span>{m.timestamp}</span>
                </div>
                <p className="text-[13.5px] leading-relaxed whitespace-pre-line">{m.text}</p>
                {m.sender === 'assistant' && (
                  <button
                    onClick={() => AssistantService.speak(m.text, 'hi-IN')}
                    className="mt-2.5 text-[11px] text-secondary font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">volume_up</span>
                    सुनें (Listen Audio)
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Chips */}
        <div className="pt-3 pb-2 border-t border-outline-variant/20 flex flex-wrap gap-2">
          {[
            '35% PMEGP सब्सिडी कैसे मिलेगी?',
            'दाल मिल मशीनरी की लागत इंदौर में क्या है?',
            'मासिक शुद्ध लाभ और ब्रेक-इवन कब होगा?',
            'कच्चे चने के भाव का जोखिम कैसे रोकें?'
          ].map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              className="text-[11px] bg-surface-container-low hover:bg-surface-container-high text-primary px-3 py-1 rounded-full border border-outline-variant/30 transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-2 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? 'Listening via Microphone (सुन रहे हैं...)' : 'Type your question in Hindi or English...'}
              className={`w-full bg-surface border rounded-xl px-4 py-3 text-body-md pr-10 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all ${
                isListening ? 'border-secondary ring-2 ring-secondary/30 animate-pulse' : 'border-outline-variant/50'
              }`}
            />
            <button
              onClick={handleVoice}
              className={`absolute right-3 top-3 transition-colors ${
                isListening ? 'text-secondary animate-ping' : 'text-on-surface-variant hover:text-secondary'
              }`}
              title="Speak with Voice"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isListening ? 'graphic_eq' : 'mic'}
              </span>
            </button>
          </div>

          <button
            onClick={() => handleSend()}
            className="px-5 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-label-md flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

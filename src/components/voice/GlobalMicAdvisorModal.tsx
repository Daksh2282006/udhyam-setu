import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BhashiniClientService, VoiceAdvisoryResponse } from '../../services/bhashiniService';
import { SUPPORTED_LANGUAGES_LIST } from '../../data/translations';
import { Language } from '../../types';
import { BUSINESS_CATEGORIES } from '../../data/categories';

interface GlobalMicAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCALIZED_QUICK_PROMPTS: Record<Language, Array<{ text: string; label: string }>> = {
  en: [
    { text: 'I have ₹3 Lakh capital and want to start a Dal Mill. What govt subsidies are available?', label: 'Dal Mill & 35% PMEGP Subsidy' },
    { text: 'What is the setup cost and bank loan requirement for a mini spice processing unit?', label: 'Spices Unit & Bank Loan' },
    { text: 'What is the estimated monthly profit and break-even timeline for a rural retail mart?', label: 'Rural Retail & Profit Forecast' }
  ],
  hi: [
    { text: 'मेरे पास ₹3 लाख हैं और मुझे दाल मिल लगानी है। कौन सी सरकारी सब्सिडी मिलेगी?', label: 'दाल मिल & 35% PMEGP सब्सिडी' },
    { text: 'मिनी मसाला पिसाई इकाई शुरू करने का कुल खर्च और बैंक लोन बताएं।', label: 'मसाला उद्योग & बैंक लोन' },
    { text: 'ग्रामीण किराना सुपरमार्ट शुरू करने पर मुझे प्रति माह कितना शुद्ध मुनाफा हो सकता है?', label: 'ग्रामीण किराना & अनुमानित मुनाफा' }
  ],
  bn: [
    { text: 'আমার কাছে ৩ লক্ষ টাকা আছে এবং আমি একটি ডাল মিল শুরু করতে চাই। কী কী সরকারি অনুদান পাব?', label: 'ডাল মিল ও ৩৫% PMEGP অনুদান' },
    { text: 'একটি মশলা প্রক্রিয়াকরণ ইউনিট শুরু করতে মোট কত খরচ এবং ব্যাঙ্ক ঋণ লাগবে?', label: 'মশলা ইউনিট ও ব্যাঙ্ক ঋণ' },
    { text: 'একটি গ্রামীণ সুপারমার্ট শুরু করলে মাসিক কত নিট লাভ হতে পারে?', label: 'গ্রামীণ রিটেল ও আনুমানিক লাভ' }
  ],
  gu: [
    { text: 'મારી પાસે ₹3 લાખ છે અને મારે દાળ મિલ શરૂ કરવી છે. મને કઈ સરકારી સબસિડી મળશે?', label: 'દાળ મિલ અને 35% PMEGP સબસિડી' },
    { text: 'મિની મસાલા યુનિટ શરૂ કરવા માટે કુલ ખર્ચ અને બેંક લોનની વિગત આપો.', label: 'મસાલા ઉદ્યોગ અને બેંક લોન' },
    { text: 'ગ્રામીણ કરિયાણા સુપરમાર્ટમાં માસિક કેટલો નફો થઈ શકે?', label: 'કરિયાણા સ્ટોર અને નફાનું અનુમાન' }
  ],
  mr: [
    { text: 'माझ्याकडे ₹३ लाख आहेत आणि मला डाळ मिल सुरू करायची आहे. मला कोणते शासकीय अनुदान मिळेल?', label: 'डाळ मिल आणि ३५% PMEGP अनुदान' },
    { text: 'मसाला प्रक्रिया युनिट सुरू करण्यासाठी एकूण खर्च व बँक कर्ज किती लागेल?', label: 'मसाला उद्योग आणि बँक कर्ज' },
    { text: 'ग्रामीण किराणा मार्ट सुरू केल्यास मासिक किती नफा मिळू शकेल?', label: 'ग्रामीण किराणा आणि नफा अंदाज' }
  ],
  pa: [
    { text: 'ਮੇਰੇ ਕੋਲ ₹3 ਲੱਖ ਹਨ ਅਤੇ ਮੈਂ ਦਾਲ ਮਿੱਲ ਲਗਾਉਣਾ ਚਾਹੁੰਦਾ ਹਾਂ। ਕਿਹੜੀ ਸਰਕਾਰੀ ਸਬਸਿਡੀ ਮਿਲੇਗੀ?', label: 'ਦਾਲ ਮਿੱਲ ਅਤੇ 35% PMEGP ਸਬਸਿਡੀ' },
    { text: 'ਮਸਾਲਾ ਯੂਨਿਟ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕੁੱਲ ਖਰਚਾ ਅਤੇ ਬੈਂਕ ਕਰਜ਼ਾ ਕਿੰਨਾ ਹੋਵੇਗਾ?', label: 'ਮਸਾਲਾ ਉਦਯੋਗ ਅਤੇ ਬੈਂਕ ਕਰਜ਼ਾ' },
    { text: 'ਪੇਂਡੂ ਸੁਪਰਮਾਰਟ ਸ਼ੁਰੂ ਕਰਨ ਤੇ ਮਹੀਨਾਵਾਰ ਕਿੰਨਾ ਮੁਨਾਫਾ ਹੋ ਸਕਦਾ ਹੈ?', label: 'ਪੇਂਡੂ ਰਿਟੇਲ ਅਤੇ ਅੰਦਾਜ਼ਨ ਮੁਨਾਫਾ' }
  ],
  ta: [
    { text: 'என்னிடம் ₹3 லட்சம் உள்ளது, நான் பருப்பு ஆலை தொடங்க விரும்புகிறேன். என்ன அரசு மானியம் கிடைக்கும்?', label: 'பருப்பு ஆலை & 35% PMEGP மானியம்' },
    { text: 'மசாலா பதப்படுத்தும் பிரிவை தொடங்க மொத்த செலவு மற்றும் வங்கி கடன் எவ்வளவு?', label: 'மசாலா தொழில் & வங்கி கடன்' },
    { text: 'கிராமப்புற பல்பொருள் அங்காடி தொடங்கினால் மாத நிகர லாபம் எவ்வளவு கிடைக்கும்?', label: 'கிராமப்புற சில்லறை & லாப கணிப்பு' }
  ],
  te: [
    { text: 'నా వద్ద ₹3 లక్షలు ఉన్నాయి, నేను పప్పుల మిల్లు ప్రారంభించాలనుకుంటున్నాను. ఏ సబ్సిడీ లభిస్తుంది?', label: 'పప్పుల మిల్లు & 35% PMEGP సబ్సిడీ' },
    { text: 'మసాలా తయారీ యూనిట్ ఏర్పాటుకు మొత్తం ఖర్చు మరియు బ్యాంకు రుణం ఎంత?', label: 'మసాలా యూనిట్ & బ్యాంకు రుణం' },
    { text: 'గ్రామీణ కిరాణా సూపర్ మార్ట్ ప్రారంభించడం ద్వారా నెలవారీ ఎంత నికర లాభం పొందవచ్చు?', label: 'గ్రామీణ రిటైల్ & లాభ అంచనా' }
  ],
  kn: [
    { text: 'ನನ್ನ ಬಳಿ ₹3 ಲಕ್ಷ ಬಂಡವಾಳವಿದೆ, ಬೇಳೆ ಗಿರಣಿ ಆರಂಭಿಸಲು ಬಯಸುತ್ತೇನೆ. ಯಾವ ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಲಭ್ಯವಿದೆ?', label: 'ಬೇಳೆ ಗಿರಣಿ & 35% PMEGP ಸಬ್ಸಿಡಿ' },
    { text: 'ಮಸಾಲೆ ಪುಡಿ ಮಾಡುವ ಘಟಕ ಸ್ಥಾಪಿಸಲು ಒಟ್ಟು ವೆಚ್ಚ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸಾಲ ಎಷ್ಟು ಬೇಕಾಗುತ್ತದೆ?', label: 'ಮಸಾಲೆ ಘಟಕ & ಬ್ಯಾಂಕ್ ಸಾಲ' },
    { text: 'ಗ್ರಾಮೀಣ ಸೂಪರ್‌ಮಾರ್ಟ್ ಆರಂಭಿಸಿದರೆ ಮಾಸಿಕ ಎಷ್ಟು ನಿವ್ವಳ ಲಾಭ ಪಡೆಯಬಹುದು?', label: 'ಗ್ರಾಮೀಣ ಚಿಲ್ಲರೆ & ಲಾಭದ ಅಂದಾಜು' }
  ],
  ml: [
    { text: 'എന്റെ കൈവശം ₹3 ലക്ഷം രൂപയുണ്ട്, ഒരു ധാന്യ സംസ്കരണ യൂണിറ്റ് തുടങ്ങാൻ എന്തെല്ലാം സബ്‌സിഡി ലഭിക്കും?', label: 'ധാന്യ മിൽ & 35% PMEGP സബ്‌സിഡി' },
    { text: 'ഒരു ചെറുകിട സുഗന്ധവ്യഞ്ജന യൂണിറ്റ് ആരംഭിക്കാൻ ആവശ്യമായ ചെലവും ബാങ്ക് വായ്പയും എത്രയാണ്?', label: 'മസാല യൂണിറ്റ് & ബാങ്ക് വായ്പ' },
    { text: 'ഒരു ഗ്രാമീണ സൂപ്പർമാർട്ട് ആരംഭിച്ചാൽ പ്രതിമാസം എത്ര ലാഭം ലഭിക്കും?', label: 'റീട്ടെയിൽ & ലാഭ പ്രവചനം' }
  ],
  or: [
    { text: 'ମୋ ପାଖରେ ₹୩ ଲକ୍ଷ ପୁଞ୍ଜି ଅଛି ଏବଂ ମୁଁ ଡାଲି ମିଲ୍ ଆରମ୍ଭ କରିବାକୁ ଚାହୁଁଛି। କେଉଁ ସରକାରୀ ସବସିଡି ମିଳିବ?', label: 'ଡାଲି ମିଲ୍ & ୩୫% PMEGP ସବସିଡି' },
    { text: 'ମସଲା ୟୁନିଟ୍ ପ୍ରତିଷ୍ଠା ପାଇଁ ମୋଟ ଖର୍ଚ୍ଚ ଏବଂ ବ୍ୟାଙ୍କ ଋଣ କେତେ ଆବଶ୍ୟକ?', label: 'ମସଲା ଉଦ୍ୟୋଗ & ବ୍ୟାଙ୍କ ଋଣ' },
    { text: 'ଗ୍ରାମୀଣ ଷ୍ଟୋର୍ ଆରମ୍ଭ କଲେ ମାସିକ କେତେ ଲାଭ ହୋଇପାରିବ?', label: 'ଗ୍ରାମୀଣ ରିଟେଲ୍ & ଲାଭ ଆକଳନ' }
  ],
  as: [
    { text: 'মোৰ হাতত ৩ লাখ টকা আছে আৰু মই এটা ডাইল মিল আৰম্ভ কৰিব বিচাৰোঁ। কি চৰকাৰী চাবচিডি পাম?', label: 'ডাইল মিল আৰু ৩৫% PMEGP চাবচিডি' },
    { text: 'মচলা প্ৰক্ৰিয়াকৰণ গোটৰ বাবে মুঠ খৰচ আৰু বেংক ঋণ কিমান লাগিব?', label: 'মচলা উদ্যোগ আৰু বেংক ঋণ' },
    { text: 'গ্ৰাম্য ছুপাৰমাৰ্ট আৰম্ভ কৰিলে মাহিলী কিমান লাভ হ’ব পাৰে?', label: 'গ্ৰাম্য ৰিটেইল আৰু আনুমানিক লাভ' }
  ],
  ur: [
    { text: 'میرے پاس ۳ لاکھ روپے ہیں اور مجھے دال مل لگانی ہے۔ کون سی سرکاری سبسڈی ملے گی؟', label: 'دال مل اور ۳۵٪ PMEGP سبسڈی' },
    { text: 'مصالحہ پروسیسنگ یونٹ شروع کرنے کا کل خرچ اور بینک لون بتائیں۔', label: 'مصالحہ یونٹ اور بینک لون' },
    { text: 'دیہی سپرمارٹ شروع کرنے پر ماہانہ کتنا منافع ہو سکتا ہے؟', label: 'دیہی ریٹیل اور متوقع منافع' }
  ]
};

export const GlobalMicAdvisorModal: React.FC<GlobalMicAdvisorModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, updateProfile, profile, t } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [advisoryResult, setAdvisoryResult] = useState<VoiceAdvisoryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const quickPrompts = LOCALIZED_QUICK_PROMPTS[language] || LOCALIZED_QUICK_PROMPTS['en'];

  const handleStartMic = async () => {
    setErrorMsg(null);
    const started = await BhashiniClientService.startRecording();
    if (started) {
      setIsRecording(true);
    } else {
      setErrorMsg('Microphone permission required. You can also select a quick prompt below or type your query.');
    }
  };

  const handleStopMic = async () => {
    setIsRecording(false);
    setIsProcessing(true);
    try {
      const audioB64 = await BhashiniClientService.stopRecording();
      const response = await BhashiniClientService.getVoiceAdvisory(audioB64, undefined, language);
      setAdvisoryResult(response);
      setQueryText(response.user_transcript);
      
      // Auto play audio response
      setIsPlayingAudio(true);
      BhashiniClientService.playAudio(response.audio_base64, response.advisory_text, language);
    } catch (err: any) {
      setErrorMsg('Voice processing error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunTextQuery = async (customQuery?: string) => {
    const textToSubmit = customQuery || queryText;
    if (!textToSubmit.trim()) return;

    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const response = await BhashiniClientService.getVoiceAdvisory(undefined, textToSubmit, language);
      setAdvisoryResult(response);
      setQueryText(textToSubmit);
      
      setIsPlayingAudio(true);
      BhashiniClientService.playAudio(response.audio_base64, response.advisory_text, language);
    } catch (err) {
      setErrorMsg('Unable to fetch advice. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyToWizard = () => {
    if (!advisoryResult) return;
    updateProfile({
      finance: {
        ...profile.finance,
        ownCapital: advisoryResult.extracted_profile.own_capital,
        totalOutlay: advisoryResult.extracted_profile.total_outlay,
        loanRequired: advisoryResult.financial_summary.loan_amount
      }
    });
    onClose();
  };

  const handleTogglePlayAudio = () => {
    if (isPlayingAudio) {
      BhashiniClientService.stopAudio();
      setIsPlayingAudio(false);
    } else if (advisoryResult) {
      setIsPlayingAudio(true);
      BhashiniClientService.playAudio(advisoryResult.audio_base64, advisoryResult.advisory_text, language);
    }
  };

  if (!isOpen) return null;

  const currentLangObj = SUPPORTED_LANGUAGES_LIST.find(l => l.code === language) || SUPPORTED_LANGUAGES_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-surface-container-lowest rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-primary to-primary-container text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px] text-white">mic</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-headline-sm font-bold tracking-tight">
                  {t('micModalTitle')}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/80 text-white uppercase tracking-wider">
                  Bhashini 13-Lang ASR/NMT
                </span>
              </div>
              <p className="text-[12px] text-white/80">
                {t('micModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              BhashiniClientService.stopAudio();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scroll flex-1">
          
          {/* Language Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">translate</span>
              <span className="text-[12px] font-bold text-primary">
                {currentLangObj.nativeName} ({currentLangObj.name})
              </span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-[12px] font-bold bg-white dark:bg-surface-container text-primary border border-outline-variant/40 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-secondary cursor-pointer shadow-xs"
            >
              {SUPPORTED_LANGUAGES_LIST.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Voice Mic Central Action */}
          <div className="flex flex-col items-center justify-center p-6 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 text-center space-y-4">
            
            {/* Animated Mic Button */}
            <div className="relative">
              {isRecording && (
                <div className="absolute -inset-4 rounded-full bg-secondary/20 animate-ping"></div>
              )}
              <button
                onClick={isRecording ? handleStopMic : handleStartMic}
                disabled={isProcessing}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white scale-110 ring-4 ring-red-300'
                    : 'bg-secondary hover:bg-secondary/90 text-white hover:scale-105 ring-4 ring-secondary/20'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
                title={isRecording ? 'Click to Stop Recording' : 'Click to Speak'}
              >
                <span className="material-symbols-outlined text-[36px]">
                  {isRecording ? 'stop' : (isProcessing ? 'hourglass_top' : 'mic')}
                </span>
              </button>
            </div>

            {/* Status indicators */}
            <div>
              <div className="text-headline-sm font-bold text-primary">
                {isRecording ? (
                  <span className="text-red-500 flex items-center justify-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                    {t('speakNow')} ({currentLangObj.nativeName})
                  </span>
                ) : isProcessing ? (
                  <span className="text-secondary flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                    {t('processingVoice')}
                  </span>
                ) : (
                  <span>{t('pressToSpeak')}</span>
                )}
              </div>
              <p className="text-[12px] text-on-surface-variant mt-1">
                {isRecording
                  ? 'Click the red button when you finish speaking'
                  : t('micModalSubtitle')}
              </p>
            </div>

            {/* Error Message Toast */}
            {errorMsg && (
              <div className="px-4 py-2 bg-error-container text-error rounded-xl text-[12px] font-medium">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Text input alternative */}
          <div className="flex gap-2">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunTextQuery()}
              placeholder={`Ask in ${currentLangObj.nativeName} / English...`}
              className="flex-1 text-[13px] bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-secondary outline-none"
            />
            <button
              onClick={() => handleRunTextQuery()}
              disabled={isProcessing}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-[12px] font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>{t('getAdvice')}</span>
            </button>
          </div>

          {/* Quick Voice Prompt Chips */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              {t('quickPromptsLabel')}:
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunTextQuery(qp.text)}
                  className="text-left px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-primary rounded-xl text-[12px] border border-outline-variant/30 flex items-center gap-2 transition-all hover:border-secondary/50 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-secondary">play_circle</span>
                  <span className="font-medium">{qp.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advisory Response Box */}
          {advisoryResult && (
            <div className="p-5 bg-gradient-to-br from-secondary-container/20 to-surface-container-low rounded-2xl border border-secondary/30 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-secondary/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">smart_toy</span>
                  <span className="font-bold text-[14px] text-primary">
                    AI Saarthi Advisory ({currentLangObj.nativeName})
                  </span>
                </div>
                <button
                  onClick={handleTogglePlayAudio}
                  className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-white rounded-lg text-[11px] font-bold hover:bg-secondary/90 transition-all cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isPlayingAudio ? 'pause' : 'volume_up'}
                  </span>
                  <span>{isPlayingAudio ? 'Pause' : t('listenBrief')}</span>
                </button>
              </div>

              {/* Spoken Advice Text */}
              <p className="text-[13px] text-on-surface leading-relaxed font-medium">
                {advisoryResult.advisory_text}
              </p>

              {/* Financial Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-white dark:bg-surface-container p-2.5 rounded-xl border border-outline-variant/20">
                  <div className="text-[10px] text-on-surface-variant font-medium">{t('totalOutlay')}</div>
                  <div className="text-[13px] font-bold text-primary">
                    ₹{advisoryResult.financial_summary.total_outlay.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-container p-2.5 rounded-xl border border-outline-variant/20">
                  <div className="text-[10px] text-on-surface-variant font-medium">Own Capital</div>
                  <div className="text-[13px] font-bold text-secondary">
                    ₹{advisoryResult.financial_summary.own_capital.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-container p-2.5 rounded-xl border border-outline-variant/20">
                  <div className="text-[10px] text-on-surface-variant font-medium">Term Loan</div>
                  <div className="text-[13px] font-bold text-primary">
                    ₹{advisoryResult.financial_summary.loan_amount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-container p-2.5 rounded-xl border border-outline-variant/20">
                  <div className="text-[10px] text-on-surface-variant font-medium">{t('subsidyBenefit')}</div>
                  <div className="text-[13px] font-bold text-emerald-600">
                    ₹{advisoryResult.financial_summary.subsidy_amount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={handleApplyToWizard}
                  className="px-4 py-2 bg-secondary text-white rounded-xl text-[12px] font-bold hover:bg-secondary/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{t('applyToWizard')}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

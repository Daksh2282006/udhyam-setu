import { EntrepreneurProfile, FinancialMetrics } from '../types';

export class AssistantService {
  /**
   * Generates contextual, bilingual responses based on entrepreneur's active profile
   */
  static generateResponse(query: string, profile: EntrepreneurProfile, metrics: FinancialMetrics): string {
    const q = query.toLowerCase();

    // 1. Subsidy / PMEGP inquiries
    if (q.includes('subsidy') || q.includes('सब्सिडी') || q.includes('pmegp') || q.includes('अनुदान')) {
      const isRural = profile.location.zone === 'Rural';
      const subsidyPct = isRural ? '35%' : '25%';
      return `हाँ ${profile.name} जी! आपकी इकाई ${profile.location.block} (${profile.location.district}) में स्थित है जो कि ग्रामीण क्षेत्र (Rural Zone) में आती है। PMEGP योजना के तहत आप ${subsidyPct} पूंजीगत अनुदान (लगभग ₹${metrics.promoterSubsidyGrant.toLocaleString('en-IN')}) के पात्र हैं। यह राशि 3 वर्ष के लिए बैंक में सावधि जमा (TDR) के रूप में रखी जाती है और ब्याज-मुक्त रहती है।`;
    }

    // 2. Machinery / Equipment inquiries
    if (q.includes('machine') || q.includes('मशीन') || q.includes('indore') || q.includes('इंदौर') || q.includes('cost')) {
      return `इंदौर और देवास क्लस्टर में 2HP से 5HP क्षमता की सेमी-ऑटोमैटिक मिनी दाल मिल मशीनरी ₹4.20 लाख से ₹5.80 लाख के बीच उपलब्ध है। इसमें रोलर डिहस्कर, ग्रेडर व डस्ट कलेक्टर शामिल हैं। आप उद्योग निदेशालय (DIC) द्वारा अधिकृत एनएसआईसी (NSIC) वेंडर से ही कोटेशन प्राप्त करें ताकि बैंक ऋण में कोई रुकावट न आए।`;
    }

    // 3. Profit / Income inquiries
    if (q.includes('profit') || q.includes('मुनाफा') || q.includes('लाभ') || q.includes('कमाई') || q.includes('income')) {
      return `वर्तमान वित्तीय संरचना में 100 क्विंटल मासिक प्रसंस्करण पर आपका अनुमानित शुद्ध लाभ ₹${metrics.monthlyNetProfit.toLocaleString('en-IN')} प्रति माह (लगभग ₹${metrics.annualNetProfit.toLocaleString('en-IN')} वार्षिक) बनता है। आपका शुद्ध लाभ मार्जिन ${metrics.netMarginPct}% है और लागत वसूली (Break-even) ${metrics.breakEvenMonths} माह में प्राप्त होगी।`;
    }

    // 4. Loan / Bank requirements
    if (q.includes('loan') || q.includes('लोन') || q.includes('ऋण') || q.includes('bank') || q.includes('बैंक')) {
      return `आपकी परियोजना लागत ₹${profile.finance.totalOutlay.toLocaleString('en-IN')} के लिए आवश्यक बैंक सावधि ऋण ₹${metrics.termLoanAmount.toLocaleString('en-IN')} है। इसके लिए लीड बैंक (जैसे सेंट्रल बैंक ऑफ इंडिया, फंदा शाखा) में UdyamSetu का तैयार DPR, आधार, पैन, और ग्राम पंचायत एनओसी प्रस्तुत करना होगा। ब्याज दर लगभग 8.5% रहेगी।`;
    }

    // 5. Risk / Loss inquiries
    if (q.includes('risk') || q.includes('जोखिम') || q.includes('नुकसान') || q.includes('हानि')) {
      return `इस व्यापार में सबसे बड़ा जोखिम 'कच्चे चने के भाव में उतार-चढ़ाव' है। वर्तमान में खरीद भाव ₹74/किग्रा है। यदि भाव ₹80 से ऊपर जाता है तो मार्जिन पर दबाव आता है। इसके समाधान के लिए स्थानीय 3 किसान उत्पादक संगठनों (FPO) के साथ कटाई के समय ही फॉरवर्ड अनुबंध (Forward Contract) कर लें।`;
    }

    // 6. Starting with small budget
    if (q.includes('2 lakh') || q.includes('2 लाख') || q.includes('कम पूंजी')) {
      return `यदि आपके पास ₹2 लाख तक की पूंजी है, तो आप 'जैविक खाद निर्माण (Vermicompost)' या 'ग्रामीण किराना सुपरमार्ट' से शुरुआत कर सकते हैं। दाल मिल के लिए भी आप मुद्रा शिशु/किशोर के माध्यम से 80% तक बैंक ऋण प्राप्त कर ₹2 लाख की स्वयं की पूंजी से इकाई स्थापित कर सकते हैं।`;
    }

    // Default contextual response
    return `नमस्ते ${profile.name} जी! मैं UdyamSetu एआई सारथी हूँ। मैं आपके ${profile.category.titleHi} (${profile.location.block} क्लस्टर) के लिए वित्तीय विश्लेषण, सरकारी सब्सिडी (PMEGP/मुद्रा), मशीनरी आपूर्ति, और 90-दिवसीय कार्ययोजना में सहायता कर सकता हूँ। आप क्या पूछना चाहते हैं?`;
  }

  /**
   * Text-to-Speech Synthesis across 13 Indian languages
   */
  static speak(text: string, lang: string = 'hi') {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      const langLocaleMap: Record<string, string> = {
        hi: 'hi-IN',
        en: 'en-IN',
        bn: 'bn-IN',
        gu: 'gu-IN',
        mr: 'mr-IN',
        pa: 'pa-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        or: 'or-IN',
        as: 'as-IN',
        ur: 'ur-PK'
      };

      utterance.lang = langLocaleMap[lang] || 'hi-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  /**
   * Stop Text-to-Speech
   */
  static stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

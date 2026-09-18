import { EntrepreneurProfile, SchemeInfo } from '../types';
import { CENTRAL_STATE_SCHEMES } from '../data/schemes';

export class SchemeService {
  /**
   * Matches central and state schemes against entrepreneur profile
   */
  static matchSchemes(profile: EntrepreneurProfile): SchemeInfo[] {
    const isRural = profile.location.zone === 'Rural';
    const isSpecialCategory = ['OBC', 'SC', 'ST', 'Women'].includes(profile.skills.socialCategory);
    const outlay = profile.finance.totalOutlay || profile.category.typicalOutlay;

    return CENTRAL_STATE_SCHEMES.map(scheme => {
      let matchScore = scheme.matchScore;
      let isBestFit = scheme.isBestFit;
      let subsidyEst = scheme.subsidyAmountEst;

      if (scheme.id === 'pmegp') {
        const subsidyRate = isRural && isSpecialCategory ? 0.35 : (isRural ? 0.25 : 0.15);
        subsidyEst = Math.round(outlay * subsidyRate);
        matchScore = isRural ? 96 : 84;
        isBestFit = true;
      } else if (scheme.id === 'pmfme_odop') {
        if (profile.category.sector.includes('Food') || profile.category.sector.includes('Agro')) {
          matchScore = 92;
          subsidyEst = Math.round(outlay * 0.35);
        } else {
          matchScore = 60;
        }
      } else if (scheme.id === 'mudra_kishore') {
        if (outlay <= 1000000) {
          matchScore = 90;
        }
      }

      return {
        ...scheme,
        matchScore,
        isBestFit,
        subsidyAmountEst: subsidyEst
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Generates bank document checklist for lead bank branch manager
   */
  static generateApplicationDossier(schemeId: string, profile: EntrepreneurProfile) {
    const scheme = CENTRAL_STATE_SCHEMES.find(s => s.id === schemeId) || CENTRAL_STATE_SCHEMES[0];
    return {
      dossierId: `DOSS-${Date.now().toString().slice(-6)}`,
      schemeName: scheme.name,
      applicantName: profile.name,
      businessName: profile.businessName,
      location: `${profile.location.block}, ${profile.location.district} (${profile.location.state})`,
      sanctionBank: 'Central Bank of India (Phanda Branch - Lead Bank MP)',
      subsidyLocked: scheme.subsidyAmountEst,
      requiredDocs: scheme.requiredDocs,
      generatedAt: new Date().toLocaleDateString('en-IN')
    };
  }
}

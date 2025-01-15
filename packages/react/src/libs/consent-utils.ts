import { ConsentState, allConsentNames } from '../types/privacy'

export function getEffectiveConsents(consents: ConsentState, honorDoNotTrack: boolean): ConsentState {
  //@ts-expect-error
  if (honorDoNotTrack && typeof window !== 'undefined' && window.doNotTrack === "1") {
    return Object.keys(consents).reduce((acc, key) => {
      acc[key as allConsentNames] = key === 'necessary' ? true : false;
      return acc;
    }, {} as ConsentState);
  }
  return consents;
}

export function hasConsentFor(consentType: allConsentNames, consents: ConsentState, honorDoNotTrack: boolean): boolean {
  const effectiveConsents = getEffectiveConsents(consents, honorDoNotTrack);
  return effectiveConsents[consentType] || false;
}

export function hasConsented(consentInfo: { time: number; type: 'all' | 'custom' | 'necessary' } | null): boolean {
  return consentInfo !== null;
}


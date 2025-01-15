import { ReactNode } from 'react';
import { ConsentState, allConsentNames } from '@better-events/react';
;

export function useConsentRender(getEffectiveConsents: () => ConsentState) {
  const renderIfConsent = (consentType: allConsentNames, component: ReactNode): ReactNode | null => {
    const effectiveConsents = getEffectiveConsents();
    return effectiveConsents[consentType] ? component : null;
  };

  return { renderIfConsent };
}


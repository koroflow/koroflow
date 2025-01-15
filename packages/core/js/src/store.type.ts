import { ConsentState, Callbacks, CallbackFunction, ComplianceRegion, ComplianceSettings, PrivacySettings, AllConsentNames, ConsentType, consentTypes } from './types';



export interface PrivacyConsentState {
    consents: ConsentState;
    consentInfo: { time: number; type: 'all' | 'custom' | 'necessary' } | null;
    showPopup: boolean;
    gdprTypes: AllConsentNames[];
    isPrivacyDialogOpen: boolean;
    complianceSettings: Record<ComplianceRegion, ComplianceSettings>;
    callbacks: Callbacks;
    detectedCountry: string;
    privacySettings: PrivacySettings;
    includeNonDisplayedConsents: boolean;
    consentTypes: ConsentType[];
    setConsent: (name: AllConsentNames, value: boolean) => void;
    setShowPopup: (show: boolean) => void;
    setIsPrivacyDialogOpen: (isOpen: boolean) => void;
    saveConsents: (type: 'all' | 'custom' | 'necessary') => void;
    resetConsents: () => void;
    setGdprTypes: (types: AllConsentNames[]) => void;
    setComplianceSetting: (region: ComplianceRegion, settings: Partial<ComplianceSettings>) => void;
    resetComplianceSettings: () => void;
    setCallback: (name: keyof Callbacks, callback: CallbackFunction | undefined) => void;
    setDetectedCountry: (country: string) => void;
    getDisplayedConsents: () => typeof consentTypes
    hasConsented: () => boolean;
    clearAllData: () => void;
    updateConsentMode: () => void;
    setPrivacySettings: (settings: Partial<PrivacySettings>) => void;
    getEffectiveConsents: () => ConsentState;
    hasConsentFor: (consentType: AllConsentNames) => boolean;
    setIncludeNonDisplayedConsents: (include: boolean) => void;
    
  }
  
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ConsentState, ComplianceRegion, ComplianceSettings, Callbacks, allConsentNames, consentTypes, PrivacySettings } from '../types/privacy'
import { getEffectiveConsents, hasConsentFor, hasConsented } from '../libs/consent-utils'

export interface ConsentInfo {
  time: number;
  type: 'all' | 'custom' | 'necessary';
}

export interface PrivacyConsentState {
  consents: ConsentState
  consentInfo: ConsentInfo | null
  showPopup: boolean
  gdprTypes: allConsentNames[]
  isPrivacyDialogOpen: boolean
  complianceSettings: Record<ComplianceRegion, ComplianceSettings>
  callbacks: Callbacks
  detectedCountry: string
  consentTypes: typeof consentTypes
  privacySettings: PrivacySettings
  setConsent: (name: allConsentNames, value: boolean) => void
  setShowPopup: (show: boolean) => void
  setIsPrivacyDialogOpen: (isOpen: boolean) => void
  saveConsents: (type: 'all' | 'custom' | 'necessary') => void
  resetConsents: () => void
  setGdprTypes: (types: allConsentNames[]) => void
  setComplianceSetting: (region: ComplianceRegion, settings: Partial<ComplianceSettings>) => void
  resetComplianceSettings: () => void
  setCallback: (name: keyof Callbacks, callback: (() => void) | undefined) => void
  setDetectedCountry: (country: string) => void
  getDisplayedConsents: () => typeof consentTypes
  hasConsented: () => boolean
  clearAllData: () => void
  updateConsentMode: () => void
  setPrivacySettings: (settings: Partial<PrivacySettings>) => void
  getEffectiveConsents: () => ConsentState
  hasConsentFor: (consentType: allConsentNames) => boolean
  includeNonDisplayedConsents: boolean
  setIncludeNonDisplayedConsents: (include: boolean) => void
}

const initialState: Omit<PrivacyConsentState, 'getEffectiveConsents' | 'hasConsentFor'> = {
  consents: consentTypes.reduce((acc, consent) => {
    acc[consent.name] = consent.defaultValue
    return acc
  }, {} as ConsentState),
  consentInfo: null,
  showPopup: true,
  gdprTypes: ["necessary", "marketing"],
  isPrivacyDialogOpen: false,
  complianceSettings: {
    gdpr: { enabled: true, appliesGlobally: true, applies: true },
    ccpa: { enabled: true, appliesGlobally: false, applies: undefined },
    lgpd: { enabled: false, appliesGlobally: false, applies: undefined },
    usStatePrivacy: { enabled: true, appliesGlobally: false, applies: undefined },
  },
  callbacks: {},
  detectedCountry: 'US',
  consentTypes: consentTypes,
  privacySettings: {
    honorDoNotTrack: true,
  },
  setConsent: () => {},
  setShowPopup: () => {},
  setIsPrivacyDialogOpen: () => {},
  saveConsents: () => {},
  resetConsents: () => {},
  setGdprTypes: () => {},
  setComplianceSetting: () => {},
  resetComplianceSettings: () => {},
  setCallback: () => {},
  setDetectedCountry: () => {},
  getDisplayedConsents: () => [],
  hasConsented: () => false,
  clearAllData: () => {},
  updateConsentMode: () => {},
  setPrivacySettings: () => {},
  includeNonDisplayedConsents: false,
  setIncludeNonDisplayedConsents: () => {},
}

export const usePrivacyConsentStore = create<PrivacyConsentState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setConsent: (name, value) => {
        set(state => {
          const newConsents = { ...state.consents, [name]: value };
          return { consents: newConsents };
        });
        get().updateConsentMode();
      },
      setShowPopup: (show) => set({ showPopup: show }),
      setIsPrivacyDialogOpen: (isOpen) => set({ isPrivacyDialogOpen: isOpen }),
      saveConsents: (type: 'all' | 'custom' | 'necessary') => {
        const { callbacks, updateConsentMode, consents, consentTypes, includeNonDisplayedConsents } = get();
        const newConsents = { ...consents };
        
        if (type === 'all') {
          consentTypes.forEach(consent => {
            newConsents[consent.name] = true;
          });
        } else if (type === 'necessary') {
          consentTypes.forEach(consent => {
            newConsents[consent.name] = consent.name === 'necessary';
          });
        }
        
        set({ 
          consents: newConsents,
          showPopup: false,
          consentInfo: { time: Date.now(), type }
        });
        updateConsentMode();
        callbacks.onConsentGiven?.();
        callbacks.onPreferenceExpressed?.();
      },
      resetConsents: () => set(state => ({
        consents: consentTypes.reduce((acc, consent) => {
          acc[consent.name] = consent.defaultValue
          return acc
        }, {} as ConsentState),
        consentInfo: null
      })),
      setGdprTypes: (types) => set({ gdprTypes: types }),
      setComplianceSetting: (region, settings) => set(state => ({
        complianceSettings: {
          ...state.complianceSettings,
          [region]: { ...state.complianceSettings[region], ...settings }
        }
      })),
      resetComplianceSettings: () => set({
        complianceSettings: initialState.complianceSettings
      }),
      setCallback: (name, callback) => set(state => ({
        callbacks: { ...state.callbacks, [name]: callback }
      })),
      setDetectedCountry: (country) => set({ detectedCountry: country }),
      getDisplayedConsents: () => {
        const { gdprTypes, consentTypes } = get()
        return consentTypes.filter(consent => gdprTypes.includes(consent.name))
      },
      hasConsented: () => {
        const { consentInfo } = get()
        return hasConsented(consentInfo)
      },
      clearAllData: () => {
        set(initialState)
        localStorage.removeItem('privacy-consent-storage')
      },
      updateConsentMode: () => {
        const effectiveConsents = get().getEffectiveConsents();
        //@ts-expect-error
        if (typeof window !== 'undefined' && window.gtag) {
          //@ts-expect-error
          window.gtag('consent', 'update', {
            'ad_storage': effectiveConsents.marketing ? 'granted' : 'denied',
            'analytics_storage': effectiveConsents.measurement ? 'granted' : 'denied',
            'ad_user_data': effectiveConsents.ad_user_data ? 'granted' : 'denied',
            'ad_personalization': effectiveConsents.ad_personalization ? 'granted' : 'denied',
          });
        }
      },
      setPrivacySettings: (settings) => set(state => ({
        privacySettings: { ...state.privacySettings, ...settings }
      })),
      getEffectiveConsents: () => {
        const { consents, privacySettings } = get();
        return getEffectiveConsents(consents, privacySettings.honorDoNotTrack);
      },
      hasConsentFor: (consentType) => {
        const { consents, privacySettings } = get();
        return hasConsentFor(consentType, consents, privacySettings.honorDoNotTrack);
      },
      setIncludeNonDisplayedConsents: (include) => set({ includeNonDisplayedConsents: include }),
    }),
    {
      name: 'privacy-consent-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        consents: state.consents, 
        consentInfo: state.consentInfo,
        privacySettings: state.privacySettings
      }),
    }
  )
)


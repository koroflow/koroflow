import { createStore } from "zustand/vanilla";
import {
  getEffectiveConsents,
  hasConsentFor,
  hasConsented,
} from "./libs/consent-utils";
import { ConsentState, consentTypes } from "./types";
import { initialState } from "./store.initial-state";
import { PrivacyConsentState } from "./store.type";

const STORAGE_KEY = "privacy-consent-storage";

interface StoredConsent {
  consents: ConsentState;
  consentInfo: {
    time: number;
    type: string;
  } | null;
}

const getStoredConsent = (): StoredConsent | null => {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse stored consent:", e);
    return null;
  }
};

export const createConsentManagerStore = (namespace: string | undefined = "KoroflowStore") => {
  // Load initial state from localStorage if available
  const storedConsent = getStoredConsent();
  
  const store = createStore<PrivacyConsentState>((set, get) => ({
    ...initialState,
    ...(storedConsent ? {
      consents: storedConsent.consents,
      consentInfo: storedConsent.consentInfo as { time: number; type: "necessary" | "all" | "custom"; } | null,
      showPopup: false, // Don't show popup if we have stored consent
    } : {
      showPopup: true, // Show popup if no stored consent
    }),
    
    setConsent: (name, value) => {
      set((state) => {
        const newConsents = { ...state.consents, [name]: value };
        // Save to localStorage whenever consents change
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          consents: newConsents,
          consentInfo: state.consentInfo
        }));
        return { consents: newConsents };
      });
      get().updateConsentMode();
    },

    setShowPopup: (show, force = false) => {
      const state = get();
      // Check stored consent when determining whether to show popup
      const storedConsent = getStoredConsent();
      // Show if forcing, or if no stored consent and no current consent
      if (force || (!storedConsent && !state.consentInfo && show)) {
        set({ showPopup: show });
      }
    },

    setIsPrivacyDialogOpen: (isOpen) => {
      set({ isPrivacyDialogOpen: isOpen });
    },

    saveConsents: (type) => {
      const {
        callbacks,
        updateConsentMode,
        consents,
        consentTypes,
        includeNonDisplayedConsents,
      } = get();
      const newConsents = { ...consents };

      if (type === "all") {
        consentTypes.forEach((consent) => {
          newConsents[consent.name] = true;
        });
      } else if (type === "necessary") {
        consentTypes.forEach((consent) => {
          newConsents[consent.name] = consent.name === "necessary";
        });
      }

      const consentInfo = { time: Date.now(), type: type as "necessary" | "all" | "custom" };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        consents: newConsents,
        consentInfo
      }));

      set({
        consents: newConsents,
        showPopup: false,
        consentInfo,
      });
      
      updateConsentMode();
      callbacks.onConsentGiven?.();
      callbacks.onPreferenceExpressed?.();
    },

    resetConsents: () => {
      set((state) => {
        const resetState = {
          consents: consentTypes.reduce((acc, consent) => {
            acc[consent.name] = consent.defaultValue;
            return acc;
          }, {} as ConsentState),
          consentInfo: null,
        };
        // Clear localStorage when resetting
        localStorage.removeItem(STORAGE_KEY);
        return resetState;
      });
    },

    setGdprTypes: (types) => set({ gdprTypes: types }),

    setComplianceSetting: (region, settings) =>
      set((state) => ({
        complianceSettings: {
          ...state.complianceSettings,
          [region]: { ...state.complianceSettings[region], ...settings },
        },
      })),

    resetComplianceSettings: () =>
      set({
        complianceSettings: initialState.complianceSettings,
      }),

    setCallback: (name, callback) =>
      set((state) => ({
        callbacks: { ...state.callbacks, [name]: callback },
      })),

    setDetectedCountry: (country) => set({ detectedCountry: country }),

    getDisplayedConsents: () => {
      const { gdprTypes, consentTypes } = get();
      return consentTypes.filter(consent => gdprTypes.includes(consent.name));
    },

    hasConsented: () => {
      const { consentInfo } = get();
      return hasConsented(consentInfo);
    },

    clearAllData: () => {
      set(initialState);
      localStorage.removeItem(STORAGE_KEY);
    },

    updateConsentMode: () => {
      const effectiveConsents = get().getEffectiveConsents();
      // Commented out as per original code
      // if (typeof window !== 'undefined' && window.gtag) {
      //   window.gtag('consent', 'update', {
      //     'ad_storage': effectiveConsents.marketing ? 'granted' : 'denied',
      //     'analytics_storage': effectiveConsents.measurement ? 'granted' : 'denied',
      //     'ad_user_data': effectiveConsents.ad_user_data ? 'granted' : 'denied',
      //     'ad_personalization': effectiveConsents.ad_personalization ? 'granted' : 'denied',
      //   });
      // }
    },

    setPrivacySettings: (settings) =>
      set((state) => ({
        privacySettings: { ...state.privacySettings, ...settings },
      })),

    getEffectiveConsents: () => {
      const { consents, privacySettings } = get();
      return getEffectiveConsents(consents, privacySettings.honorDoNotTrack);
    },

    hasConsentFor: (consentType) => {
      const { consents, privacySettings } = get();
      return hasConsentFor(
        consentType,
        consents,
        privacySettings.honorDoNotTrack
      );
    },

    setIncludeNonDisplayedConsents: (include) =>
      set({ includeNonDisplayedConsents: include }),
  }));

  if (typeof window !== "undefined") {
    (window as any)[namespace] = store;
  }

  return store;
};

export default createConsentManagerStore;
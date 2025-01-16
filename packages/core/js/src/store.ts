import { createStore } from "zustand/vanilla";
import {
  getEffectiveConsents,
  hasConsentFor,
  hasConsented,
} from "./libs/consent-utils";

import { ConsentState, consentTypes } from "./types";
import { initialState } from "./store.initial-state";
import { PrivacyConsentState } from "./store.type";

export const createConsentManagerStore = (namespace: string | undefined = "KoroflowStore") => {
 const store = createStore<PrivacyConsentState>((set, get) => ({
  ...initialState,
  setConsent: (name, value) => {
    set((state) => {
      const newConsents = { ...state.consents, [name]: value };
      return { consents: newConsents };
    });
    get().updateConsentMode();
  },
  setShowPopup: (show, force = false) => {
    const state = get();
    // If forcing open, or if no consent has been given yet, show the popup
    if (force || (!state.consentInfo && show)) {
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

    set({
      consents: newConsents,
      showPopup: false,
      consentInfo: { time: Date.now(), type },
    });
    updateConsentMode();
    callbacks.onConsentGiven?.();
    callbacks.onPreferenceExpressed?.();

  },
  resetConsents: () =>
    set((state) => ({
      consents: consentTypes.reduce((acc, consent) => {
        acc[consent.name] = consent.defaultValue;
        return acc;
      }, {} as ConsentState),
      consentInfo: null,
    })),
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
    const { gdprTypes, consentTypes } = get()
    return consentTypes.filter(consent => gdprTypes.includes(consent.name))
  },
  hasConsented: () => {
    const { consentInfo } = get();
    return hasConsented(consentInfo);
  },
  clearAllData: () => {
    set(initialState);
    localStorage.removeItem("privacy-consent-storage");
  },
  updateConsentMode: () => {
    const effectiveConsents = get().getEffectiveConsents();
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

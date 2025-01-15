/**
 * A generic type for callback functions that can accept an argument of type T.
 * By default, the argument type is `void`, meaning no arguments are expected.
 *
 * @typeParam T - The type of the argument that the callback function accepts.
 */
export type CallbackFunction<T = void> = (arg: T) => void;

/**
 * This interface defines the structure for callback functions that can be set to respond to various consent-related events.
 * These callbacks allow for custom actions to be performed at different stages of the consent management process.
 *
 * @remarks
 * - `onReady`: Called when the consent management system is ready.
 * - `onBannerShown`: Called when the consent banner is displayed to the user.
 * - `onBannerClosed`: Called when the consent banner is closed by the user.
 * - `onConsentGiven`: Called when the user gives consent, with an optional argument detailing the consent type.
 * - `onConsentRejected`: Called when the user rejects consent, with an optional argument detailing the reason.
 * - `onPreferenceExpressed`: Called when the user expresses their consent preferences, with an optional argument detailing the preferences.
 * - `onError`: Called when an error occurs, with an optional argument detailing the error message.
 */
export interface Callbacks {
  onReady?: CallbackFunction;
  onBannerShown?: CallbackFunction;
  onBannerClosed?: CallbackFunction;
  onConsentGiven?: CallbackFunction<{ consentType: string } | void>;
  onConsentRejected?: CallbackFunction<{ reason: string } | void>;
  onPreferenceExpressed?: CallbackFunction<{ preferences: Record<string, boolean> } | void>;
  onError?: CallbackFunction<string>;
}
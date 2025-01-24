import CookieBanner, { type CookieBannerComponent, type CookieBannerProps } from "./cookie-banner";

/**
 * Enhanced CookieBanner component with compound components attached.
 *
 * @remarks
 * This is the main export that provides access to all CookieBanner components.
 * It follows the compound components pattern, allowing for flexible composition
 * of the banner's parts.
 *
 * @example
 * Basic usage:
 * ```tsx
 * import CookieBanner from '@your-org/elements';
 *
 * function App() {
 *   return (
 *     <CookieBanner
 *       title="Privacy Notice"
 *       description="We use cookies to enhance your experience."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * Using compound components:
 * ```tsx
 * import CookieBanner from '@your-org/elements';
 *
 * function App() {
 *   return (
 *     <CookieBanner.Root>
 *       <CookieBanner.Content>
 *         <CookieBanner.Title>Cookie Settings</CookieBanner.Title>
 *         <CookieBanner.Description>
 *           Please choose your cookie preferences
 *         </CookieBanner.Description>
 *         <CookieBanner.Actions>
 *           <CookieBanner.RejectButton>Decline</CookieBanner.RejectButton>
 *           <CookieBanner.CustomizeButton>Customize</CookieBanner.CustomizeButton>
 *           <CookieBanner.AcceptButton>Accept All</CookieBanner.AcceptButton>
 *         </CookieBanner.Actions>
 *       </CookieBanner.Content>
 *     </CookieBanner.Root>
 *   );
 * }
 */

export * from "./components";
export type { CookieBannerComponent, CookieBannerProps };
export type { CookieBannerStyles } from "./types";

export default CookieBanner;

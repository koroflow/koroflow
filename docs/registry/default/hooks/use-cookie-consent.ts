import * as React from "react";
import { type allConsentNames, consentTypes } from "@/types/consent";

export function useCookieConsent(requiredGdprPurposes: allConsentNames[]) {
  const mergedList = React.useMemo(() => {
    return consentTypes
      .map((cookie) => {
        if (
          requiredGdprPurposes.includes(cookie.name) ||
          cookie.display === true
        ) {
          return {
            ...cookie,
            display: true,
          };
        }
        return cookie;
      })
      .filter(({ display }) => display === true);
  }, [requiredGdprPurposes]);

  const defaultValues = React.useMemo(() => {
    return mergedList.reduce(
      (acc: Record<allConsentNames, boolean>, cookie) => {
        acc[cookie.name] = !!cookie.defaultValue;
        return acc;
      },
      {} as Record<allConsentNames, boolean>,
    );
  }, [mergedList]);

  return { mergedList, defaultValues };
}

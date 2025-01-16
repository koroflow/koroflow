import { useConsentManager } from "@koroflow/core-react";
import Script from "next/script";

const Demo = () => {
  const { consents } = useConsentManager();

  return (
    <div>
      {/* <p>Consent Info: {JSON.stringify(consentInfo)}</p> */}
      {consents['necessary'] && <Script src="https://cdn.jsdelivr.net/npm/@koroflow/core@latest/dist/koroflow.min.js" />}
    </div>
  );
};

export default Demo;

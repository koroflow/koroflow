import { CodeBlock } from "~/components/marketing/codeblock";
import { Section } from "~/components/marketing/section";
import { ExamplesClient } from "./examples-client";

interface FeatureOption {
	id: number;
	title: string;
	description: string;
	code: React.ReactNode;
}

const featureOptions: FeatureOption[] = [
	{
		id: 1,
		title: "Simple Cookie Banner",
		description: "Create a simple cookie banner with a basic theme.",
		code: (
			<CodeBlock
				lang="typescript"
				code={`import { CookieBanner } from "@koroflow/elements"

function BasicCookieBanner() {
  return (
    <CookieBanner.Root>
      <CookieBanner.Card>
        <CookieBanner.Header>
          <CookieBanner.Title>
            We value your privacy
          </CookieBanner.Title>
          <CookieBanner.Description>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
          </CookieBanner.Description>
        </CookieBanner.Header>
        <CookieBanner.Footer>
          <CookieBanner.AcceptButton>
            Accept All
          </CookieBanner.AcceptButton>
          <CookieBanner.CustomizeButton>
            Customize
          </CookieBanner.CustomizeButton>
        </CookieBanner.Footer>
      </CookieBanner.Card>
    </CookieBanner.Root>
  )
}`}
			/>
		),
	},
	{
		id: 2,
		title: "Consent Manager",
		description: "Create a consent manager with multiple widgets.",
		code: (
			<CodeBlock
				lang="typescript"
				code={`import { ConsentManagerDialog, ConsentManagerWidget } from "@koroflow/elements"

function PrivacyCenter() {
  return (
    <ConsentManagerDialog>
      <ConsentManagerWidget>
        <ConsentManagerWidget.Header>
          <ConsentManagerWidget.Title>
            Privacy Preferences
          </ConsentManagerWidget.Title>
          <ConsentManagerWidget.Description>
            Manage your cookie and privacy preferences here.
          </ConsentManagerWidget.Description>
        </ConsentManagerWidget.Header>
        
        <ConsentManagerWidget.AccordionItems />
        
        <ConsentManagerWidget.Footer>
          <ConsentManagerWidget.FooterSubGroup>
            <ConsentManagerWidget.RejectButton>
              Reject All
            </ConsentManagerWidget.RejectButton>
            <ConsentManagerWidget.AcceptAllButton>
              Accept All
            </ConsentManagerWidget.AcceptAllButton>
          </ConsentManagerWidget.FooterSubGroup>
          <ConsentManagerWidget.SaveButton>
            Save Preferences
          </ConsentManagerWidget.SaveButton>
        </ConsentManagerWidget.Footer>
      </ConsentManagerWidget>
    </ConsentManagerDialog>
  )
}`}
			/>
		),
	},
	{
		id: 3,
		title: "Themed Cookie Banner",
		description: "Customize the Cookie Banner with a modern theme.",
		code: (
			<CodeBlock
				lang="typescript"
				code={`import { CookieBanner } from "@koroflow/elements"

const modernTheme = {
  'cookie-banner.root': 'fixed bottom-0 w-full p-4 bg-white/80 backdrop-blur',
  'cookie-banner.card': 'max-w-2xl mx-auto rounded-lg shadow-lg',
  'cookie-banner.header.title': 'text-lg font-semibold text-gray-900',
  'cookie-banner.header.description': 'mt-2 text-sm text-gray-600',
  'cookie-banner.footer': 'mt-4 flex justify-end gap-3',
  'cookie-banner.button': 'px-4 py-2 rounded-md transition-colors',
  'cookie-banner.acceptButton': 'bg-blue-600 text-white hover:bg-blue-700',
  'cookie-banner.customizeButton': 'bg-gray-100 text-gray-900 hover:bg-gray-200'
}

function ThemedCookieBanner() {
  return (
    <CookieBanner theme={modernTheme}>
      <CookieBanner.Card>
        <CookieBanner.Header>
          <CookieBanner.Title>
            Privacy Notice
          </CookieBanner.Title>
          <CookieBanner.Description>
            We use cookies to provide essential functionality and improve your experience.
          </CookieBanner.Description>
        </CookieBanner.Header>
        <CookieBanner.Footer>
          <CookieBanner.AcceptButton>
            Accept All
          </CookieBanner.AcceptButton>
          <CookieBanner.CustomizeButton>
            Customize
          </CookieBanner.CustomizeButton>
        </CookieBanner.Footer>
      </CookieBanner.Card>
    </CookieBanner>
  )
}`}
			/>
		),
	},
	{
		id: 4,
		title: "Full Example",
		description: "A full example of how to use the Consent Manager and Cookie Banner together.",
		code: (
			<CodeBlock
				lang="typescript"
				code={`import { ConsentManagerProvider } from "@koroflow/elements"
import { CookieBanner } from "./components/CookieBanner"
import { PrivacyCenter } from "./components/PrivacyCenter"

export default function App() {
  return (
    <ConsentManagerProvider
      initialGdprTypes={[
        "necessary",
        "analytics",
        "marketing",
        "preferences"
      ]}
      initialComplianceSettings={{
        gdpr: {
          enabled: true,
          requiresConsent: true
        },
        ccpa: {
          enabled: true,
          requiresConsent: false
        }
      }}
    >
      {/* Your app content */}
      <CookieBanner />
      <PrivacyCenter />
      
      {process.env.NODE_ENV === 'development' && (
        <KoroflowDevTool />
      )}
    </ConsentManagerProvider>
  )
}`}
			/>
		),
	},
];

export function Examples() {
	return (
		<Section id="examples" title="Examples">
			<ExamplesClient features={featureOptions} />
		</Section>
	);
}

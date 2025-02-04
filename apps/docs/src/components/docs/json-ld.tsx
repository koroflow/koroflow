import type { Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
	code: WithContext<Thing>;
};

export const JsonLd = ({ code }: JsonLdProps) => (
  // Validate JSON-LD structure before rendering
  (() => {
    try {
      // Ensure code has @context property
      if (!('@context' in code)) {
        console.warn('Invalid JSON-LD: Missing @context property');
        return null;
      }
      return (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is a JSON-LD script, not user-generated content."
          dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
        />
      );
    } catch (error) {
      console.error('Failed to serialize JSON-LD:', error);
      return null;
    }
  })()
);

export * from 'schema-dts';

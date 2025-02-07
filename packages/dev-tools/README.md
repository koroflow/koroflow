<div align="center">
   <img src="https://koroflow.com/logo-icon.png" alt="Koroflow Logo" width="64" height="64" />
  <h1>@consent-management/dev-tools</h1>
  <p>Transform privacy consent from a compliance checkbox into a fully observable system</p>

  [![GitHub stars](https://img.shields.io/github/stars/koroflow/koroflow?style=flat-square)](https://github.com/koroflow/koroflow)
  [![CI](https://img.shields.io/github/actions/workflow/status/koroflow/koroflow/ci.yml?style=flat-square)](https://github.com/koroflow/koroflow/actions/workflows/ci.yml)
  [![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat-square)](LICENSE)
  [![Discord](https://img.shields.io/discord/1312171102268690493?style=flat-square)](https://discord.gg/koroflow)
</div>

## Documentation

For detailed documentation and examples, visit:
[https://koroflow.com/docs/components/dev-tool](https://koroflow.com/docs/components/dev-tool)

## Installation

```bash
npm install @consent-management/dev-tools
# or
yarn add @consent-management/dev-tools
# or
pnpm add @consent-management/dev-tools
```

## Quick Start

```tsx
import { ConsentManagerProvider, CookieBanner, ConsentManagerDialog } from "@consent-management/react";
import { DevTools } from "@consent-management/dev-tools";

export default function App() {
  return (
    <ConsentManagerProvider>
      <CookieBanner />
      <ConsentManagerDialog/>
      <ConsentManagerDevTool />
      {/* Your app content */}
    </ConsentManagerProvider>
  );
}
```

## License

[GNU General Public License v3.0](https://github.com/koroflow/koroflow/blob/main/LICENSE)

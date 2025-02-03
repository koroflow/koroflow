<div align="center">
   <img src="https://koroflow.com/logo-icon.png" alt="Koroflow Logo" width="64" height="64" />
  <h1>@koroflow/dev-tools</h1>
  <p>Transform privacy consent from a compliance checkbox into a fully observable system</p>

  [![GitHub stars](https://img.shields.io/github/stars/koroflow/koroflow?style=flat-square)](https://github.com/koroflow/koroflow)
  [![CI](https://github.com/koroflow/koroflow/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/koroflow/koroflow/actions/workflows/ci.yml)
  [![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat-square)](LICENSE)
  [![Discord](https://img.shields.io/discord/1312171102268690493?style=flat-square)](https://discord.gg/koroflow)
</div>

## Documentation

For detailed documentation and examples, visit:
[https://koroflow.com/docs/guides/dev-tool](https://koroflow.com/docs/guides/dev-tool)

## Installation

```bash
npm install @koroflow/dev-tools
# or
yarn add @koroflow/dev-tools
# or
pnpm add @koroflow/dev-tools
```

## Quick Start

```tsx
import { ConsentManagerProvider, CookieBanner, ConsentManagerDialog } from "@koroflow/elements";
import { DevTools } from "@koroflow/dev-tools";

export default function App() {
  return (
    <ConsentManagerProvider>
      <CookieBanner />
      <ConsentManagerDialog/>
      <KoroflowDevTool />
      {/* Your app content */}
    </ConsentManagerProvider>
  );
}
```

## License

[GNU General Public License v3.0](https://github.com/koroflow/koroflow/blob/main/LICENSE)

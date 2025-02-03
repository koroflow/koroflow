<div align="center">
   <img src="https://koroflow.com/logo-icon.png" alt="Koroflow Logo" width="64" height="64" />
  <h1>Koroflow</h1>
  <p>Transform privacy consent from a compliance checkbox into a fully observable system</p>

  [![CI](https://github.com/koroflow/koroflow/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/koroflow/koroflow/actions/workflows/ci.yml)
  [![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat-square)](LICENSE)
  [![Discord](https://img.shields.io/discord/1312171102268690493?style=flat-square)](https://discord.gg/koroflow)
</div>

## 🎯 Overview

Koroflow unifies analytics, consent tracking, and privacy controls into a single performant solution. Built for modern development teams, it transforms privacy management from a compliance burden into a fully observable system.

### Why Koroflow?

- 🚫 No more slow cookie banners
- 👁️ Complete visibility into consent choices
- 🔄 Unified multi-vendor implementation
- 📊 Clear privacy policy tracking
- ⚡ Performance-first design

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@koroflow/core-js` | Core consent and event management | [![npm](https://img.shields.io/npm/v/@koroflow/core-js?style=flat-square)](https://www.npmjs.com/package/@koroflow/core-js) |
| `@koroflow/elements` | shadcn/ui based components | [![npm](https://img.shields.io/npm/v/@koroflow/elements?style=flat-square)](https://www.npmjs.com/package/@koroflow/elements) |
| `@koroflow/dev-tools` | Development and debugging tools | [![npm](https://img.shields.io/npm/v/@koroflow/dev-tools?style=flat-square)](https://www.npmjs.com/package/@koroflow/dev-tools) |

## ⚡ Quick Start

```bash
# Install packages
npm install @koroflow/elements

# Optional: Install dev tools
npm install -D @koroflow/dev-tools
```

```tsx
import { ConsentManagerProvider, CookieBanner } from "@koroflow/elements";

export default function App() {
  return (
    <ConsentManagerProvider
      initialGdprTypes={[
        "necessary",
        "marketing",
        "functionality",
        "measurement",
      ]}
    >
      <CookieBanner />
      {/* Your app content */}
    </ConsentManagerProvider>
  );
}
```

## ✨ Key Features

- 🎨 **Beautiful UI Components**: Built on shadcn/ui and Tailwind CSS
- 📱 **Server Components Ready**: Full Next.js app directory support
- 🔒 **Privacy by Design**: GDPR, CCPA, and LGPD compliant
- 🛠️ **Developer Tools**: Real-time consent debugging
- ⚡ **Performance First**: Zero dependencies, smart code splitting
- 🎯 **Type Safety**: Full TypeScript support

## 🏗️ Development

Prerequisites:
- Node.js >= 18
- pnpm >= 8

```bash
# Clone repository
git clone https://github.com/koroflow/koroflow.git
cd koroflow

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test
```

## 🧪 Testing

We use Vitest and Playwright for testing:

```bash
# Run unit tests
pnpm test:unit

# Run E2E tests
pnpm test:e2e

# Run all tests
pnpm test
```

## 📚 Documentation

- [Getting Started](https://koroflow.com/docs/getting-started)
- [Core Concepts](https://koroflow.com/docs/concepts)
- [API Reference](https://koroflow.com/docs/api)
- [UI Components](https://koroflow.com/docs/components)
- [Privacy Regulations](https://koroflow.com/docs/regulations)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

- 🐛 [Report bugs](https://github.com/koroflow/koroflow/issues/new?template=bug_report.yml)
- ✨ [Request features](https://github.com/koroflow/koroflow/issues/new?template=feature_request.yml)
- 📚 [Improve docs](https://github.com/koroflow/koroflow/issues/new?template=doc_report.yml)
- 🧪 [Fix tests](https://github.com/koroflow/koroflow/issues/new?template=test.yml)
- ⚡ [Report performance issues](https://github.com/koroflow/koroflow/issues/new?template=performance.yml)

## 🌟 Self-Hosting vs Cloud

### Self-Hosted (Open Source)
- Full GNU3 licensed platform
- Complete infrastructure control
- Free to modify and extend
- Community support

### Cloud Platform (Coming Soon)
- Managed infrastructure
- Advanced analytics
- Team collaboration
- Enterprise support

## 📜 License

[GNU General Public License v3.0](LICENSE) - See [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built with ❤️ by the Koroflow team</strong>
</div>
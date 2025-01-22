# Koroflow

Privacy-first consent management and unified event streaming system. Koroflow helps you manage user consent and route events to your analytics platforms while respecting user privacy preferences.

## Project Structure

```
.
├── packages/
│   ├── core/         # Core consent and event management
│   │   ├── js/       # JavaScript implementation
│   │   └── react/    # React bindings
│   ├-─ elements/     # Radix Based Components
│   ├-─ shadcn/     # Shadcn Based Components
│   └── dev-tools/    # Development utilities
├── docs/            # Documentation site
└── configs/         # Shared configurations
    ├── eslint-config/
    ├── tsup-config/ # Common config for tsup
    └── typescript-config/ # Common config for typescript
```

## Development

Prerequisites:
- Node.js >= 18
- pnpm >= 8

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Packages

- `@koroflow/core`: Core consent and event management system
  - JavaScript implementation
  - React bindings
  - Privacy-focused UI components built with shadcn/ui:
    - Cookie Banner
    - Privacy Widget
- `@koroflow/dev-tools`: Development utilities and components
- `@koroflow/eslint-config`: Shared ESLint configurations
- `@koroflow/typescript-config`: Shared TypeScript configurations

## Documentation

Full documentation is available at [koroflow.com/docs](https://koroflow.com/docs). The documentation site is built with Next.js and is located in the `docs` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

GNU General Public License v3.0 - See [LICENSE.md](./LICENSE.md) for details.

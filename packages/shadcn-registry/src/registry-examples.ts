import type { Registry } from '~/schema';

export const examples: Registry['items'] = [
  {
    name: 'consent-solution-demo',
    type: 'registry:example',
    registryDependencies: ['consent-solution'],
    dependencies: ['@koroflow/core-react'],
    files: [
      {
        path: 'examples/consent-solution-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'consent-solution-minimal-demo',
    type: 'registry:example',
    registryDependencies: ['consent-solution'],
    dependencies: ['@koroflow/core-react'],
    files: [
      {
        path: 'examples/consent-solution-minimal-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'consent-solution-callback-demo',
    type: 'registry:example',
    registryDependencies: ['consent-solution'],
    dependencies: ['@koroflow/core-react'],
    files: [
      {
        path: 'examples/consent-solution-callback-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'dev-tool-example',
    type: 'registry:example',
    registryDependencies: ['consent-solution'],
    dependencies: ['@koroflow/core-react', '@koroflow/dev-tools'],
    files: [
      {
        path: 'examples/dev-tool-example.tsx',
        type: 'registry:example',
      },
    ],
  },
];

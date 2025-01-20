import { defineConfig } from 'tsup';

import { version as koroflowJsVersion } from './package.json';
import { name, version } from './package.json';

export default defineConfig(overrideOptions => {
  const isProd = overrideOptions.env?.NODE_ENV === 'production';

  return {
    clean: true,
    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
      JS_PACKAGE_VERSION: `"${koroflowJsVersion}"`,
      __DEV__: `${!isProd}`,
    },
    dts: true,
    entry: {
      index: 'src/index.ts',
      'react/cookie-banner/index': 'src/react/cookie-banner/index.ts',
    },
    external: ['react', 'react-dom', 'next', '@statelyai/inspect'],
    format: ['cjs', 'esm'],
    minify: false,
    sourcemap: true,
  };
});
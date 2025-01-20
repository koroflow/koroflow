import { defineConfig } from 'tsup';

import { name, version } from './package.json';

export default defineConfig(overrideOptions => {
  const isProd = overrideOptions.env?.NODE_ENV === 'production';

  return {
    clean: true,
    define: {
      PACKAGE_NAME: `"${name}"`,
      PACKAGE_VERSION: `"${version}"`,
      __DEV__: `${!isProd}`,
    },
    dts: true,
    entry: {
      index: 'src/index.ts',
    },
    external: ['react', 'react-dom'],
    format: ['cjs', 'esm'],
    minify: false,
    sourcemap: true,
  };
});
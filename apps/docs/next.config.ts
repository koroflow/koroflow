import { env } from '@/env';
import { withLogtail } from '@logtail/next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

// @ts-expect-error No declaration file
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const otelRegex = /@opentelemetry\/instrumentation/;
const withMDX = createMDX();

const sentryConfig: Parameters<typeof withSentryConfig>[1] = {
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  /*
   * For all available options, see:
   * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
   */

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  /*
   * Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
   * This can increase your server load as well as your hosting bill.
   * Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
   * side errors will fail.
   */
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  /*
   * Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
   * See the following for more information:
   * https://docs.sentry.io/product/crons/
   * https://vercel.com/docs/cron-jobs
   */
  automaticVercelMonitors: true,
};

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'img.logo.dev',
        protocol: 'https',
      },
    ],
  },

  transpilePackages: ['@sentry/nextjs'],

  webpack(config, { isServer }) {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    config.ignoreWarnings = [{ module: otelRegex }];

    return config;
  },
};

let nextConfig: NextConfig = withMDX(withLogtail({ ...config }));

if (env.VERCEL) {
  nextConfig = withSentryConfig(nextConfig, sentryConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer()(nextConfig);
}

export default nextConfig;

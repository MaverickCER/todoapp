import createNextIntlPlugin from 'next-intl/plugin';

const withNetxIntl = createNextIntlPlugin('./src/libs/i18n/request.ts');

/**
 * @type { import("next").NextConfig }
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Match .svg files
      issuer: /\.[jt]sx?$/, // Match only if the file is imported in a JS/TS file
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true, // Enable SVGO optimizations
            svgoConfig: {
              plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default withNetxIntl(nextConfig);

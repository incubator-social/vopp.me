import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com'
      }
    ]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: RuleSetRule | string): rule is RuleSetRule =>
        typeof rule !== 'string' && rule.test instanceof RegExp && rule.test.test('.svg')
    );

    if (!fileLoaderRule) {
      throw new Error('SVG file loader rule not found');
    }

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...((fileLoaderRule.resourceQuery as { not?: RegExp[] })?.not || []), /url/]
        },
        use: ['@svgr/webpack']
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  }
};

export default nextConfig;

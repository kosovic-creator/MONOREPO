const sharedConfig = require('../../packages/shared/tailwind.config');

module.exports = {
  ...sharedConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

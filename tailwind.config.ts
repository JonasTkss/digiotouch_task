import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        workflow: {
          bg: 'var(--workflow-bg)',
          shadow: 'var(--workflow-shadow)',
          gradientFrom: 'var(--workflow-gradient-from)',
          gradientTo: 'var(--workflow-gradient-to)',
          border: 'var(--workflow-border)',
          textLight: 'var(--workflow-text-light)',
          textBlue: 'var(--workflow-text-blue)',
          textGray: 'var(--workflow-text-gray)',
          borderLight: 'var(--workflow-border-light)',
          borderHover: 'var(--workflow-border-hover)',
          itemBg: 'var(--workflow-item-bg)',
          itemActive: 'var(--workflow-item-active)',
          iconBg: 'var(--workflow-icon-bg)',
          textGray500: 'var(--workflow-text-gray-500)',
          divider: 'var(--workflow-divider)'
        }
      },
    },
  },
  plugins: [],
};
export default config;

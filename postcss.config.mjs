// PostCSS pipeline — Astro 7 reads this automatically.
// Replaces the old @astrojs/tailwind integration (removed in Astro 7).
// tailwind.config.mjs + src/styles/global.css keep working unchanged.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

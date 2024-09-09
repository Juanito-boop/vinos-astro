import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://Juanito-boop.github.io",
  base: "/vinos-astro/",
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false }), react()],
});
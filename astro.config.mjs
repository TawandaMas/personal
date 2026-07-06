import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tawanda.space',
  output: 'static',
  integrations: [tailwind()],
});
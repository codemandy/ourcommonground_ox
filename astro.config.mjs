import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import swup from '@swup/astro';
import ScrollPlugin from '@swup/scroll-plugin';
import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
  integrations: [
    tailwind(),
    alpinejs(),
    swup({
      smoothScrolling: true,
      debug: true,
      plugins: [
        new ScrollPlugin({
          doScrollingRightAway: false,
          animateScroll: true,
          scrollFriction: 0.3,
          scrollAcceleration: 0.04,
        }),
      ],
    }),
  ],
});

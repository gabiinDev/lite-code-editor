import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), partytown({
    config: {
      forward: ['dataLayer.push'],
      debug: true
    }
  }), preact()],
  output: 'server',
  adapter: vercel()
})
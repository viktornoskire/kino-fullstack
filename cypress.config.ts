import { defineConfig } from 'cypress';

const PORT = 'http://localhost:3000';

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: PORT,
    viewportWidth: 1780,
    viewportHeight: 1000,
  },
});

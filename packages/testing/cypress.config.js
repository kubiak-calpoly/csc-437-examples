module.exports = {
  e2e: {
    // baseUrl: "http://localhost:3000",
    baseUrl: "https://kubiak.unbundled.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },

  component: {
    devServer: {
      framework: "cypress-ct-lit",
      bundler: "vite"
    }
  }
};

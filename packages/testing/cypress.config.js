module.exports = {
  e2e: {
    baseUrl: "http://localhost:5173",
    // baseUrl: "https://kubiak.csse.dev",
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

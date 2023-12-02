const kram11ty = require("@cre.ative/kram-11ty");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    scripts: "scripts",
    styles: "styles"
  });
  eleventyConfig.addPassthroughCopy("modules/**/FILES/*.*");
  eleventyConfig.addPlugin(syntaxHighlight);

  // Override Markdown parser to Kram
  eleventyConfig.addExtension(
    "md",
    kram11ty.configure({
      input: "./modules",
      output: "./docs",
      template: "./templates/post.html",
      platforms: {
        "react-redux": "@cre.ative/kram-react-redux",
        elm: "@cre.ative/kram-elm"
      }
    })
  );

  return {
    dir: {
      input: "modules/",
      output: "docs"
    }
  };
};

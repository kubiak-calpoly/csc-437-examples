const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const vitePlugin = require("@11ty/eleventy-plugin-vite");
const kram11ty = require("@cre.ative/kram-11ty");

const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    scripts: "scripts",
    styles: "styles"
  });
  eleventyConfig.addPassthroughCopy("modules/**/FILES/*.*");
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(vitePlugin, {
    viteOptions: {
      mode: "development",
      build: {
        minify: false,
        target: "esnext"
      }
    }
  });

  // Override Markdown parser to Kram
  eleventyConfig.addExtension(
    "md",
    kram11ty.configure({
      input: "./workbooks",
      output: "./docs",
      template: "./templates/post.html",
      platforms: {
        typescript: "@cre.ative/kram-typescript"
      }
    })
  );

  return {
    dir: {
      input: "workbooks/",
      output: "docs"
    }
  };
};

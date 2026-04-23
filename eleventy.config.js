const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const CONTENT_DIR = path.resolve(__dirname, "content");

function loadContentYaml() {
  const out = {};
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!/\.ya?ml$/.test(file)) continue;
    const key = file.replace(/\.ya?ml$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    out[key] = yaml.load(raw);
  }
  return out;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Expose all content/*.yaml as global data, keyed by filename.
  const contentData = loadContentYaml();
  for (const [key, value] of Object.entries(contentData)) {
    eleventyConfig.addGlobalData(key, value);
  }

  eleventyConfig.addPassthroughCopy({ "img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addFilter("byYearDesc", (items) => {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => {
      const ay = Number(a.Year ?? a.year ?? 0);
      const by = Number(b.Year ?? b.year ?? 0);
      return by - ay;
    });
  });

  eleventyConfig.addFilter("years", (items) => {
    if (!Array.isArray(items)) return [];
    const set = new Set();
    for (const item of items) {
      const y = item.Year ?? item.year;
      if (y != null) set.add(String(y));
    }
    return [...set].sort((a, b) => Number(b) - Number(a));
  });

  eleventyConfig.addFilter("highlightAuthor", (authors, name) => {
    if (!authors || !name) return authors || "";
    const escaped = String(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${escaped})`, "g");
    return String(authors).replace(re, "<strong>$1</strong>");
  });

  eleventyConfig.addFilter("mediaImage", (url) => {
    if (!url) return "";
    const s = String(url);
    if (s.startsWith("/")) return s;
    try {
      const u = new URL(s);
      return `/img/${path.posix.basename(u.pathname)}`;
    } catch {
      return s;
    }
  });

  eleventyConfig.addFilter("featured", (items) => {
    if (!Array.isArray(items)) return [];
    return items.filter((i) => i.Selected === 1 || i.featured === 1 || i.featured === true);
  });

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  eleventyConfig.addFilter("limit", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : []));

  eleventyConfig.addFilter("merge", (a, b) => {
    const left = Array.isArray(a) ? a : [];
    const right = Array.isArray(b) ? b : [];
    return [...left, ...right];
  });

  eleventyConfig.addFilter("countWhere", (arr, key, value) => {
    if (!Array.isArray(arr)) return 0;
    return arr.filter((it) => it && it[key] === value).length;
  });

  eleventyConfig.addFilter("patentsAsPublications", (patents) => {
    if (!Array.isArray(patents)) return [];
    return patents.map((p) => ({
      Authors: p.Inventors,
      Title: p.Title,
      Journal: "Patent",
      Year: p.Year,
      Selected: p.Selected,
      Identifier: p.Identifier,
      URLs: p.URLs,
      isPatent: true,
    }));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};

# Sebastian Proost — CV / Portfolio

Personal CV / portfolio site built with [Eleventy](https://www.11ty.dev/).

## Requirements

- Node.js 18+ and npm

## Install

```bash
npm install
```

## Develop

Run a local dev server with live reload:

```bash
npm run dev
```

The site is served at http://localhost:8080.

## Build

```bash
npm run build
```

The static site is written to `_site/`. Clean it with `npm run clean`.

## Editing content

All CV data lives in YAML files under `content/` — one file per section. Edit the relevant file and rebuild:

| Section | File |
| --- | --- |
| Work experience | `content/experience.yaml` |
| Education | `content/education.yaml` |
| Publications | `content/publications.yaml` |
| Patents | `content/patents.yaml` |
| Citations (metrics) | `content/citations.yaml` |
| Conferences / talks | `content/conferences.yaml` |
| Media appearances | `content/media.yaml` |
| Open-source projects | `content/opensource.yaml` |
| Software | `content/software.yaml` |
| Games | `content/games.yaml` |
| Skills | `content/skills.yaml` |
| Languages | `content/languages.yaml` |
| Grants & awards | `content/grants_awards.yaml` |
| Training | `content/training.yaml` |
| Supervision / support | `content/support.yaml` |
| Identity / structured data | `content/profile.yaml` |

Each YAML file is exposed as a global data variable named after the file (e.g. `publications.yaml` → `publications`).

## Structured data (schema.org)

Every page carries a `<script type="application/ld+json">` block in its `<head>` describing a
`Person` (plus a `WebSite`, an `ImageObject` and a node for the page itself). The homepage is
typed as a `ProfilePage` with the `Person` as its `mainEntity`; other pages are `WebPage`s that
point at the same `Person` via `@id`.

The graph is assembled in `src/_data/schema.js` from `src/_data/site.js` and the YAML files —
nothing is hard-coded in the template, so the markup follows the content:

| Schema property | Source |
| --- | --- |
| `name`, `honorificSuffix`, `jobTitle`, `email`, `description` | `src/_data/site.js` |
| `givenName`, `familyName`, `image`, `homeLocation` | `content/profile.yaml` |
| `worksFor` | `content/profile.yaml` → `employers` |
| `affiliation` | `content/profile.yaml` → `affiliations` |
| `alumniOf`, `hasCredential` | `content/education.yaml` |
| `knowsAbout` | `site.researchKeywords` + `content/skills.yaml` |
| `knowsLanguage` | `content/languages.yaml` (`code` field) |
| `sameAs` | `content/profile.yaml` → `academicProfiles` + `unlistedProfiles` + `site.socialMedia` |
| `identifier` (ORCID) | `content/profile.yaml` → `academicProfiles` entry with `icon: orcid` |

`academicProfiles` and `socialMedia` are rendered as an icon in the hero *and* as a text link in
the site footer, so the structured data does not claim a profile the page hides.

`unlistedProfiles` is the deliberate exception: profiles that go into `sameAs` but are *not*
rendered anywhere — thin or externally maintained pages that identify the same person but are not
worth sending a visitor to. Entries need only a `name` (for humans reading the YAML) and a `link`;
no `icon`, since nothing is drawn. To set a page's schema type, add `schemaType:` to its
front matter (defaults to `WebPage`).

Page templates live in `src/` (`index.njk`, `experience.njk`, `publications.njk`, `software.njk`, `media.njk`, `other.njk`). Shared layouts and partials are in `src/_includes/`. Images go in `img/`, other static assets in `src/assets/`.

### Citation metrics

`content/citations.yaml` holds the Google Scholar numbers and the `date` (`dd/mm/yyyy`) they were
read. Because these drift constantly, every place they are shown — the hero stats, the
`/publications/` stat cards and the footer — is labelled with the month and year and links back to
the Scholar profile. Update the counts and the date together.

To add a new section:
1. Add a YAML file in `content/`.
2. Create a new `.njk` template in `src/`, or reference the data from an existing template using the filename-based key.

## robots.txt and sitemap.xml

Both are generated on every build, so they never go stale:

- `src/robots.njk` → `/robots.txt`. Allows all crawlers and points them at the sitemap.
- `src/sitemap.njk` → `/sitemap.xml`. Lists every rendered page, taking the site URL from
  `src/_data/site.js`.

A page is included automatically as soon as it produces HTML; set `sitemap: false` in its front
matter to leave it out.

`<lastmod>` is the date of the last commit that touched the page — that is, its own template, the
shared layout/data files (`src/_includes/`, `src/_data/`, `eleventy.config.js`), or any content
file the page declares in its front matter:

```yaml
---
permalink: /publications/
sitemapSources:
  - content/publications.yaml
  - content/patents.yaml
  - content/citations.yaml
---
```

Add a page's YAML files there whenever you create or repoint a template, otherwise edits to that
content will not move its `<lastmod>`. Dates come from `git log`, so the deploy workflow checks out
the full history (`fetch-depth: 0`). Where no history is available the `<lastmod>` is omitted
rather than filled in with the build time, which crawlers would see as a date that always changes.

After a content update, submitting `https://sebastian.proost.science/sitemap.xml` in Google Search
Console requests a re-crawl of all URLs at once and gives a per-URL coverage report.

## Deploy to GitHub Pages

The repo builds to a plain static site in `_site/`, which GitHub Pages can serve directly.

### One-time setup

1. Push the repo to GitHub.
2. In the repo settings, go to **Pages → Build and deployment** and set **Source** to **GitHub Actions**.

### Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          # Full history: the sitemap derives each <lastmod> from the last commit
          # touching that page's sources.
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Pushing to `main` now builds and publishes the site.

### Custom domain or project sub-path

If the site is served at `https://<user>.github.io/<repo>/` instead of the root, set a path prefix so links resolve correctly. Update the Eleventy config's return block:

```js
return {
  dir: { /* ... */ },
  pathPrefix: "/<repo>/",
  /* ... */
};
```

and build with `npx eleventy --pathprefix=/<repo>/` (or set it permanently in the config above). Use the `url` filter in templates for any internal link.

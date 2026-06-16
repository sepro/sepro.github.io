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

Each YAML file is exposed as a global data variable named after the file (e.g. `publications.yaml` → `publications`).

Page templates live in `src/` (`index.njk`, `experience.njk`, `publications.njk`, `software.njk`, `media.njk`, `other.njk`). Shared layouts and partials are in `src/_includes/`. Images go in `img/`, other static assets in `src/assets/`.

To add a new section:
1. Add a YAML file in `content/`.
2. Create a new `.njk` template in `src/`, or reference the data from an existing template using the filename-based key.

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

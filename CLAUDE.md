# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Sebastian Proost's academic resume website built with Gatsby. It's based on the gatsby-starter-clean-resume template and designed specifically for academic profiles, featuring publications, conferences, training, media appearances, and other academic content.

## Development Commands

- `npm install` - Install dependencies
- `npm run develop` or `npm start` - Start development server at http://localhost:8000
- `npm run build` - Build production site
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean Gatsby cache
- `npm run serve` - Serve built site locally

## Architecture

### Data-Driven Content
The site uses YAML files in `./content/` to manage all academic data:
- `education.yaml` - Academic degrees and education
- `experience.yaml` - Professional experience
- `publications.yaml` - Research publications with citation counts
- `conferences.yaml` - Conference presentations and talks  
- `training.yaml` - Training and certifications
- `media.yaml` - Media appearances and interviews
- `software.yaml` - Software and tools developed
- `skills.yaml` - Technical skills and proficiencies
- `grants_awards.yaml` - Grants and awards received
- `patents.yaml` - Patent applications
- `opensource.yaml` - Open source contributions
- `support.yaml` - Support and funding information
- `citations.yaml` - Citation metrics

### Site Configuration
Main site configuration is in `gatsby-config.js` containing:
- Personal information (name, role, email, social media)
- About section content (HTML allowed)
- Research section content
- Theme and font settings
- Plugin configurations

### Component Structure
- `src/components/` - Reusable React components for rendering data
- `src/pages/` - Gatsby page components that use the data from YAML files
- Components follow a pattern of reading YAML data and rendering it appropriately

### Styling
- Uses Less CSS preprocessor
- Milligram framework for base styling
- Custom theme: "sebastian-proost"
- IBM Plex Mono font from Google Fonts

## Automated Workflows

The repository has GitHub Actions for:
- **autobuild.yaml**: Automatically builds and deploys to GitHub Pages on every push
- **auto_update.yaml**: Automatically updates citation data from external sources

## Content Updates

When updating academic content:
1. Edit the appropriate YAML file in `./content/`
2. Ensure YAML syntax is valid
3. The site will auto-rebuild and deploy via GitHub Actions
4. For publications, the `publication_highlight` field in gatsby-config.js controls name highlighting

## Key Files to Understand

- `gatsby-config.js` - Core site configuration and metadata
- `content/*.yaml` - All academic data
- `src/pages/index.js` - Main about page
- `src/components/layout.js` - Site layout and navigation
- `src/components/menu.js` - Navigation menu structure
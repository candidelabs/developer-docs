# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Candide developer documentation website built with Docusaurus 3. It documents Ethereum Account Abstraction developer tools, SDKs, APIs, and guides for building Smart Accounts. The site covers:

- AbstractionKit SDK for Safe Accounts and EIP-7702 accounts
- Bundler and Paymaster APIs for ERC-4337 infrastructure
- InstaGas for gas sponsorship and policies
- Safe plugins (Passkeys, Recovery, Allowance)
- EIP-7702 EOA upgrades implementation guides

## Development Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install dependencies |
| `yarn start` | Start local development server with hot reload |
| `yarn build` | Build static site for production |
| `yarn serve` | Serve built site locally |
| `yarn clear` | Clear Docusaurus cache |

## Architecture & Structure

### Content Organization
- `/docs/` - Main documentation content organized by product area:
  - `wallet/` - SDK guides, API references, and technical documentation
  - `instagas/` - Gas sponsorship service documentation
  - `account-abstraction/` - EIP-7702 experimental features
- `/blog/` - Release notes and announcements
- `/src/` - Custom React components and data files
- `/static/` - Images, logos, and static assets

### Key Components
- **Data Files**: `/src/data/*.ts` contains TypeScript definitions for API parameters, return types, and configuration data used throughout the documentation
- **Custom Tables**: React components in `/src/components/` for rendering network lists, token support tables, and API references
- **Sidebar Configuration**: `sidebars.js` defines the navigation structure with multiple sidebars for different product areas

### Content Types
- **Guides**: Step-by-step tutorials for implementing features (`.mdx` files with React components)
- **API References**: Auto-generated tables from TypeScript data files
- **Technical References**: Error codes, deployment addresses, and chain-specific nuances

### Theme & Styling
- Uses dark mode by default with custom CSS and Tailwind integration
- Mermaid diagrams supported for technical architecture documentation
- Custom search implementation with Lunr.js

## Key Files to Understand

- `docusaurus.config.js` - Main configuration including plugins, theme settings, and navigation
- `sidebars.js` - Complex sidebar configuration with multiple product-specific sidebars
- `/src/data/` - TypeScript data definitions that drive API documentation tables
- `/docs/wallet/abstractionkit/` - Core SDK documentation
- `/docs/wallet/guides/` - Implementation guides and tutorials

## Development Notes

The documentation heavily uses React components within MDX files to create interactive tables and dynamic content. When editing documentation, be aware that many pages import and use data from `/src/data/` files to maintain consistency across API references.
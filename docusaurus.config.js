// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import { themes } from "prism-react-renderer";

const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Candide',
  tagline: 'Ethereum Account Abstraction developer tools for building Smart Accounts',
  url: 'https://docs.candide.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Candide Labs', // Usually your GitHub org/user name.
  projectName: 'dev-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', '@saucelabs/theme-github-codeblock'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          // editUrl: 'https://github.com/candidelabs/developer-docs/edit/main/website',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'blog',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'blog',
        showReadingTime: true,
        postsPerPage: 3,
        blogTitle: 'Releases',
        blogDescription: 'Candide Releases',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: 'blog',
      },
    ],
    [require.resolve('docusaurus-lunr-search'), {
      excludeRoutes: ["/blog"],
    }],
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        siteTitle: 'Candide Account Abstraction',
        siteDescription: 'Candide Ethereum Account Abstraction developer tools for building smart accounts',
        content: {
          relativePaths: false,  // Use absolute URLs instead of relative paths
          includeBlog: false,    // Already false by default
          includePages: false,   // Exclude tag/other pages
          includeGeneratedIndex: false,  // Exclude auto-generated index pages
          excludeRoutes: [
            '/tags',           // Exclude tags index
            '/tags/**',        // Exclude all tag pages
            '/',               // Exclude homepage/index
          ]
        }
      }
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      image: 'img/posters/atelier-meta.png',
      announcementBar: {
        id: 'safe-unified-account',
        content:
          'Safe Unified Account: Sign once, execute on every chain. EIL-compatible multichain signatures for Safe. <a href="/account-abstraction/research/safe-unified-account/">Learn more</a>',
        backgroundColor: '#f0f6ff',
        textColor: '#000000',
        isCloseable: true,
      },
      metadata: [{
        name:
          'twitter:card',
        content:
          'summary_large_image',
      },
      {
        name: 'keywords',
        content:
          'account abstraction, erc-4337, bundler, paymaster, Smart Wallet, gas sponsorship',
      },
      ],
      navbar: {
        title: 'Candide',
        logo: {
          alt: 'Candide logo',
          src: 'img/logo-dark.png',
        },
        items: [
          {
            to: '/wallet/atelier-intro',
            position: 'left',
            label: 'SDK',
          },
          {
            to: '/wallet/bundler/rpc-endpoints',
            position: 'left',
            label: 'API',
          },
          {
            to: '/instagas/overview',
            position: 'left',
            label: 'InstaGas',
          },
          {
            to: '/account-abstraction/research/safe-unified-account',
            position: 'left',
            label: 'Labs',
          },
          {
            to: 'https://dashboard.candide.dev',
            position: 'right',
            label: 'Dashboard↗',
          },
          {
            to: 'https://candide.dev/blog',
            position: 'right',
            label: 'Blog↗',
          },
          {
            to: 'https://t.me/heymarcopolo',
            position: 'right',
            label: 'Contact us↗',
          },
          {
            to: '/blog',
            position: 'right',
            label: 'Releases',
          },
          {
            href: 'https://github.com/candidelabs/',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://discord.gg/8q2H6BEJuf',
            position: 'right',
            className: 'header-discord-link',
            'aria-label': 'Discord server',
          },
        ],
      },
      footer: {
        links: [
          {
            "title": "Open Source",
            "items": [
              {
                "label": "AbstractionKit",
                "href": "https://github.com/candidelabs/abstractionkit"
              },
              {
                "label": "Voltaire Bundler",
                "href": "https://github.com/candidelabs/voltaire"
              },
              {
                "label": "Smart Contracts",
                "href": "https://github.com/candidelabs/candide-contracts"
              },
            ],
          },
          {
            "title": "Contact & Support",
            "items": [
              {
                "label": "Discord",
                "href": "https://discord.gg/8q2H6BEJuf"
              },
              {
                "label": "Telegram",
                "href": "https://t.me/heymarcopolo"
              },
              {
                "label": "team@candidelabs.com",
                "href": "mailto:team@candidelabs.com"
              },
              {
                "label": "X (Twitter)",
                "href": "https://twitter.com/candidelabs"
              },
            ]
          },
          {
            title: 'Status',
            items: [
              {
                html: `
                  <a href="https://status.candide.dev/" target="_blank" rel="noopener noreferrer">
                    <img src="https://candide.openstatus.dev/badge" alt="OpenStatus Badge" />
                  </a>
                `,
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['solidity'],
      },
    }),
};

module.exports = config;

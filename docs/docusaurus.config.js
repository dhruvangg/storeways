// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Storeways',
  tagline: 'A StoreLocator Plugin',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dhruvangg.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/storeways/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dhruvangg', // Usually your GitHub org/user name.
  projectName: 'storeways', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dhruvangg/storeways/tree/master/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dhruvangg/storeways/tree/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      headTags: [
        
      ],
      metadata: [{name: 'keywords', content: 'Storelocator, JavaScript Storelocator, jquery Storelocator'}],
      image: 'img/storeways.png',
      navbar: {
        title: 'Storeways',
        logo: {
          alt: 'Storeways',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/demo', label: 'Demo', position: 'left'},
          {
            href: 'https://github.com/dhruvangg/storeways',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More Projects',
            items: [
              {
                label: 'Notes',
                href: 'https://github.com/dhruvangg/notes',
              },
              {
                label: 'Headless Shopify',
                href: 'https://github.com/dhruvangg/headless-shopify',
              },
              {
                label: 'Selectbox',
                href: 'https://github.com/dhruvangg/selectbox',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/dhruvangg/storeways',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} | Developed by Dhruavng`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

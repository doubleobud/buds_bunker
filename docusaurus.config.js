// @ts-check

const path = require('path');
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DoubleOBud's Bunker",
  tagline: "A personal and game dev simulation hub",
  favicon: 'img/favicon.ico',

  url: 'https://doubleobud.github.io',
  baseUrl: '/buds_bunker/',
  organizationName: 'doubleobud',
  projectName: 'buds_bunker',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: path.resolve(__dirname, 'sidebars.js'),
          editUrl: 'https://github.com/doubleobud/buds_bunker/tree/main/',
        },
        blog: {
          path: 'logs/daily',
          routeBasePath: 'logs',
          blogSidebarTitle: 'Logs',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
          },
          editUrl: 'https://github.com/doubleobud/buds_bunker/tree/main/',
        },
        theme: {
          customCss: path.resolve(__dirname, 'src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'DoubleOBud Logo',
        src: 'img/buds-bunker-header-logo.png',
      },
      items: [
        { to: '/logs', label: 'Logs', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'projectSidebar',
          position: 'left',
          label: 'Project',
        },
        {
          type: 'docSidebar',
          sidebarId: 'systemSidebar',
          position: 'left',
          label: 'System',
        },
        // Updated navbar for profile link
        { to: '/profile', label: 'Profile', position: 'right' }, // Add Profile Link
        {
          href: 'https://github.com/doubleobud/buds_bunker',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },

  plugins: [require.resolve('./plugins/webpack-dotenv')],
};

module.exports = config;

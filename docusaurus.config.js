// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DoubleOBud's Bunker",
  tagline: "A personal and game dev simulation hub",
  favicon: 'img/favicon.ico',

  // GitHub Pages deployment settings
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/doubleobud/buds_bunker/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/doubleobud/buds_bunker/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: "DoubleOBud's Bunker",
        logo: {
          alt: 'DoubleOBud Logo',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' }, // Blog first
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/doubleobud/buds_bunker',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // Footer removed entirely
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

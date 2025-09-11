import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Arribada Developer Portal',
  tagline: 'Open & Accessible Technology for Wildlife, People & Planet',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://arribada.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/developer_portal/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'arribada', // Usually your GitHub org/user name.
  projectName: 'developer_portal', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/arribada/developer-portal/tree/main/',
          // Redirects for moved content
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/arribada/developer-portal/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          // Authors configuration
          authorsMapPath: 'authors.yml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Add Mermaid theme
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Quality content redirects
          {
            from: '/docs/platform/quality/quality-manual',
            to: '/docs/quality/quality-manual',
          },
          {
            from: '/docs/platform/quality/design-review-procedure',
            to: '/docs/quality/design-review-procedure',
          },
          {
            from: '/docs/platform/quality/manufacturing-qc',
            to: '/docs/quality/manufacturing-qc',
          },
          {
            from: '/docs/platform/quality/field-deployment',
            to: '/docs/quality/field-deployment',
          },
          // Contributing content redirects
          {
            from: '/docs/platform/contributing/overview',
            to: '/docs/community/contributing/overview',
          },
          {
            from: '/docs/platform/contributing/development-setup',
            to: '/docs/community/contributing/development-setup',
          },
          {
            from: '/docs/platform/contributing/code-standards',
            to: '/docs/community/contributing/code-standards',
          },
          {
            from: '/docs/platform/contributing/version-control',
            to: '/docs/community/contributing/version-control',
          },
          {
            from: '/docs/platform/contributing/testing',
            to: '/docs/community/contributing/testing',
          },
          {
            from: '/docs/platform/contributing/code-review',
            to: '/docs/community/contributing/code-review',
          },
          {
            from: '/docs/platform/contributing/ci-cd',
            to: '/docs/community/contributing/ci-cd',
          },
          {
            from: '/docs/platform/contributing/documentation',
            to: '/docs/community/contributing/documentation',
          },
          {
            from: '/docs/platform/contributing/repository-management',
            to: '/docs/community/contributing/repository-management',
          },
          {
            from: '/docs/platform/contributing/style-enforcement',
            to: '/docs/community/contributing/style-enforcement',
          },
          {
            from: '/docs/platform/contributing/small-team-practices',
            to: '/docs/community/contributing/small-team-practices',
          },
          // Tools content redirects
          {
            from: '/docs/platform/tools/development-kits',
            to: '/docs/community/developer-resources/development-kits',
          },
          {
            from: '/docs/platform/tools/code-libraries',
            to: '/docs/community/developer-resources/code-libraries',
          },
          {
            from: '/docs/platform/tools/testing-tools',
            to: '/docs/community/developer-resources/testing-tools',
          },
          {
            from: '/docs/platform/tools/deployment-scripts',
            to: '/docs/community/developer-resources/deployment-scripts',
          },
          // Templates redirects
          {
            from: '/docs/platform/tools/templates/concept-review-package',
            to: '/docs/quality/templates/concept-review-package',
          },
          {
            from: '/docs/platform/tools/templates/pdr-checklist',
            to: '/docs/quality/templates/pdr-checklist',
          },
          {
            from: '/docs/platform/tools/templates/cdr-report',
            to: '/docs/quality/templates/cdr-report',
          },
          {
            from: '/docs/platform/tools/templates/action-tracker',
            to: '/docs/quality/templates/action-tracker',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/arribada-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Arribada Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'platformSidebar',
          position: 'left',
          label: 'Platform',
        },
        {
          type: 'docSidebar',
          sidebarId: 'hardwareSidebar',
          position: 'left',
          label: 'Hardware',
        },
        {
          type: 'docSidebar',
          sidebarId: 'qualitySidebar',
          position: 'left',
          label: 'Quality',
        },
        {
          type: 'docSidebar',
          sidebarId: 'projectsSidebar',
          position: 'left',
          label: 'Projects',
        },
        {
          type: 'docSidebar',
          sidebarId: 'communitySidebar',
          position: 'left',
          label: 'Community',
        },
        {
          type: 'docSidebar',
          sidebarId: 'resourcesSidebar',
          position: 'left',
          label: 'Resources',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/arribada',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Platform',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/platform/getting-started/overview',
            },
            {
              label: 'Horizon Core',
              to: '/docs/platform/horizon-core/architecture',
            },
            {
              label: 'Cloud Platform',
              to: '/docs/platform/cloud/data-pipeline',
            },
          ],
        },
        {
          title: 'Hardware',
          items: [
            {
              label: 'Product Catalog',
              to: '/docs/hardware/catalog/horizon-v4',
            },
            {
              label: 'Development Kits',
              to: '/docs/hardware/catalog/dev-kits',
            },
            {
              label: 'Technical Specs',
              to: '/docs/hardware/specs/datasheets',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/arribada',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/arribada',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/arribada_init',
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
              label: 'Community',
              to: '/docs/community/overview',
            },
            {
              label: 'Contact',
              href: 'mailto:developers@arribada.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Arribada Initiative. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'c', 'cpp', 'python'],
    },
    // Mermaid diagram theme
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    // Algolia search - temporarily disabled until configured
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'arribada-dev-portal',
    //   contextualSearch: true,
    //   searchPagePath: 'search',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;

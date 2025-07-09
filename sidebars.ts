import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Platform documentation sidebar
  platformSidebar: [
    'platform/overview',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'platform/getting-started/overview',
        'platform/getting-started/setup',
        'platform/getting-started/first-device',
        'platform/getting-started/comparison',
      ],
    },
    {
      type: 'category',
      label: 'Horizon Core Platform',
      items: [
        'platform/horizon-core/architecture',
        'platform/horizon-core/satellite-connectivity',
        'platform/horizon-core/power-management',
        'platform/horizon-core/environmental-hardening',
        'platform/horizon-core/integration',
      ],
    },
    {
      type: 'category',
      label: 'Firmware Development',
      items: [
        'platform/firmware/zephyr-integration',
        'platform/firmware/api-reference',
        'platform/firmware/code-examples',
        'platform/firmware/testing-debugging',
        'platform/firmware/ota-updates',
      ],
    },
    {
      type: 'category',
      label: 'Cloud & Data Platform',
      items: [
        'platform/cloud/data-pipeline',
        'platform/cloud/dashboard-development',
        'platform/cloud/api-documentation',
        'platform/cloud/security-compliance',
      ],
    },
  ],

  // Quality Management sidebar
  qualitySidebar: [
    'quality/overview',
    {
      type: 'category',
      label: 'Quality Management System',
      items: [
        'quality/quality-manual',
        'quality/design-review-procedure',
        'quality/manufacturing-qc',
        'quality/field-deployment',
      ],
    },
    {
      type: 'category',
      label: 'Templates',
      items: [
        'quality/templates/concept-review-package',
        'quality/templates/pdr-checklist',
        'quality/templates/cdr-report',
        'quality/templates/action-tracker',
      ],
    },
  ],

  // Community sidebar
  communitySidebar: [
    'community/overview',
    {
      type: 'category',
      label: 'Contributing',
      collapsed: false,
      items: [
        'community/contributing/overview',
        'community/contributing/development-setup',
        'community/contributing/code-standards',
        'community/contributing/version-control',
        'community/contributing/testing',
        'community/contributing/code-review',
        'community/contributing/ci-cd',
        'community/contributing/documentation',
        'community/contributing/repository-management',
        'community/contributing/style-enforcement',
        'community/contributing/small-team-practices',
      ],
    },
    {
      type: 'category',
      label: 'Developer Resources',
      items: [
        'community/developer-resources/development-kits',
        'community/developer-resources/code-libraries',
        'community/developer-resources/testing-tools',
        'community/developer-resources/deployment-scripts',
      ],
    },
  ],

  // Resources sidebar
  resourcesSidebar: [
    'resources/overview',
  ],

  // Hardware documentation sidebar
  hardwareSidebar: [
    'hardware/overview',
    {
      type: 'category',
      label: 'Product Catalog',
      items: [
        'hardware/catalog/horizon-v4',
        'hardware/catalog/argos-smd',
        'hardware/catalog/wings-smd',
        'hardware/catalog/dev-kits',
        'hardware/catalog/accessories',
      ],
    },
    {
      type: 'category',
      label: 'Technical Specifications',
      items: [
        'hardware/specs/datasheets',
        'hardware/specs/pinouts',
        'hardware/specs/performance',
        'hardware/specs/environmental',
      ],
    },
    {
      type: 'category',
      label: 'Manufacturing',
      items: [
        'hardware/manufacturing/dfm-guidelines',
        'hardware/manufacturing/bom',
        'hardware/manufacturing/assembly',
        'hardware/manufacturing/quality-control',
        'hardware/manufacturing/certification',
      ],
    },
    {
      type: 'category',
      label: 'Hardware Integration',
      items: [
        'hardware/integration/mechanical-design',
        'hardware/integration/enclosures',
        'hardware/integration/antennas',
        'hardware/integration/power-supply',
      ],
    },
  ],

  // Projects & Solutions sidebar
  projectsSidebar: [
    'projects/overview',
    {
      type: 'category',
      label: 'Conservation Applications',
      items: [
        'projects/conservation/operation-pangolin',
        'projects/conservation/sea-turtle-tags',
        'projects/conservation/avian-research',
      ],
    },
    {
      type: 'category',
      label: 'Humanitarian Solutions',
      items: [
        'projects/humanitarian/geoseals',
      ],
    },
    {
      type: 'category',
      label: 'Maritime Solutions',
      items: [
        'projects/maritime/marlin',
        'projects/maritime/insight360',
        'projects/maritime/clean-catch',
      ],
    },
    {
      type: 'category',
      label: 'Research Platforms',
      items: [
        'projects/research/thermal-camera',
        'projects/research/timelapse',
        'projects/research/environmental-sensors',
        'projects/research/data-networks',
        'projects/research/penguin-cam-setup',
      ],
    },
    {
      type: 'category',
      label: 'Case Studies',
      items: [
        'projects/case-studies/deployment-reports',
        'projects/case-studies/performance-analysis',
        'projects/case-studies/lessons-learned',
        'projects/case-studies/cost-benefit',
      ],
    },
    {
      type: 'category',
      label: 'Solution Templates',
      items: [
        'projects/templates/quick-start',
        'projects/templates/reference-implementations',
        'projects/templates/testing-procedures',
        'projects/templates/deployment-checklists',
      ],
    },
  ],
};

export default sidebars;

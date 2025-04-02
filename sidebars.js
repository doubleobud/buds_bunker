// sidebars.js

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  projectSidebar: [
    {
      type: 'category',
      label: 'Project',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Charter',
          items: [
            'project/charter/project-charter',
          ],
        },
      ],
    },
  ],

  systemSidebar: [
    {
      type: 'category',
      label: 'System',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Website',
          items: [
            'system/website/foundational-guide',
            'system/website/navigation-system-plan',
            'system/website/changelog',
          ],
        },
        {
          type: 'category',
          label: 'Templates',
          items: [
            'system/templates/blog-template',
            'system/templates/charter-template',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;

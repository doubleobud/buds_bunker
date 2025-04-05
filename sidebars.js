/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // 🌐 Global Overview / Orientation Sidebar
  overviewSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'start-here',
          label: '🧭 Start Here',
        },
        {
          type: 'doc',
          id: 'chronological-narrative',
          label: '📖 Narrative Timeline',
        },
        {
          type: 'doc',
          id: 'tag-index',
          label: '🏷️ Tag Index',
        },        
      ],
    },
  ],

  // 📜 Project Section
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

  // ⚙️ System / Website Section
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
            'system/website/faq',
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

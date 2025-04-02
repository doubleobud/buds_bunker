"use strict";(self.webpackChunkbunker=self.webpackChunkbunker||[]).push([[1554],{3729:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"system/website/foundational-guide","title":"Website Foundational Guide","description":"Blueprint for building a scalable Docusaurus site with best practices, structure, and growth plans.","source":"@site/docs/system/website/foundational-guide.md","sourceDirName":"system/website","slug":"/system/website/foundational-guide","permalink":"/buds_bunker/docs/system/website/foundational-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/doubleobud/buds_bunker/tree/main/docs/system/website/foundational-guide.md","tags":[{"inline":true,"label":"website","permalink":"/buds_bunker/docs/tags/website"},{"inline":true,"label":"setup","permalink":"/buds_bunker/docs/tags/setup"},{"inline":true,"label":"best-practices","permalink":"/buds_bunker/docs/tags/best-practices"},{"inline":true,"label":"guide","permalink":"/buds_bunker/docs/tags/guide"}],"version":"current","frontMatter":{"title":"Website Foundational Guide","description":"Blueprint for building a scalable Docusaurus site with best practices, structure, and growth plans.","sidebar_label":"Website Foundational Guide","slug":"/system/website/foundational-guide","tags":["website","setup","best-practices","guide"]},"sidebar":"systemSidebar","next":{"title":"Website Navigation System Plan","permalink":"/buds_bunker/docs/system/website/navigation-system-plan"}}');var r=s(4848),l=s(8453);const t={title:"Website Foundational Guide",description:"Blueprint for building a scalable Docusaurus site with best practices, structure, and growth plans.",sidebar_label:"Website Foundational Guide",slug:"/system/website/foundational-guide",tags:["website","setup","best-practices","guide"]},d="Foundational Guide for DoubleOBud's Bunker",o={},c=[{value:"\ud83e\uddf1 1. Project Summary &amp; Setup Workflow",id:"-1-project-summary--setup-workflow",level:2},{value:"\ud83d\udcd0 2. Best Practices for Early Setup",id:"-2-best-practices-for-early-setup",level:2},{value:"\u2705 File &amp; Folder Structure",id:"-file--folder-structure",level:3},{value:"\u2705 Naming Conventions",id:"-naming-conventions",level:3},{value:"\u2705 Git Hygiene",id:"-git-hygiene",level:3},{value:"\u2705 Preview Before Deploy",id:"-preview-before-deploy",level:3},{value:"\u2705 Track Your Site\u2019s History",id:"-track-your-sites-history",level:3},{value:"\u2705 Versioning Discipline",id:"-versioning-discipline",level:3},{value:"\u2705 Don\u2019t Over-Customize Yet",id:"-dont-over-customize-yet",level:3},{value:"\u2705 Keep Everything Linkable",id:"-keep-everything-linkable",level:3},{value:"\u2705 Use Frontmatter Early",id:"-use-frontmatter-early",level:3},{value:"\u2705 Document Your Own Rules",id:"-document-your-own-rules",level:3},{value:"\ud83e\udde0 3. Your Prioritized Task Plan",id:"-3-your-prioritized-task-plan",level:2},{value:"\ud83d\udfe5 Immediate (This Week)",id:"-immediate-this-week",level:3},{value:"\ud83d\udfe8 Near-Term (1\u20132 Weeks)",id:"-near-term-12-weeks",level:3},{value:"\ud83d\udfe9 Long-Term (2\u20134 Weeks)",id:"-long-term-24-weeks",level:3},{value:"\ud83e\udded 4. Integration Notes: Your Setup + Best Practices Unified",id:"-4-integration-notes-your-setup--best-practices-unified",level:2},{value:"\u2705 Final Thoughts",id:"-final-thoughts",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"foundational-guide-for-doubleobuds-bunker",children:"Foundational Guide for DoubleOBud's Bunker"})}),"\n",(0,r.jsx)(n.p,{children:"This guide brings together every key element needed to build a robust, scalable foundation for your website. It integrates detailed setup instructions, best practices, and strategic action items\u2014from file organization and version control to capturing your early ideas and planning for future growth. Use this as your definitive blueprint to avoid early pitfalls, maintain clarity, and support your evolving creative and technical work."}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-1-project-summary--setup-workflow",children:"\ud83e\uddf1 1. Project Summary & Setup Workflow"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Framework:"})," Docusaurus v3"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Repo Branching:"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"main"}),": working source content"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"gh-pages"}),": production build branch (auto-managed by deploy script)"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Local Workflow:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm install      # First time only\r\nnpm start        # Launch dev server at http://localhost:3000\r\n\r\nnpm run build\r\nnpm run serve    # Local preview of final build\r\n\r\nnpm run deploy   # Publishes build to gh-pages\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Initial Cleanup Tasks Completed:"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Removed default content from ",(0,r.jsx)(n.code,{children:"/blog"}),", ",(0,r.jsx)(n.code,{children:"/docs"}),", ",(0,r.jsx)(n.code,{children:"/src/pages"}),", ",(0,r.jsx)(n.code,{children:"/static/img"})]}),"\n",(0,r.jsx)(n.li,{children:"Customized homepage layout and navbar order"}),"\n",(0,r.jsx)(n.li,{children:"Disabled footer"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-2-best-practices-for-early-setup",children:"\ud83d\udcd0 2. Best Practices for Early Setup"}),"\n",(0,r.jsx)(n.h3,{id:"-file--folder-structure",children:"\u2705 File & Folder Structure"}),"\n",(0,r.jsx)(n.p,{children:"Keep things predictable. Organize by function\u2014not just by doc type."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"/docs/\r\n  \u251c\u2500\u2500 meta/          # conventions, changelog, how-to\r\n  \u251c\u2500\u2500 design/        # meta-design + project frameworks\r\n  \u251c\u2500\u2500 universe/      # world-building (future)\r\n  \u251c\u2500\u2500 research/      # longform R&D and logs\r\n  \u2514\u2500\u2500 tasks/         # personal to-do tracking\r\n\r\n/blog/\r\n  \u251c\u2500\u2500 YYYY-MM-DD-entry-title.md\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-naming-conventions",children:"\u2705 Naming Conventions"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Use ",(0,r.jsx)(n.code,{children:"kebab-case"})," across all filenames (",(0,r.jsx)(n.code,{children:"meta-design.md"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:["Blog posts follow ",(0,r.jsx)(n.code,{children:"YYYY-MM-DD-title.md"})]}),"\n",(0,r.jsx)(n.li,{children:"Keep internal links and slugs consistent"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-git-hygiene",children:"\u2705 Git Hygiene"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Always branch before edits:","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git checkout -b feature/my-change\n"})}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Descriptive, small commits"}),"\n",(0,r.jsx)(n.li,{children:"Push regularly to GitHub for offsite backup"}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-preview-before-deploy",children:"\u2705 Preview Before Deploy"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Always run:","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm run build\r\nnpm run serve\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Set:","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"onBrokenLinks: 'throw',\r\nonBrokenMarkdownLinks: 'throw',\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-track-your-sites-history",children:"\u2705 Track Your Site\u2019s History"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"/docs/meta/changelog.md"}),": one-liners like \u201c2025-04-01 \u2014 cleaned up structure\u201d"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"/docs/meta/dev-notes.md"}),": deeper logs and reflections"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-versioning-discipline",children:"\u2705 Versioning Discipline"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Don\u2019t touch ",(0,r.jsx)(n.code,{children:"node_modules"})]}),"\n",(0,r.jsxs)(n.li,{children:["Keep ",(0,r.jsx)(n.code,{children:"package-lock.json"})," committed"]}),"\n",(0,r.jsxs)(n.li,{children:["Run ",(0,r.jsx)(n.code,{children:"npm outdated"})," monthly to check for stale packages"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-dont-over-customize-yet",children:"\u2705 Don\u2019t Over-Customize Yet"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Skip deep theming or visuals for now\u2014structure first"}),"\n",(0,r.jsxs)(n.li,{children:["Keep custom styling to ",(0,r.jsx)(n.code,{children:"custom.css"})," only if essential"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-keep-everything-linkable",children:"\u2705 Keep Everything Linkable"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"No \u201corphaned\u201d Markdown files\u2014link from sidebar or index"}),"\n",(0,r.jsxs)(n.li,{children:["Cross-link related content using ",(0,r.jsx)(n.code,{children:"[See also]"})," references"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-use-frontmatter-early",children:"\u2705 Use Frontmatter Early"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'---\r\ntitle: "Meta-Design Principles"\r\ntags: [meta, design]\r\ndescription: "Exploring foundational principles for structured project evolution"\r\n---\n'})}),"\n",(0,r.jsx)(n.h3,{id:"-document-your-own-rules",children:"\u2705 Document Your Own Rules"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Start with ",(0,r.jsx)(n.code,{children:"/docs/meta/conventions.md"})]}),"\n",(0,r.jsx)(n.li,{children:"Log your style choices, tag categories, formatting preferences"}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-3-your-prioritized-task-plan",children:"\ud83e\udde0 3. Your Prioritized Task Plan"}),"\n",(0,r.jsx)(n.h3,{id:"-immediate-this-week",children:"\ud83d\udfe5 Immediate (This Week)"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Structure & Naming Audit"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Clean up ",(0,r.jsx)(n.code,{children:"/docs"})," and ",(0,r.jsx)(n.code,{children:"/blog"})]}),"\n",(0,r.jsx)(n.li,{children:"Move to functional folders, enforce kebab-case"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Create the Meta Layer"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"/meta/how-to-website.md"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"/meta/conventions.md"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"/meta/changelog.md"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"/meta/opening-thoughts-template.md"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"To-Do System"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Add ",(0,r.jsx)(n.code,{children:"tasks/daily-todo.md"})]}),"\n",(0,r.jsxs)(n.li,{children:["Format:","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-markdown",children:"---\r\ntitle: Daily Tasks - YYYY-MM-DD\r\ntags: [tasks]\r\nstatus: active\r\n---\r\n- [ ] Write log\r\n- [ ] Add feature X\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Git Discipline"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Use branches and backups"}),"\n",(0,r.jsx)(n.li,{children:"Descriptive commits only"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-near-term-12-weeks",children:"\ud83d\udfe8 Near-Term (1\u20132 Weeks)"}),"\n",(0,r.jsxs)(n.ol,{start:"5",children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Navigation Polish"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Sidebar categories: ",(0,r.jsx)(n.code,{children:"meta"}),", ",(0,r.jsx)(n.code,{children:"how-to"}),", ",(0,r.jsx)(n.code,{children:"tasks"}),", ",(0,r.jsx)(n.code,{children:"design"}),", ",(0,r.jsx)(n.code,{children:"universe"})]}),"\n",(0,r.jsx)(n.li,{children:"Add a \u201cStart Here\u201d doc"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Visitor Basics"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Add ",(0,r.jsx)(n.code,{children:"description"}),", ",(0,r.jsx)(n.code,{children:"image"}),", ",(0,r.jsx)(n.code,{children:"alt"})," to pages"]}),"\n",(0,r.jsx)(n.li,{children:"Consider footer or about page for human touch"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"-long-term-24-weeks",children:"\ud83d\udfe9 Long-Term (2\u20134 Weeks)"}),"\n",(0,r.jsxs)(n.ol,{start:"7",children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Research & Logging"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Create ",(0,r.jsx)(n.code,{children:"/research/logs/YYYY-MM-DD.md"})]}),"\n",(0,r.jsxs)(n.li,{children:["Template:","\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-markdown",children:"---\r\ntitle: Research Log - YYYY-MM-DD\r\ntags: [research, log]\r\n---\r\n## Objective\r\n## Findings\r\n## Next Steps\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Scalability Systems"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Prepare to use tags, frontmatter consistently"}),"\n",(0,r.jsx)(n.li,{children:"Consider how to version logs"}),"\n",(0,r.jsx)(n.li,{children:"Explore future dynamic content needs"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-4-integration-notes-your-setup--best-practices-unified",children:"\ud83e\udded 4. Integration Notes: Your Setup + Best Practices Unified"}),"\n",(0,r.jsx)(n.p,{children:"Every major idea from your previous documents has been integrated and extended:"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Goal"}),(0,r.jsx)(n.th,{children:"Implementation"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Task System (Jira-style)"}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.code,{children:"/docs/tasks"}),", Markdown checklist w/ frontmatter"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Notes & How-Tos (Confluence-style)"}),(0,r.jsxs)(n.td,{children:[(0,r.jsx)(n.code,{children:"/docs/meta"}),", full instructional documentation"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Avoid Mistakes"}),(0,r.jsx)(n.td,{children:"Git discipline, changelogs, naming rules"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Setup Docs"}),(0,r.jsx)(n.td,{children:"All setup procedures and deployment tips preserved"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Structure Clarity"}),(0,r.jsx)(n.td,{children:"Explicit hierarchy and filename rules"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Research Planning"}),(0,r.jsx)(n.td,{children:"Template and folder prepared, not yet active"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Modularity & Scalability"}),(0,r.jsx)(n.td,{children:"Frontmatter, tagging, future-proofing built in"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Visitor Readiness"}),(0,r.jsx)(n.td,{children:"SEO, accessibility, clear sidebar navigation"})]})]})]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-final-thoughts",children:"\u2705 Final Thoughts"}),"\n",(0,r.jsx)(n.p,{children:"This document is the final say on foundational setup."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Live by it."})," Treat this guide like a constitution\u2014expand it, reference it, keep it alive."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Link to it."}),' From your "Start Here" doc or your meta sidebar.']}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Grow from it."})," Use this to support your real work\u2014don\u2019t let the setup become the goal."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"You\u2019re now structurally ready to scale, research, and create without fear of collapse."}),"\n",(0,r.jsx)(n.p,{children:"Happy building, DoubleOBud."})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>d});var i=s(6540);const r={},l=i.createContext(r);function t(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);
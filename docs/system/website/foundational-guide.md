---
title: Website Foundational Guide
description: Blueprint for building a scalable Docusaurus site with best practices, structure, and growth plans.
sidebar_label: Website Foundational Guide
slug: /system/website/foundational-guide
tags: [setup]
---

# Foundational Guide for DoubleOBud's Bunker

This guide brings together every key element needed to build a robust, scalable foundation for your website. It integrates detailed setup instructions, best practices, and strategic action items—from file organization and version control to capturing your early ideas and planning for future growth. Use this as your definitive blueprint to avoid early pitfalls, maintain clarity, and support your evolving creative and technical work.

---

## 🧱 1. Project Summary & Setup Workflow

- **Framework:** Docusaurus v3
- **Repo Branching:**
  - `main`: working source content
  - `gh-pages`: production build branch (auto-managed by deploy script)
- **Local Workflow:**
  ```bash
  npm install      # First time only
  npm start        # Launch dev server at http://localhost:3000

  npm run build
  npm run serve    # Local preview of final build

  npm run deploy   # Publishes build to gh-pages
  ```

- **Initial Cleanup Tasks Completed:**
  - Removed default content from `/blog`, `/docs`, `/src/pages`, `/static/img`
  - Customized homepage layout and navbar order
  - Disabled footer

---

## 📐 2. Best Practices for Early Setup

### ✅ File & Folder Structure
Keep things predictable. Organize by function—not just by doc type.
```
/docs/
  ├── meta/          # conventions, changelog, how-to
  ├── design/        # meta-design + project frameworks
  ├── universe/      # world-building (future)
  ├── research/      # longform R&D and logs
  └── tasks/         # personal to-do tracking

/blog/
  ├── YYYY-MM-DD-entry-title.md
```

### ✅ Naming Conventions
- Use `kebab-case` across all filenames (`meta-design.md`)
- Blog posts follow `YYYY-MM-DD-title.md`
- Keep internal links and slugs consistent

### ✅ Git Hygiene
- Always branch before edits:
  ```bash
  git checkout -b feature/my-change
  ```
- Descriptive, small commits
- Push regularly to GitHub for offsite backup

### ✅ Preview Before Deploy
- Always run:
  ```bash
  npm run build
  npm run serve
  ```
- Set:
  ```js
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  ```

### ✅ Track Your Site’s History
- `/docs/meta/changelog.md`: one-liners like “2025-04-01 — cleaned up structure”
- `/docs/meta/dev-notes.md`: deeper logs and reflections

### ✅ Versioning Discipline
- Don’t touch `node_modules`
- Keep `package-lock.json` committed
- Run `npm outdated` monthly to check for stale packages

### ✅ Don’t Over-Customize Yet
- Skip deep theming or visuals for now—structure first
- Keep custom styling to `custom.css` only if essential

### ✅ Keep Everything Linkable
- No “orphaned” Markdown files—link from sidebar or index
- Cross-link related content using `[See also]` references

### ✅ Use Frontmatter Early
```yaml
---
title: "Meta-Design Principles"
tags: [meta, design]
description: "Exploring foundational principles for structured project evolution"
---
```

### ✅ Document Your Own Rules
- Start with `/docs/meta/conventions.md`
- Log your style choices, tag categories, formatting preferences

---

## 🧠 3. Your Prioritized Task Plan

### 🟥 Immediate (This Week)
1. **Structure & Naming Audit**
   - Clean up `/docs` and `/blog`
   - Move to functional folders, enforce kebab-case

2. **Create the Meta Layer**
   - `/meta/how-to-website.md`
   - `/meta/conventions.md`
   - `/meta/changelog.md`
   - `/meta/opening-thoughts-template.md`

3. **To-Do System**
   - Add `tasks/daily-todo.md`
   - Format:
     ```markdown
     ---
     title: Daily Tasks - YYYY-MM-DD
     tags: [tasks]
     status: active
     ---
     - [ ] Write log
     - [ ] Add feature X
     ```

4. **Git Discipline**
   - Use branches and backups
   - Descriptive commits only

### 🟨 Near-Term (1–2 Weeks)
5. **Navigation Polish**
   - Sidebar categories: `meta`, `how-to`, `tasks`, `design`, `universe`
   - Add a “Start Here” doc

6. **Visitor Basics**
   - Add `description`, `image`, `alt` to pages
   - Consider footer or about page for human touch

### 🟩 Long-Term (2–4 Weeks)
7. **Research & Logging**
   - Create `/research/logs/YYYY-MM-DD.md`
   - Template:
     ```markdown
     ---
     title: Research Log - YYYY-MM-DD
     tags: [research, log]
     ---
     ## Objective
     ## Findings
     ## Next Steps
     ```

8. **Scalability Systems**
   - Prepare to use tags, frontmatter consistently
   - Consider how to version logs
   - Explore future dynamic content needs

---

## 🧭 4. Integration Notes: Your Setup + Best Practices Unified

Every major idea from your previous documents has been integrated and extended:

| Goal | Implementation |
|------|----------------|
| Task System (Jira-style) | `/docs/tasks`, Markdown checklist w/ frontmatter |
| Notes & How-Tos (Confluence-style) | `/docs/meta`, full instructional documentation |
| Avoid Mistakes | Git discipline, changelogs, naming rules |
| Setup Docs | All setup procedures and deployment tips preserved |
| Structure Clarity | Explicit hierarchy and filename rules |
| Research Planning | Template and folder prepared, not yet active |
| Modularity & Scalability | Frontmatter, tagging, future-proofing built in |
| Visitor Readiness | SEO, accessibility, clear sidebar navigation |

---

## ✅ Final Thoughts

This document is the final say on foundational setup.

- **Live by it.** Treat this guide like a constitution—expand it, reference it, keep it alive.
- **Link to it.** From your "Start Here" doc or your meta sidebar.
- **Grow from it.** Use this to support your real work—don’t let the setup become the goal.

You’re now structurally ready to scale, research, and create without fear of collapse.

Happy building, DoubleOBud.

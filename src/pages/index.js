import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Welcome to Buds Bunker"
      description="The evolving simulation, devlog, and world-building lab of DoubleOBud"
    >
      <main className={styles.home}>
        <div className="container margin-top--xl">
          <h1 className="hero__title">🧠 Buds Bunker</h1>
          <p className="hero__subtitle">
            A living project hub for documenting the design of a simulated universe—and the systems that support it.
          </p>

          <div className="margin-top--lg">
            <Link
              className="button button--primary button--lg margin-right--md"
              to="/docs/start-here">
              🧭 Start Here
            </Link>

            <Link
              className="button button--secondary button--lg"
              to="/docs/chronological-narrative">
              📖 Follow the Project Story
            </Link>
          </div>

          <hr className="margin-top--xl" />

          <h2 className="margin-top--lg">🔗 Explore Sections</h2>
          <ul className="margin-top--md">
            <li><Link to="/docs/project/project-charter">📜 Project: Charter & Vision</Link></li>
            <li><Link to="/docs/system/website/foundational-guide">⚙️ System: Foundational Setup</Link></li>
            <li><Link to="/logs/">🗓️ Daily Logs</Link></li>
            <li><Link to="/docs/system/templates/blog-template">🧱 Templates</Link></li>
            <li><Link to="/docs/tag-index">🏷️ Browse by Tag</Link></li>
          </ul>

          {/* Optional Latest Update Teaser this comments suck Same thing here. I keep having to comment.*/}
          <div className="margin-top--xl">
            <h3>🧩 Latest Development</h3>
            <p>
              April 1, 2025 — <Link to="/logs/2025-04-01-second-log">Second Log: Website Planning</Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

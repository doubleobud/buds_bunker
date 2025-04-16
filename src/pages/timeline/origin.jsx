import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './timeline.module.css';

// ✅ Load frontmatter from Markdown files in /src/data/timeline
const timelineContext = require.context(
  '../../data/timeline',
  false,
  /\.md$/
);

// ✅ Parse and sort entries by timestamp
function loadTimelineEntries() {
  const rawModules = timelineContext.keys().map((key) => {
    const mod = timelineContext(key);
    return mod.frontMatter || {};
  });

  return rawModules.sort((a, b) => {
    const parse = (t) => parseInt(t?.timestamp?.replace(/T\s?/, '') || '0', 10);
    return parse(a.timestamp) - parse(b.timestamp);
  });
}

export default function TimelinePage() {
  const timelineEntries = loadTimelineEntries();

  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.timelineCard}`);
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.3}s`;
      card.classList.add(styles.fadeIn);
    });
  }, []);

  return (
    <Layout title="Guided Activity Timeline">
      <div className={styles.container}>
        <h1 className={styles.header}>📜 Guided Activity Timeline</h1>
        <p className={styles.intro}>
          This is your shared origin with the project. Scroll through to witness the first steps.
        </p>

        <div className={styles.timeline}>
          {timelineEntries.length > 0 ? (
            timelineEntries.map((entry, index) => (
              <Link
                key={index}
                to={entry.slug || '#'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.timelineCard}>
                  <div className={styles.timestamp}>{entry.timestamp}</div>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{entry.title}</h3>
                    <p className={styles.description}>{entry.description}</p>
                    <div className={styles.tags}>
                      {entry.tags?.map((tag, i) => (
                        <span key={i} className={styles.tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ color: '#888', marginTop: '2rem' }}>
              No timeline entries found yet. Add <code>.md</code> files to <code>/src/data/timeline</code>.
            </p>
          )}
        </div>

        <div className={styles.ctaContainer}>
          <Link to="/profile">
            <button className={styles.ctaButton}>Enter Dashboard →</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

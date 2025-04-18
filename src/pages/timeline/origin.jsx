import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// ✅ Load frontmatter from generated .json files in /src/data/timeline
const timelineContext = require.context(
  '../../data/timeline',
  false,
  /\.json$/
);

// ✅ Parse and sort entries by 'order'
function loadTimelineEntries() {
  const rawModules = timelineContext.keys().map((key) => timelineContext(key));
  return rawModules.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

// ✅ Format ISO date to human-readable string
function formatDate(dateString) {
  if (!dateString || typeof dateString !== 'string') return null;
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function OriginTimelinePage() {
  const timelineEntries = loadTimelineEntries();

  useEffect(() => {
    const cards = document.querySelectorAll('.origin-timeline .timelineCard');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.3}s`;
      card.classList.add('fadeIn');
    });
  }, []);

  return (
    <Layout title="Origin Timeline">
      <div className="origin-timeline">
        <div className="container">
          <h1 className="header">Origin Timeline</h1>
          <p className="intro">
            The very first posts that set the foundation for this effort and brings the core user experience online.
          </p>

          <div className="timeline">
            {timelineEntries.length > 0 ? (
              timelineEntries.map((entry, index) => (
                <Link
                  key={index}
                  to={entry.slug || '#'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="timelineCard">
                    <div className="timestamp">
                      {entry.order !== undefined ? `${entry.order}` : ''}
                    </div>
                    <div className="content">
                      <h3 className="title">{entry.title}</h3>
                      <p className="description">{entry.description}</p>
                      {entry.date && (
                        <p className="date">{formatDate(entry.date)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ color: '#888', marginTop: '2rem' }}>
                No timeline entries found yet. Add <code>.md</code> files to <code>/src/pages/timeline/entries</code>.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

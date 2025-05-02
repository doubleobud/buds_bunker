// src/components/BadgeList.jsx
import React, { useEffect, useState } from 'react';
import { getBeliefBadges } from '../services/badges';

export default function BadgeList() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await getBeliefBadges();
        setBadges(list);
      } catch (err) {
        console.error('Failed to load badges:', err);
      }
    })();
  }, []);

  if (!badges.length) return null;

  return (
    <section className="badge-list" style={{ margin: '2rem 0' }}>
      <h2>Your Belief Badges</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {badges.map(({ key, title, description, confidence }) => (
          <div
            key={key}
            className="badge-card"
            style={{
              border: '1px solid var(--ifm-color-primary)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              width: '200px',
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem' }}>{title}</h3>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
              {description}
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              Confidence: <strong>{confidence}%</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

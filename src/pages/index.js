import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';
import NoNavbarLayout from '../components/NoNavbarLayout'; // ✅ RELATIVE PATH

export default function Home() {
  return (
    <NoNavbarLayout
      title="Welcome to Buds Bunker"
      description="The evolving simulation, devlog, and world-building lab of DoubleOBud"
    >
      {/* =====================================================
          1. HERO / HEADER SECTION
      ====================================================== */}
      <header className={`${styles.heroSection} hero`}>
        <div className="container">
          <div className={styles.logoContainer}>
            <img
              src={useBaseUrl('img/buds-bunker-homepage-logo.png')}
              alt="Bud's Bunker Homepage Logo"
              className={styles.logoImage}
            />
          </div>
          <h1 className={styles.myHeroTitle}>YOUR ENTRANCE TO MY WORLD</h1>
          <p className="hero__subtitle">
          See what emerges when a life is rethought from its most basic elements.
          </p>
          <div className={styles.ctaContainer}>
            <Link className={styles.myCustomButton} style={{ marginRight: '1rem' }} to="/start-here">
              🧭 Start Here
            </Link>
            <Link className={styles.myCustomButton} to="/auth-test">
              🔐 Sign-In
            </Link>
          </div>
        </div>
      </header>
    </NoNavbarLayout>
  );
}

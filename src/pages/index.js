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
          <h1 className={styles.myHeroTitle}>YOUR ENTRANCE TO A SIMULATION UNIVERSE</h1>
          <p className="hero__subtitle">
            Experience an interactive developer log where you build your character as I build a digital world.
          </p>
          <div className={styles.ctaContainer}>
            <Link className={styles.myCustomButton} style={{ marginRight: '1rem' }} to="/start-here">
              🧭 Start Here
            </Link>
            <Link className={styles.myCustomButton} to="/docs/chronological-narrative">
              📖 Resume Story
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          2. KEY FEATURES / BENEFITS SECTION
      ====================================================== */}
      <section className={`${styles.featuresSection} container margin-top--xl`}>
        <h2>Key Features & Benefits</h2>
        <p>
          Provide a concise overview of the strengths and unique aspects of your project.
          Consider how your world-building, system design, and community engagement set you apart.
        </p>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <h3>Innovative World-Building</h3>
            <p>
              Describe how your simulated universe is designed to evolve over time.
              Explain any unique storytelling or design mechanics you’re using.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Systematic Documentation</h3>
            <p>
              Detail your commitment to clear, structured documentation and the best practices you employ.
              This can include version control, changelogs, and modular design principles.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Engaging Community</h3>
            <p>
              Highlight opportunities for visitors to get involved, offer feedback, or participate in discussions.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. SOCIAL PROOF / TESTIMONIALS SECTION
      ====================================================== */}
      <section className="container margin-top--xl">
        <h2>What Our Community Says</h2>
        <div className={styles.testimonials}>
          <blockquote>
            <p>“Buds Bunker has transformed the way I approach creative projects. Its transparency and depth are unmatched.”</p>
            <cite>— Jane Doe, Creative Technologist</cite>
          </blockquote>
          <blockquote>
            <p>“I love following the daily logs to see the evolution of this unique world. Every update feels like a new discovery.”</p>
            <cite>— John Smith, Indie Developer</cite>
          </blockquote>
        </div>
      </section>

      {/* =====================================================
          4. EXPLORE SECTIONS / SITE NAVIGATION
      ====================================================== */}
      <section className="container margin-top--xl">
        <h2>Explore the Site</h2>
        <p>Navigate to key sections of the project to learn more about our vision, technical setup, and ongoing updates.</p>
        <ul className={styles.exploreList}>
          <li><Link to="/docs/project/project-charter">📜 Project Charter & Vision</Link></li>
          <li><Link to="/docs/system/website/foundational-guide">⚙️ Foundational Setup</Link></li>
          <li><Link to="/logs/">🗓️ Daily Logs</Link></li>
          <li><Link to="/docs/system/templates/blog-template">🧱 Templates</Link></li>
          <li><Link to="/docs/tag-index">🏷️ Browse by Tag</Link></li>
        </ul>
      </section>

      {/* =====================================================
          5. LATEST UPDATES / NEWS SECTION
      ====================================================== */}
      <section className="container margin-top--xl">
        <h2>Latest Updates</h2>
        <p>
          April 1, 2025 — <Link to="/logs/2025-04-01-second-log">Second Log: Website Planning</Link>
        </p>
      </section>

      {/* =====================================================
          6. NEWSLETTER / COMMUNITY ENGAGEMENT SECTION
      ====================================================== */}
      <section className={`${styles.newsletterSection} container margin-top--xl`}>
        <h2>Stay Informed</h2>
        <p>Subscribe to our newsletter for the latest updates, insights, and exclusive content directly in your inbox.</p>
        <form className={styles.newsletterForm}>
          <label htmlFor="newsletter-email">Email Address</label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            placeholder="you@example.com"
            aria-label="Email Address"
          />
          <button type="submit" className="button button--primary">
            Subscribe
          </button>
        </form>
      </section>

      {/* =====================================================
          7. SECONDARY CALL-TO-ACTION / WRAP-UP SECTION
      ====================================================== */}
      <section className={`${styles.secondaryCtaSection} container margin-top--xl`}>
        <h2>Ready to Dive Deeper?</h2>
        <p>
          Whether you’re following our development logs, exploring the world-building insights,
          or learning about our system design, there’s always more to discover.
          Get involved and join our community today!
        </p>
        <Link className="button button--secondary button--lg" to="/start-here">
          Join the Community
        </Link>
      </section>
    </NoNavbarLayout>
  );
}

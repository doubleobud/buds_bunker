import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Bud’s Universe – A text-based strategy simulation RPG project">
      <HomepageHeader />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <p>This is the beginning of something big.</p>
        <p>Stay tuned as Bud’s Bunker comes to life.</p>
      </main>
    </Layout>
  );
}

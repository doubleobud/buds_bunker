import React from 'react';
import NoNavbarLayout from '../components/NoNavbarLayout';
import AuthPanel from '@site/src/components/AuthPanel';     // ✅ keep alias if you're using @site

export default function AuthTestPage() {
  return (
    <NoNavbarLayout title="Auth Test" description="Sign up or log in to access the simulation.">
      <main style={{ padding: '2rem' }}>
        <h1>🔐 Auth Test Page</h1>
        <p>This is a test page for signing up and managing user sessions.</p>

        <div style={{ marginTop: '2rem' }}>
          <AuthPanel />
        </div>
      </main>
    </NoNavbarLayout>
  );
}

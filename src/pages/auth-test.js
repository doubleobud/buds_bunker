// src/pages/auth-test.js
import React from 'react';
import NoNavbarLayout from '../components/NoNavbarLayout';
import AuthPanel from '../components/AuthPanel';       // ← use relative path; no @site alias

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
  
import React from 'react'
import Layout from '@theme/Layout'
import AuthPanel from '@site/src/components/AuthPanel' // ✅ use correct alias path

export default function AuthTestPage() {
  return (
    <Layout title="Auth Test">
      <main style={{ padding: '2rem' }}>
        <h1>🔐 Auth Test Page</h1>
        <p>This is a test page for signing up and managing user sessions.</p>

        {/* ✅ Render the working authentication panel */}
        <div style={{ marginTop: '2rem' }}>
          <AuthPanel />
        </div>
      </main>
    </Layout>
  )
}

import React from 'react'
import Layout from '@theme/Layout'
import AuthPanel from '../components/AuthPanel'

export default function AuthTestPage() {
  return (
    <Layout title="Auth Test">
      <main style={{ padding: '2rem' }}>
        <h1>🔐 Auth Test Page</h1>
        <p>This is a test page for signing up and managing user sessions. For some reason it does not show up</p>
        <AuthPanel />
      </main>
    </Layout>
  )
}
